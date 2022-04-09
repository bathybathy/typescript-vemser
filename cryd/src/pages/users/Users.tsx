import { useEffect, useState, useContext } from "react";
import { useFormik } from "formik";
import api from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { PessoaDTO } from "../../model/PessoaDTO";
import {
  ContainerList,
  DivTitle,
  TdNome,
  Table,
  Tr,
  Td,
  Th,
  TitleUsers,
  ContainerUsers,
} from "./Users.styles";
import {
  ContainerForm,
  BsPencilStyled,
  ContainerAddressPage,
  AiOutlineDeleteStyled,
} from "../address/Address.styles";
import {
  InputForm,
  LabelForm, 
  ButtonForm
} from '../login/Login.styles'
import { DivForm } from "../login/Login.styles";

function Users() {
  const [users, setUsers] = useState<PessoaDTO["pessoa"]>([]);
  const [loading, setLoading] = useState(true);
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const [idUpdate, setIdUpdate] = useState<number>();
  import * as Yup from 'yup';

  useEffect(() => {
    getUsers();
    setLoading(false);
  }, []);

  // lists all users
  const getUsers = async () => {
    try {
      const { data } = await api.get<PessoaDTO["pessoa"]>("/pessoa");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users);

  // refreshes page
  const refresh = () => {
    window.location.reload();
  };

  // create new user
  const postNewUser = async (values:any) => {
    const newUser = {
      nome: values.nome,
      dataNascimento: values.dataNascimento,
      cpf: values.cpf,
      email: values.email,
    };
    try {
      const { data } = await api.post("/pessoa", newUser);
      console.log(data);
      alert("cadastro realizado com sucesso");
    } catch (error) {
      console.log(error);
    }
  };

  // delete user
  const deleteUser = async (id: number) => {
    try {
      const { data } = await api.delete(`/pessoa/${id}`);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  // gets one user by their id
  const getUserById = async (id: number) => {
    try {
      const { data } = await api.get(`pessoa/{idPessoa}?idPessoa=${id}`);
      console.log(data);
      formikProps.setFieldValue("nome", data.nome);
      formikProps.setFieldValue("dataNascimento", data.dataNascimento);
      formikProps.setFieldValue("cpf", data.cpf);
      formikProps.setFieldValue("complemento", data.complemento);
      formikProps.setFieldValue("email", data.email);
    } catch (error) {
      console.log(error);
    }
  };

  // posts update to api
  const updateUser = async () => {
    const updatedUser = {
      nome: formikProps.values.nome,
      cpf: formikProps.values.cpf,
      email: formikProps.values.email,
      dataNascimento: formikProps.values.dataNascimento,
      idPessoa: idUpdate,
    };
    try {
      const { data } = await api.put(`/pessoa/${idUpdate}`, updatedUser);
      alert("cadastro editado com sucesso");
      formikProps.resetForm();
      setAtualizar(false);
    } catch (error) {
      console.log(error);
    }
  };

  // setups the update process
  const setupUpdateUser = (id: number) => {
    getUserById(id);
    setAtualizar(true);
    setIdUpdate(id);
    console.log(id);
  };

  // validação
  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'Muito curto')
      .max(50, 'Muito longo')
      .required('Campo obrigatório'),
      cep: Yup.string()
      .min(9, 'muito curto')
      .max(9, 'muito longo')
      .required('Campo obrigatório'),
      bairro: Yup.string()
      .min(3, 'muito curto')
      .max(50, 'muito longo')
      .required('Campo obrigatório'),
      localidade: Yup.string()
      .min(3, 'muito curto')
      .max(30, 'muito longo')
      .required('Campo obrigatório'),
      numero: Yup.string()
      .min(1, 'muito curto')
      .max(10, 'muito longo')
      .required('Campo obrigatório'),
      complemento: Yup.string()
      .min(1, 'muito curto')
      .max(10, 'muito longo'),
      uf: Yup.string()
      .min(2, 'muito curto')
      .max(2, 'muito longo')
      .required('Campo obrigatório'),
      pais: Yup.string()
      .min(3, 'muito curto')
      .max(40, 'muito longo')
      .required('Campo obrigatório'),
      
  });

  // formik 
  const formikProps = useFormik({
    initialValues: {
      nome: "",
      dataNascimento: "",
      cpf: "",
      email: "",
    },
    onSubmit: async (values: any, actions: any) => {
      console.log(atualizar);
      if (!atualizar) {
        await postNewUser(values);
      }
      if (atualizar) {
        await updateUser();
      }
      actions.setSubmitting(false);
    },
    validationSchema: SignupSchema
  });

  if (loading) {
    return <h1>Loading</h1>;
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
              <LabelForm htmlFor="nome">Nome:</LabelForm>
              <InputForm
                id="nome"
                name="nome"
                placeholder="Digite seu nome"
                value={formikProps.values.nome}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="dataNascimento">Data de nascimento:</LabelForm>
              <InputForm
                id="dataNascimento"
                name="dataNascimento"
                placeholder="Digite sua data de nascimento"
                value={formikProps.values.dataNascimento}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="cpf">CPF:</LabelForm>
              <InputForm
                id="cpf"
                name="cpf"
                placeholder="Digite o número do seu CPF"
                value={formikProps.values.cpf}
                onChange={formikProps.handleChange}
              />
            </DivForm>

            <DivForm>
              <LabelForm htmlFor="email">E-mail:</LabelForm>
              <InputForm
                id="email"
                name="email"
                placeholder="Digite o seu email"
                value={formikProps.values.email}
                onChange={formikProps.handleChange}
              />
            </DivForm>
            <ButtonForm type="submit">Submit</ButtonForm>
          </form>
        </ContainerForm>
        <DivTitle>
          <TitleUsers>Lista de usuários</TitleUsers>
        </DivTitle>
        <ContainerList>
          <Table>
            <thead>
              <Tr>
                <Th>Usuário:</Th>
                <Th>Data de Nascimento:</Th>
                <Th>CPF:</Th>
                <Th>Email:</Th>
                <Th>Editar:</Th>
                <Th>Deletar:</Th>
              </Tr>
            </thead>
            <tbody>
              {users.map((pessoa) => (
                <Tr key={pessoa.idPessoa}>
                  <TdNome>{pessoa.nome}</TdNome>
                  <Td>{pessoa.dataNascimento}</Td>
                  <Td>{pessoa.cpf}</Td>
                  <Td>{pessoa.email}</Td>
                  <Td>
                    <BsPencilStyled
                      onClick={() => setupUpdateUser(pessoa.idPessoa)}
                    />
                  </Td>
                  <Td>
                    <AiOutlineDeleteStyled
                      onClick={() => deleteUser(pessoa.idPessoa)}
                    />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </ContainerList>
      </ContainerUsers>
    </ContainerUsers>
  );
}

export default Users;
