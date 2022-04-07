import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderSide = styled.header`
    width: 13%;
    min-height: 100% !important;
    background-color: rgba(54, 55, 64, 1);
`

export const LiHeader = styled.li`
    padding: 10px 0;
    
`

export const LinkHeader = styled(Link)`
    text-decoration: none;
    color: rgba(221, 226, 255, 1);
    
`

export const UlNav = styled.ul`
    list-style-type: none;
    margin: 0;
    padding-left: 10px;
`