import logo from './logo.svg';
import './App.css';
import {Navigate,Route,Routes} from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import New1 from "./Pages/Testpage/New1";
import 'reactjs-popup/dist/index.css';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='*' element={<Navigate to={'/home'}/>} key={'home'}/>
        <Route path={'/home'} element={<Homepage/>} key={'home'}/>
        <Route path={'/new1'} element={<New1/>} key={'new1'}/>
      </Routes>

    </div>
  );
}

export default App;
