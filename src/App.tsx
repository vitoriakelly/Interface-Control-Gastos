import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TabSwitcher from "./components/custom/TabSwitcher/tab-switcher";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TabSwitcher />} />
      </Routes>
    </Router>
  );
}

export default App;
