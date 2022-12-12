import styled from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom'

export const Link = styled(ReactRouterLink)`
    width: 100%;
    margin-right: 0.5rem;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    color: #0d6efd;
    :hover {
        color: #1133dd;
    }
    @media (min-width: 576px) {
        margin-right: 1.2rem;
    }
`
