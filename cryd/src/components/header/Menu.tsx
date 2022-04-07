
import { LiHeader, LinkHeader, UlNav } from './Header.styles'

function Menu() {

  return (
    <nav>
        <UlNav>
            <LiHeader><LinkHeader to='/'>Home</LinkHeader></LiHeader>
            <LiHeader><LinkHeader to='/users'>Usuários</LinkHeader></LiHeader>
            <LiHeader><LinkHeader to='/address'>Endereços</LinkHeader></LiHeader>
        </UlNav>
    </nav>
  )
}

export default Menu