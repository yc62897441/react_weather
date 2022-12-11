import { useState } from 'react'
import styled, { css } from 'styled-components'
import { Link as ReactRouterLink } from 'react-router-dom'
import burgerBarImg from '../static/burger-bar.png'

const HeaderWrapperHeight = '50px'

const HeaderWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${HeaderWrapperHeight};
    padding: 0px 15px;
    background-color: #eeeeee;
    @media (min-width: 576px) {
        padding: 0px 30px;
    }
`

const LinksWrapper = styled.div`
    position: absolute;
    display: block;
    top: ${HeaderWrapperHeight};
    left: 0px;
    width: 100%;
    padding: 10px 5px;
    background-color: #eeeeee;

    transform: scale(1, 0);
    transform-origin: top;
    transition: transform 0.3s ease-out;
    opacity: 0;

    /* 轉場動畫  */
    ${({ isShowLinks }) =>
        isShowLinks &&
        css`
            transform: scale(1, 1);
            transition: opacity 0.2s ease-out 0.15s;
            opacity: 1;
        `}

    @media (min-width: 576px) {
        position: relative;
        top: 0px;
        width: auto;
        transform: scale(1, 1);
        transition: opacity 0.2s ease-out 0.15s;
        opacity: 1;
    }
`

const Link = styled(ReactRouterLink)`
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

const DropdownBtn = styled.div`
    img {
        width: 30px;
        height: 30px;
    }
    @media (min-width: 576px) {
        position: absolute;
        opacity: 0;
    }
`

const SearchBarWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
`

const SearchBarForm = styled.form`
    display: flex;
    align-items: center;
    width: 200px;
    border: 2px solid black;
    border-radius: 5px;
`

const SearchBarInput = styled.input`
    width: 100%;
    padding: 5px 12px;
`

const SearchBarList = styled.div`
    position: absolute;
    top: 35px;
    width: 200px;
    z-index: 999;
    padding: 3px 12px;
    border: 2px solid rgb(34, 92, 178);
    border-radius: 5px;
    background-color: #ffffff;
    opacity: ${({ showSearchList }) => (showSearchList ? 1 : 0)};
`

const SearchBarListItem = styled.div`
    margin: 8px 0px;
    cursor: pointer;
`

const links = [
    {
        name: '天氣總攬',
        path: 'homeview',
    },
    {
        name: '天氣條件檢索',
        path: 'weatherfilter',
    },
    {
        name: '山岳地圖',
        path: 'weathermap',
    },
]

function Header({ locationsWeatherData }) {
    const [inputValue, setInputValue] = useState('')
    const [searchListItems, setSearchListItems] = useState([])
    const [isShowLinks, setIsShowLinks] = useState(false)
    const isShowSearchList = inputValue.length > 0 ? true : false

    function handleChangeInput(value) {
        setInputValue(value)
        setSearchListItems(
            locationsWeatherData.filter((location) => {
                if (location.locationName.includes(value)) {
                    return location
                }
                return
            })
        )
    }

    function handleToggleShowLinks() {
        setIsShowLinks(!isShowLinks)
    }

    return (
        <HeaderWrapper>
            <DropdownBtn>
                <img onClick={handleToggleShowLinks} src={burgerBarImg} />
            </DropdownBtn>
            <LinksWrapper isShowLinks={isShowLinks}>
                {links.map((link) => (
                    <Link key={link.name} to={'/' + link.path}>
                        {link.name}
                    </Link>
                ))}
            </LinksWrapper>
            <SearchBarWrapper>
                <SearchBarForm>
                    <SearchBarInput placeholder="請輸入山岳" onChange={(e) => handleChangeInput(e.target.value)} value={inputValue}></SearchBarInput>
                </SearchBarForm>
                <SearchBarList showSearchList={isShowSearchList}>
                    {searchListItems.map((location) => (
                        <SearchBarListItem>
                            <Link to={'/mountain/' + location.parameterSet.parameter.parameterValue}>{location.locationName}</Link>
                        </SearchBarListItem>
                    ))}
                </SearchBarList>
            </SearchBarWrapper>
        </HeaderWrapper>
    )
}

export default Header
