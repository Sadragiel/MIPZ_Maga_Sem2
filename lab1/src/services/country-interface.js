export const START_CURRENCY_VALUE = 1000000;
export const REPRESENTIVE_PORTION_MULTIPLIER = .001;

export function createCountry(input, color, currencyMap) {
    return {
        id: input.id,
        name: input.name,
        color,
        currencyMap,
    };
}
