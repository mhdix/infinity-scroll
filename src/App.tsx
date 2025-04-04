import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./app/page";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-16">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
