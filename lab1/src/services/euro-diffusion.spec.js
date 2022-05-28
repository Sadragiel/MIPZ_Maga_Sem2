import { countryMapConverter } from "./countryMapConverter";
import { calculateEuroDiffusion } from "./euro-diffusion";

describe('calculateEuroDiffusion', () => {
    it('should perform correct diffusion calculation for 3 countries', () => {
        const inputs = [
            {
                id: "1",
                name: "France",
                xl: "1",
                yl: "6",
                xh: "4",
                yh: "4",
            },
            {
                id: "2",
                name: "Spain",
                xl: "3",
                yl: "3",
                xh: "6",
                yh: "1",
            },
            {
                id: "3",
                name: "Portugal",
                xl: "1",
                yl: "2",
                xh: "2",
                yh: "1",
            },
        ];

        const countryMap = countryMapConverter(inputs);

        const result = calculateEuroDiffusion(countryMap);

        expect(result).toEqual({
            'France': 1325,
            'Spain': 382,
            'Portugal': 416,
        });
    });

    it('should perform correct diffusion calculation for 2 countries', () => {
        const inputs = [
            {
                id: "1",
                name: "Netherland",
                xl: "1",
                yl: "4",
                xh: "2",
                yh: "3",
            },
            {
                id: "2",
                name: "Belgium",
                xl: "1",
                yl: "2",
                xh: "2",
                yh: "1",
            },
        ];

        const countryMap = countryMapConverter(inputs);

        const result = calculateEuroDiffusion(countryMap);

        expect(result).toEqual({
            'Netherland': 2,
            'Belgium': 2,
        });
    });

    it('should perform correct diffusion calculation for 1 countries', () => {
        const inputs = [
            {
                id: "1",
                name: "Luxembourg",
                xl: "1",
                yl: "1",
                xh: "1",
                yh: "1",
            },
        ];

        const countryMap = countryMapConverter(inputs);

        const result = calculateEuroDiffusion(countryMap);

        expect(result).toEqual({
            'Luxembourg': 1,
        });
    });
});