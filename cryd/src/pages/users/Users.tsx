import { useEffect, useState, useContext } from "react"
import { useFormik } from "formik"
import api from "../../api"
import { AuthContext } from "../../context/AuthContext"
import { PessoaDTO } from "../../model/PessoaDTO"
import { ContainerList, DivTitle, TdNome, Table, Tr, Td, Th, TitleUsers, ContainerUsers } from "./Users.styles"
import { ContainerForm,
  BsPencilStyled,
  ContainerAddressPage,
  AiOutlineDeleteStyled, } from '../address/Address.styles'
import { DivForm } from "../login/Login.styles";

function Users() {
  const [users, setUsers] = useState<PessoaDTO['pessoa']>([])
  const [loading, setLoading] = useState(true)
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>();

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

  const formikProps = useFormik({
    initialValues: {
      nome: "",
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      pais: "",
      tipo: "RESIDENCIAL",
      complemento: "",
      numero: "",
    },
    onSubmit: async (values: any, actions: any) => {
      console.log(atualizar);
      if (!atualizar) {
        // await postAddress(values);
      }
      if (atualizar) {
        // await updateAddress();
      }
      actions.setSubmitting(false);
    },
  });

  if(loading){
    return(<h1>Loading</h1>)
  }

  return (
    <ContainerUsers>
      <ContainerUsers>
        <DivTitle>
          <TitleUsers>Cadastrar Usuário</TitleUsers>
        </DivTitle>
        <ContainerForm>
          <form onSubmit={formikProps.handleSubmit}>
            <DivForm>
              <label htmlFor="nome">Nome:</label>
              <input
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={formikProps.values.nome}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="logradouro">Logradouro:</label>
              <input
                id="logradouro"
                name="logradouro"
                placeholder="Digite seu logradouro"
                value={formikProps.values.logradouro}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="numero">Número:</label>
              <input
                id="numero"
                name="numero"
                placeholder="Digite o número da sua residência"
                value={formikProps.values.numero}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="complemento">Complemento:</label>
              <input
                id="complemento"
                name="complemento"
                placeholder="Digite o seu complemento"
                value={formikProps.values.complemento}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="bairro">Bairro:</label>
              <input
                id="bairro"
                name="bairro"
                placeholder="Digite seu bairro"
                value={formikProps.values.bairro}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="localidade">Cidade:</label>
              <input
                id="localidade"
                name="localidade"
                placeholder="Digite sua localidade"
                value={formikProps.values.localidade}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="uf">Estado:</label>
              <input
                id="uf"
                name="uf"
                placeholder="Digite a sigla do seu estado"
                value={formikProps.values.uf}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="pais">País:</label>
              <input
                id="pais"
                name="pais"
                placeholder="Digite o seu país"
                value={formikProps.values.pais}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <label htmlFor="tipo">Tipo de contato:</label>
              <select
                name="tipo"
                value={formikProps.values.tipo}
                onChange={formikProps.handleChange}
              >
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </select>
            </DivForm>

            <button type="submit">Submit</button>
          </form>
        </ContainerForm>
    <DivTitle>
      <TitleUsers>Usuários</TitleUsers>
    </DivTitle>
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
            <TdNome>
              {pessoa.nome}
            </TdNome>
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
   </ContainerUsers>
   </ContainerUsers>
  )
}

export default Users