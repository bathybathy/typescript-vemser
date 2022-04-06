import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Menu from "./Menu"
import Logo from "./Logo"

function Header() {
  const {handleLogout, isToken} = useContext<any>(AuthContext)


  return (
    <>
    {isToken && 
      <header>
        <Logo />
        <Menu />
        <button onClick={handleLogout}>Logout</button>
      </header>
    }
    </>
  )
  
}

export default Header