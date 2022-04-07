import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Menu from "./Menu"
import Logo from "./Logo"
import { HeaderSide } from './Header.styles'

function Header() {
  const {handleLogout, isToken} = useContext<any>(AuthContext)


  return (
    <>
    {isToken && 
      <HeaderSide>
        <Logo />
        <Menu />
        <button onClick={handleLogout}>Logout</button>
      </HeaderSide>
    }
    </>
  )
  
}

export default Header