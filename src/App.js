import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from './component/Main'
import Login from './member/Login'
import Forgot from './member/Forgot'
import Register from './member/Register'
import Stat from './menu/Stat/Stat'
import Predict from './menu/Predict/Pgrapf'
import Elec from './menu/All/Elec';

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path='/' className element={<Main />} />
          <Route path='/login' className element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stat" element={<Stat />} />
          <Route path="/manage" element={<Predict />} />
          <Route path="/elec" element={<Elec />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;