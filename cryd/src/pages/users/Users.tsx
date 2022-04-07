import { useEffect, useState, useContext } from "react"

import api from "../../api"
import { AuthContext } from "../../context/AuthContext"
import { PessoaDTO } from "../../model/PessoaDTO"
import { ContainerList, Table, Tr, Td, Th } from "./Users.styles"

function Users() {
  const [users, setUsers] = useState<PessoaDTO['pessoa']>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getUsers();
    setLoading(false);
  },[])

  const getUsers = async () =>{
    try {
      const {data} = await api.get<PessoaDTO['pessoa']>('/pessoa')
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }
  console.log(users)

  if(loading){
    return(<h1>Loading</h1>)
  }

  return (
    <ContainerList>
      <Table>
        <thead>
         <Tr>
            <Th>Usuário:</Th>
            <Th>Data de Nascimento:</Th>
            <Th>CPF:</Th>
            <Th>Email:</Th>
         </Tr>
        </thead>
        <tbody>
         {users.map((pessoa) =>(
          <Tr key={pessoa.idPessoa}>
            <Td>
              {pessoa.nome}
            </Td>
            <Td>
              {pessoa.dataNascimento}
            </Td>
            <Td>
              {pessoa.cpf}
            </Td>
            <Td>
              {pessoa.email}
            </Td>
          </Tr>  
      ))}
      </tbody>
      </Table> 
   </ContainerList>
  )
}

export default Users