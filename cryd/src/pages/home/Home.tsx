import { 
    Card,
    Container,
    CardTitle,
 } from './Home.styles'

function Home() {
  return (
    <Container>
        <Card>
            <CardTitle>Usuários</CardTitle>
        </Card>
        <Card>
            <CardTitle>Endereço</CardTitle>
        </Card>
    </Container>
  )
}

export default Home