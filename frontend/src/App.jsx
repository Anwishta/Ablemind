import { Routes, Route } from 'react-router-dom';

import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import About from './pages/About';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import VoiceNavigation from './components/VoiceNavigation';
import ChatBot from './components/ChatBot';
import CustomCursor from './components/CustomCursor';
import VideoCall from './components/VideoCall';
import CourseDetails from './pages/CourseDetails';

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
     <ToastContainer/> 
     <Navbar/>
     <SearchBar/>
     <VoiceNavigation />
      {/* <CustomCursor /> */}
      <Routes>
       <Route path="/about" element={<About/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/collection" element={<Collection/>}/>
       <Route path="/contact" element={<Contact/>}/>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/orders" element={<Orders/>}/>
       <Route path="/place-order" element={<PlaceOrder/>}/>
       <Route path="/product/:productId" element={<Product />} />
        <Route path="/course-details/:productId" element={<CourseDetails />} />
       <Route path="/verify" element={<Verify/>}/>
       <Route path="/videocall/:roomID" element={<VideoCall />} />
      </Routes>
      <ChatBot />
    <Footer/>
    </div>
  );
};
export default App;
