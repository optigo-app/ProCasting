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
import BatchListingGrid from './pages/Component/batchListingGrid/BatchListingGrid';
import ImageWebCam from './pages/Component/imageTag/ImageWebCam';
import PrintQr from './pages/Component/printQr/PrintQr';
import CreateTreeOne from './pages/Component/createTree/CreateTreeOne';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/createTree' element={<CreateTree />} />
        <Route path='/createTreeOne' element={<CreateTreeOne />} />
        <Route path='/addFlask' element={<AddFlask />} />
        <Route path='/investmentFirst' element={<InvestMentFirst />} />
        <Route path='/burnOut' element={<BurnOut />} />
        <Route path='/unlock' element={<UnlockAlloying />} />
        <Route path='/batchListing' element={<BatchListing />} /> 
        <Route path='/batchListingGrid' element={<BatchListingGrid />} />
        <Route path='/imagewebcam' element={<ImageWebCam />} />
        <Route path='/printQr' element={<PrintQr />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
