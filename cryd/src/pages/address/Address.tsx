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
  const [address, setAddress] = useState<any>({});
  const formikRef:any = useRef()

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
      formikRef().setFieldValue("logradouro", data.logradouro);
      formikRef().setFieldValue("localidade", data.cidade);
      formikRef().setFieldValue("uf", data.estado);

    } catch (error) {
      console.log(error)
    }
  }

  // setups the update process
  const setupAddress = (id:number) =>{
    getAddressById(id)

  }
  // sends the updated address to api
  const updateAddress = async (id: number) => {
    try {
      const { data } = await api.put(`/endereco/${id}`);
    } catch (error) {}
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
  const getAddress = async (values: EnderecoDTO, setFieldValue: any) => {
    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${values.cep}/json/`
      );
      console.log(data);
      setFieldValue("logradouro", data.logradouro);
      setFieldValue("bairro", data.bairro);
      setFieldValue("localidade", data.localidade);
      setFieldValue("uf", data.uf);
    } catch (error) {
      console.log(error);
    }
  };

  // posts a new address to the api
  const postAddress = async (values: EnderecoDTO) => {
    const newAddress = {
      cep: values.cep,
      cidade: values.localidade,
      complemento: values.complemento,
      estado: values.uf,
      logradouro: values.logradouro,
      pais: values.pais,
      tipo: values.tipo,
      numero: parseInt(values.numero),
    };
    try {
      const { data } = await api.put("/endereco/650", newAddress);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formWrapper = () =>{ }

  const initialValues: EnderecoDTO = {
    cep: "",
    logradouro: "",
    bairro: "",
    localidade: "",
    uf: "",
    pais: "",
    tipo: "RESIDENCIAL",
    complemento: "",
    numero: "",
  };

  const formikProps = useFormik({
    initialValues: {
      initialValues
    },
    onSubmit: async (values:any, actions) => {
      postAddress(values);
      actions.setSubmitting(false);;
    },
  })

  return (
    <ContainerAddressPage>
    <ContainerUsers>
        <DivTitle>
          <TitleUsers>Endereços</TitleUsers>
        </DivTitle>
        <ContainerForm>
        <Formik
          // validationSchema={SignupSchema}
          innerRef={formikRef}
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            postAddress(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <DivForm>
              <label htmlFor="cep">CEP:</label>
              <Field id="cep" name="cep" placeholder="Digite seu cep" />

              <button
                type="button"
                onClick={() => getAddress(props.values, props.setFieldValue)}
              >
                Buscar
              </button>
              </DivForm>

              <DivForm>
              <label htmlFor="logradouro">Logradouro:</label>
              <Field
                id="logradouro"
                name="logradouro"
                placeholder="Digite seu logradouro"
              />
              </DivForm>

              <DivForm>
              <label htmlFor="numero">Número:</label>
              <Field
                id="numero"
                name="numero"
                placeholder="Digite o número da sua residência"
              />
              </DivForm>

              <DivForm>
              <label htmlFor="complemento">Complemento:</label>
              <Field
                id="complemento"
                name="complemento"
                placeholder="Digite o seu complemento"
              />
              </DivForm>

              <DivForm>
              <label htmlFor="bairro">Bairro:</label>
              <Field
                id="bairro"
                name="bairro"
                placeholder="Digite seu bairro"
              />
              </DivForm>

              <DivForm>
              <label htmlFor="localidade">Cidade:</label>
              <Field
                id="localidade"
                name="localidade"
                placeholder="Digite sua localidade"
              />
              </DivForm>

              <DivForm>
              <label htmlFor="uf">Estado:</label>
              <Field
                id="uf"
                name="uf"
                placeholder="Digite a sigla do seu estado"
              />
              </DivForm>

              <DivForm>
              <label htmlFor="pais">País:</label>
              <Field id="pais" name="pais" placeholder="Digite o seu país" />
              </DivForm>

              <DivForm>
              <label htmlFor="tipo">Tipo de contato:</label>
              <Field as="select" name="tipo">
                <option value="RESIDENCIAL">Residencial</option>
                <option value="COMERCIAL">Comercial</option>
              </Field>
              </DivForm>

              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
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
                      onClick={() => setupAddress(e.idEndereco)}
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
