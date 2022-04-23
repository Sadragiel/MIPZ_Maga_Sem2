import { CountryForm } from './components/country-form/CountryForm';
import { CountryGraph } from './components/country-graph/CountryGraph';
import { DiffusionReport } from './components/diffusion-report/DiffusionReport';
import { DataContextProvider } from './contexts';

function App() {
  return (
    <DataContextProvider>
      <CountryForm />
      <CountryGraph />
      <DiffusionReport />
    </DataContextProvider>
  );
}

export default App;
