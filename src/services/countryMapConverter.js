import { START_CURRENCY_VALUE } from ".";
import { createCountry } from "./country-interface";

const generateCollor = () => '#' + Math.floor(Math.random()*16777215).toString(16);;

const getCurrencyMap = (countryNames, activeCountry) => {
    const currencyMap = new Map();

    countryNames.forEach(countryName => 
        currencyMap.set(
            countryName,
            countryName === activeCountry ? START_CURRENCY_VALUE : 0,
        ),
    );

    return currencyMap;
};

export function countryMapConverter(inputs) {
    console.log('inputs', inputs)

    const countryMap = [];

    const countryNames = inputs.map(({ name }) => name);
    const leftVerticalBound = inputs.reduce((bound, input) => Math.min(bound, input.xl), 0);
    const bottomHorizontalBound = inputs.reduce((bound, input) => Math.min(bound, input.yh), 0);

    inputs.forEach(input => {
        const countryColor = generateCollor();

        for (let i = input.yh; i <= input.yl; i++) {
            const y = i - bottomHorizontalBound - 1;
            for (let j = input.xl; j <= input.xh; j++) {
                const x = j - leftVerticalBound - 1;

                if (!countryMap[y]) {
                    countryMap[y] = [];
                }

                countryMap[y][x] = createCountry(
                    input,
                    countryColor,
                    getCurrencyMap(countryNames, input.name),
                );
            }
        }
    });

    // filling up the empty space
    // Empty spaces will not be iterated with Arrays build in methods
    countryMap.forEach(row => {
        for (let i = 0; i < row.length; i++) {
            if (!row[i]) {
                row[i] = null;
            }
        }
    })

    return countryMap;
}