import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Component/Home/Home';
import CreateTree from './pages/Component/createTree/CreateTree';
import AddFlask from './pages/Component/addFlask/AddFlask';
import InvestMentFirst from './pages/Component/investmentProce/InvestMentFirst';
import BurnOut from './pages/Component/burnOut/BurnOut';
import UnlockAlloying from './pages/Component/unlockAllow/UnlockAlloying';
import BatchListing from './pages/Component/batchListing/BatchListing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/createTree' element={<CreateTree />} />
        <Route path='/addFlask' element={<AddFlask />} />
        <Route path='/investmentFirst' element={<InvestMentFirst />} />
        <Route path='/burnOut' element={<BurnOut />} />
        <Route path='/unlock' element={<UnlockAlloying />} />
        <Route path='/batchListing' element={<BatchListing />} />
      </Routes>
    </BrowserRouter>

  
  );
}

export default App;
