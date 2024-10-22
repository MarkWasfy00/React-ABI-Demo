import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Weather from "./pages/Weather/Weather"
import Crypto from "./pages/Crypto/Crypto"
import Covid from "./pages/Covid/Covid"
import Header from "./components/Header/Header"


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/covid" element={<Covid />} />
      </Routes>
    </>
  )
}

export default App
