import { BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Dashboard />
    </Router>
  );
}

export default App;
