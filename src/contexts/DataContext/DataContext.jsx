import { createContext, useCallback, useMemo, useState } from "react";
import { countryMapConverter } from "../../services";
import { calculateEuroDiffusion } from "../../services/euro-diffusion";

export const DataContext = createContext({});

export function DataContextProvider({ children }) {
  const [countryMap, setCountryMap] = useState([]);
  const [diffusionReport, setDiffusionReport] = useState(null);

  const applyUserInput = useCallback((inputs) => {
    const countryMap = countryMapConverter(inputs);
    const diffusionReport = calculateEuroDiffusion(countryMap);
    console.log('diffusionRepor', diffusionReport)
    setCountryMap(countryMap);
    setDiffusionReport(diffusionReport);
  }, []);

  const value = useMemo(() => ({ applyUserInput, countryMap, diffusionReport }));

  return (
    <DataContext.Provider value={value}>
      { children }
    </DataContext.Provider>
  )
}