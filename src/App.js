import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Menu from "./components/pages/Menu";
import Platos from "./components/pages/Platos";
import DetallePlato from "./components/pages/DetallePlato";
import usePlatos from "./helpers/hooks/usePlatos";

function App() {
  const { modal } = usePlatos()
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={ 
              <Menu /> 
            } />
            <Route path="/platos" element={
              <Platos />
            }/> 
          </Route>
        </Routes>
      </Router>
      {modal && <DetallePlato />}
    </>
  );
}

export default App;
