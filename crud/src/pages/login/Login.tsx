import { useContext } from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik'

import { ContainerLogin, DivForm, TitleLogin } from './Login.styles'
import { LoginDTO } from '../../model/LoginDTO'
import { AuthContext } from '../../context/AuthContext'

function Login() {
    const {handleLogin} = useContext<any>(AuthContext);

  return (
    <ContainerLogin>
        <TitleLogin>Login Vemser</TitleLogin>
        <Formik
            initialValues={{
                usuario:'',
                senha:''
            }}
            onSubmit={( 
                values: LoginDTO,
                { setSubmitting }: FormikHelpers<LoginDTO>
            ) => {
                handleLogin(values);
                setSubmitting(false);
            }
            }>
        
            <Form>
                <DivForm>
                    <label htmlFor='usuario'>Usuário</label>
                    <Field name='usuario' id='usuario' placeholder='Digite seu nome de usuário' />
                </DivForm>
                <DivForm>
                    <label htmlFor='senha'>Senha:</label>
                    <Field name='senha' id='senha' type='password' placeholder='Digite sua senha' />
                </DivForm>
                <button type='submit'>Entrar</button>
            </Form>

        </Formik>
    </ContainerLogin>
  )
}

export default Login