import axios from "axios";
import { Formik, Form, Field, useFormik } from "formik";
import { useEffect, useState } from "react";
import api from "../../api";
import { EnderecoDTO } from "../../model/EnderecoDTO";
import { useRef } from "react";

import {
  ContainerForm,
  BsPencilStyled,
  ContainerAddressPage,
  AiOutlineDeleteStyled,
} from "./Address.styles";
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
} from "../users/Users.styles";

import { DivForm } from "../login/Login.styles";

export const Address: React.FC<{}> = () => {
  const [lista, setLista] = useState<any>([]);
  const [atualizar, setAtualizar] = useState<boolean>(false);
  const formikRef:any = useRef();
  const [idUpdate, setIdUpdate] = useState<number>()

  useEffect(() => {
    listAddress();
  }, []);

  // refreshes page
  const refresh = () =>{
    window.location.reload();
}

  // deletes address from list
  const deleteAddress = async (id: number) => {
    try {
      const { data } = await api.delete(`/endereco/${id}`);
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  //gets one address from api to set it up on inputs
  const getAddressById = async (id:number) =>{
    try {
      const { data } = await api.get(`endereco/${id}`)
      console.log(data)
      formikProps.setFieldValue("logradouro", data.logradouro);
      formikProps.setFieldValue("localidade", data.cidade);
      formikProps.setFieldValue("uf", data.estado);
      formikProps.setFieldValue("complemento", data.complemento);
      formikProps.setFieldValue("numero", data.numero);
      formikProps.setFieldValue("cep", data.cep);
      formikProps.setFieldValue("pais", data.pais);

    } catch (error) {
      console.log(error)
    }
  }

  // setups the update process
  const setupUpdateAddress = (id:number) =>{
    getAddressById(id);
    setAtualizar(true)
    setIdUpdate(id);

  }
  // sends the updated address to api
  const updateAddress = async () => {
    const updatedAddress ={
      cep: formikProps.values.cep,
      cidade: formikProps.values.localidade,
      complemento: formikProps.values.complemento,
      estado: formikProps.values.uf,
      logradouro: formikProps.values.logradouro,
      pais: formikProps.values.pais,
      tipo: formikProps.values.tipo,
      numero: parseInt(formikProps.values.numero),
    }
    try {
      const { data } = await api.put(`/endereco/${idUpdate}`, updatedAddress);
      alert("cadastro editado com sucesso")
    } catch (error) {
      console.log(error)
    }
  };

  // lists all addresses
  const listAddress = async () => {
    try {
      const { data } = await api.get("/endereco");
      setLista(data);
    } catch (error) {
      console.log(error);
    }
  };

  // gets address from cep api
  const getAddress = async (values:string) => {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${values}/json/`
      );
      console.log(data);
      formikProps.setFieldValue("logradouro", data.logradouro);
      formikProps.setFieldValue("bairro", data.bairro);
      formikProps.setFieldValue("localidade", data.localidade);
      formikProps.setFieldValue("uf", data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  // posts a new address to the api
  const postAddress = async (values: EnderecoDTO) => {
    const newAddress = {
      cep: formikProps.values.cep,
      cidade: formikProps.values.localidade,
      complemento: formikProps.values.complemento,
      estado: formikProps.values.uf,
      logradouro: formikProps.values.logradouro,
      pais: formikProps.values.pais,
      tipo: formikProps.values.tipo,
      numero: parseInt(formikProps.values.numero),
    };
    try {
      const { data } = await api.put("/endereco/650", newAddress);
      console.log(data);
      alert("cadastro realizado com sucesso")
    } catch (error) {
      console.log(error);
    }
  };

  const formikProps = useFormik({
    initialValues: {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    pais: "",
    tipo: "RESIDENCIAL",
    complemento: "",
    numero: "",
    },
    onSubmit: async (values:any, actions:any) => {
      console.log(atualizar)
      if(!atualizar){
      await postAddress(values);}
      if(atualizar){
        await updateAddress()
      }
      actions.setSubmitting(false);
    },
  })

  return (
    <ContainerAddressPage>
    <ContainerUsers>
        <DivTitle>
          <TitleUsers>Endereços</TitleUsers>
        </DivTitle>
        <ContainerForm>
       
         
            <form onSubmit={formikProps.handleSubmit}>
              <DivForm>
              <label htmlFor="cep">CEP:</label>
              <input id="cep" name="cep" placeholder="Digite seu cep" value={formikProps.values.cep} onChange={formikProps.handleChange}/>

              <button
                type="button"
                onClick={() => getAddress(formikProps.values.cep)}
              >
                Buscar
              </button>
              </DivForm>

              <DivForm>
              <label htmlFor="logradouro">Logradouro:</label>
              <input
                id="logradouro"
                name="logradouro"
                placeholder="Digite seu logradouro"
                value={formikProps.values.logradouro} onChange={formikProps.handleChange}
              />
              </DivForm>

              <DivForm>
              <label htmlFor="numero">Número:</label>
              <input
                id="numero"
                name="numero"
                placeholder="Digite o número da sua residência"
                value={formikProps.values.numero} onChange={formikProps.handleChange}
              />
              </DivForm>

              <DivForm>
              <label htmlFor="complemento">Complemento:</label>
              <input
                id="complemento"
                name="complemento"
                placeholder="Digite o seu complemento"
                value={formikProps.values.complemento} onChange={formikProps.handleChange}
              />
              </DivForm>

              <DivForm>
              <label htmlFor="bairro">Bairro:</label>
              <input
                id="bairro"
                name="bairro"
                placeholder="Digite seu bairro"
                value={formikProps.values.bairro} onChange={formikProps.handleChange}
              />
              </DivForm>

              <DivForm>
              <label htmlFor="localidade">Cidade:</label>
              <input
                id="localidade"
                name="localidade"
                placeholder="Digite sua localidade"
                value={formikProps.values.localidade} onChange={formikProps.handleChange}
              />
              </DivForm>

              <DivForm>
              <label htmlFor="uf">Estado:</label>
              <input
                id="uf"
                name="uf"
                placeholder="Digite a sigla do seu estado"
                value={formikProps.values.uf} onChange={formikProps.handleChange}
              />
              </DivForm>

              <DivForm>
              <label htmlFor="pais">País:</label>
              <input id="pais" name="pais" placeholder="Digite o seu país" 
              value={formikProps.values.pais} onChange={formikProps.handleChange}/>
              </DivForm>

              <DivForm>
              <label htmlFor="tipo">Tipo de contato:</label>
              <select name="tipo" value={formikProps.values.tipo} onChange={formikProps.handleChange}>
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </select>
              </DivForm>

              <button type="submit">Submit</button>
            </form>
      </ContainerForm>
      <ContainerUsers>
        <DivTitle>
          <TitleUsers>Lista de endereços</TitleUsers>
        </DivTitle>
        <ContainerList>
          <Table>
            <thead>
              <Tr>
                <Th>Rua:</Th>
                <Th>Número:</Th>
                <Th>Complemento:</Th>
                <Th>Cidade:</Th>
                <Th>Estado:</Th>
                <Th>País:</Th>
                <Th>Opções:</Th>
              </Tr>
            </thead>
            <tbody>
              {lista.map((e: any) => (
                <Tr key={e.idEndereco}>
                  <TdNome>{e.logradouro}</TdNome>
                  <Td>{e.numero}</Td>
                  <Td>{e.complemento}</Td>
                  <Td>{e.cidade}</Td>
                  <Td>{e.estado}</Td>
                  <Td>{e.pais}</Td>
                  <Td>
                    <BsPencilStyled
                      onClick={() => setupUpdateAddress(e.idEndereco)}
                    />
                    <AiOutlineDeleteStyled
                      onClick={() => deleteAddress(e.idEndereco)}
                    />
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </ContainerList>
      </ContainerUsers>
    </ContainerUsers>
    </ContainerAddressPage>
  );
};

export default Address;
