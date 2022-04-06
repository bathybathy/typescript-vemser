import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Users from "./pages/users/Users"
import Address from "./pages/address/Address"
import NotFound from "./pages/notFound/NotFound"
import AuthProvider from "./context/AuthContext"

function Routers() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='*' element={ <NotFound />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users /> } />
          <Route path='/address' element={ <Address /> } />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default Routers