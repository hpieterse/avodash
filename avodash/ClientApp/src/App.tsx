import { BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import MetaDataContextProvider from "./containers/MetaDataContextProvider";
import FilterValueContextProvider from "./containers/FilterValuesContextProvider";

function App() {
  return (
    <Router>
      <MetaDataContextProvider>
        <FilterValueContextProvider>
          <Header />
          <Dashboard />
        </FilterValueContextProvider>
      </MetaDataContextProvider>
    </Router>
  );
}

export default App;
