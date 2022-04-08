import styled from "styled-components";
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';

export const ContainerAddress = styled.div`
    width: 85%;
`
export const ContainerListAddress = styled.div`
    width: 85%;
`

export const ContainerAddressPage = styled.div`
    display: flex;
    
`
export const AiOutlineDeleteStyled = styled(AiOutlineDelete)`
    font-size: 20px;
    :hover{
        color: red;
    }
`
export const BsPencilStyled = styled(BsPencil)`
font-size: 20px;
    :hover{
        color: green;
    }
`
export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 28%;
    border: 1px solid rgba(223, 224, 235, 1); 
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    padding: 30px 0;
`
