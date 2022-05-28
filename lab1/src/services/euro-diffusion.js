import { REPRESENTIVE_PORTION_MULTIPLIER } from "./country-interface";

const vectors = [
    { x: 1, y: 0 },  // right
    { x: -1, y: 0 }, // left
    { x: 0, y: 1 },  // up
    { x: 0, y: -1 }, // down
];

function getCountryNames(countryMap) {
    return Array.from(countryMap[0].find(Boolean).currencyMap)
        .map(([countryName]) => countryName);
}

function incrementCurrencyState(currencyMap, countryName, increment) {
    const currencyValue = currencyMap.get(countryName);
    currencyMap.set(countryName, currencyValue + increment);
}

function createTransactionMatrix(countryMap) {
    const transactionsItem = new Map();

    getCountryNames(countryMap)
        .map((countryName) => transactionsItem.set(countryName, 0));

    return countryMap.map(row => row.map(() => new Map(transactionsItem)));
}

function writeTransaction(countryMap, transactionMatrix, x, y, vector) {
    const targetY = y + vector.y;
    const targetX = x + vector.x;

    const targetCountry = countryMap[targetY] && countryMap[targetY][targetX];
    const targetTransaction = transactionMatrix[targetY] && transactionMatrix[targetY][targetX];

    if (!targetCountry || !targetTransaction) return;
    const selfCurrencyMap = countryMap[y][x].currencyMap;

    Array.from(selfCurrencyMap).forEach(([countryName, availableCurrency]) => {
        const representivePortion = Math.floor(availableCurrency * REPRESENTIVE_PORTION_MULTIPLIER);

        incrementCurrencyState(transactionMatrix[y][x], countryName, -representivePortion);
        incrementCurrencyState(targetTransaction, countryName, representivePortion);
    });
}

function applyTransaction(countryMap, transactionMatrix) {
    countryMap.forEach((row, rowIndex) => row.forEach((item, itemIndex) => {
        if(!item) return;

        Array.from(transactionMatrix[rowIndex][itemIndex]).forEach(([countryName, currency]) => {
            incrementCurrencyState(item.currencyMap, countryName, currency);
        });
    }));
}

function performEuroDeffusionIteraton(countryMap) {
    const transactionMatrix = createTransactionMatrix(countryMap);

    countryMap.forEach((row, rowIndex) => row.map((item, itemIndex) => {
        if (!item) return;

        vectors.forEach(v => writeTransaction(countryMap, transactionMatrix, itemIndex, rowIndex, v));
    }));

    applyTransaction(countryMap, transactionMatrix);
}

function writeCalculationResult(countryMap, countryNames, calculationResult, iteration) {
    countryNames.forEach(name => !calculationResult[name] && (calculationResult[name] = iteration));

    countryMap.forEach(row => row.forEach(item => item 
        && Array.from(item.currencyMap).some(([_, currency]) => !currency)
        && (calculationResult[item.name] = 0),
    ));
}

export function calculateEuroDiffusion(countryMap) {
    const calculationResult = {};

    const countryNames = getCountryNames(countryMap);

    // filling up the result with empty data
    countryNames.forEach(name => calculationResult[name] = 0);

    let iteration = 0;

    while (countryNames.some(name => !calculationResult[name])) {
        performEuroDeffusionIteraton(countryMap);
        writeCalculationResult(countryMap, countryNames, calculationResult, ++iteration)
    }

    return calculationResult;
}
