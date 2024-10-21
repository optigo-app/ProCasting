import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Component/Home/Home';
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
import HomeOne from './pages/Component/Home/HomeOne';
import CreateTreeOneV2 from './pages/Component/createTree/CreateTreeOneV2';
import Activate from './pages/Component/Activate/Activate';
import InfoPage from './pages/Component/Info/InfoPage';
import InputSuggestion from "./Utils/inputSuggestion"

function App() {

  const toastStyle = {
    borderRadius: '30px',
    backgroundColor: '#333',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', 
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    minHeight: '50px',
    fontSize: '14px',
    minWidth: '0px',
    width:'fit-content !important',
    padding: '0px 6px !important'
  };
  return (
    <>
      <ToastContainer
        toastStyle={toastStyle}
        hideProgressBar="false"
        position="bottom-center"
        // autoClose={false}
        closeButton={false}
        style={{ marginBottom: '40px' }}
      />
      {/* <BrowserRouter basename='/procasting'> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Activate />} />
          <Route path='/homeone' element={<HomeOne />} />
          {/* <Route path='/createTreeOne' element={<CreateTreeOne />} /> */}
          <Route path='/createTreeOneV2' element={<CreateTreeOneV2 />} />
          <Route path='/addFlask' element={<AddFlask />} />
          <Route path='/investmentFirst/*' element={<InvestMentFirst />} />
          <Route path='/burnOut' element={<BurnOut />} />
          <Route path='/unlock' element={<UnlockAlloying />} />
          <Route path='/batchListing' element={<BatchListing />} />
          <Route path='/batchListingGrid' element={<BatchListingGrid />} />
          <Route path='/imagewebcam' element={<ImageWebCam />} />
          <Route path='/printQr' element={<PrintQr />} />
          <Route path='/info' element={<InfoPage />} />
          <Route path='/input' element={<InputSuggestion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
