import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

function Header() {
  const {handleLogout} = useContext<any>(AuthContext)

  return (
    <div>
      <h1>Header</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header