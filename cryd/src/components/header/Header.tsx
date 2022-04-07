import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Menu from "./Menu"
import { HeaderSide, ButtonLogout, LogoImg, LogoDiv } from './Header.styles'

function Header() {
  const {handleLogout, isToken} = useContext<any>(AuthContext)


  return (
    <>
    {isToken && 
      <HeaderSide>
        <LogoDiv>
        <LogoImg />
        </LogoDiv>
        <Menu />
        <ButtonLogout onClick={handleLogout}>Logout</ButtonLogout>
      </HeaderSide>
    }
    </>
  )
  
}

export default Header