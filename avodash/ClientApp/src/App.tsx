import { BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import MetaDataContextProvider from "./containers/MetaDataContextProvider";

function App() {
  return (
    <Router>
      <MetaDataContextProvider>
        <Header />
        <Dashboard />
      </MetaDataContextProvider>
    </Router>
  );
}

export default App;
