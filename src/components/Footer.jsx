import styled from 'styled-components'

const FooterWrapperHeight = '40px'

const FooterWrapper = styled.div`
    width: 100%;
    height: ${FooterWrapperHeight};
    background-color: lightblue;
`

function Header() {
    return (
        <FooterWrapper>
            <div>This is footer</div>
        </FooterWrapper>
    )
}

export default Header
