import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SlidingText from "./components/SlidingText";
import './App.css';



function App() {
  return (
    <div className="App">
      <Navbar />
        <SlidingText/>
      <Footer />
    </div>
  );
}

export default App;
