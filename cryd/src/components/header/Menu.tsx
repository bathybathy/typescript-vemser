
import { Link } from 'react-router-dom'

function Menu() {

  return (
    <nav>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/users'>Usuários</Link></li>
            <li><Link to='/address'>Endereços</Link></li>
        </ul>
    </nav>
  )
}

export default Menu