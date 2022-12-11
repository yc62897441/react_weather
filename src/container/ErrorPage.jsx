import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ErrorPageWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 90px);
    overflow: scroll;
    padding: 10px;
    background-color: #fbfbfb;
    display: flex;
    justify-content: center;
    align-items: center;
`

function ErrorPage() {
    return (
        <>
            <Header />
            <ErrorPageWrapper>
                <h2>公開資料取得異常</h2>
            </ErrorPageWrapper>
            <Footer />
        </>
    )
}
export default ErrorPage
