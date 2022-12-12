import styled from 'styled-components'

export const MainTable = styled.table`
    background-color: #fbfbfb;
    border: 2px solid #555555;
    color: #000000;
`

export const TableHeader = styled.thead`
    /* 沒有加入 display: inline-block，則 table__body 的寬度會縮起來；每一列的高度也無法固定，會均分 height */
    display: inline-block;
    line-height: 20px;
    border-bottom: 2px solid #555555;
`

export const TableBody = styled.tbody`
    /* 加入 display: block，才可以用 height 或 max-height 搭配 overflow 去設定超出高度後的樣式*/
    display: block;
`

export const TableRow = styled.tr`
    display: flex;
    flex-direction: row;
    min-height: 50px;
    :nth-child(2n) {
        background-color: #e9e9e9;
    }
`

export const TableCell = styled.td`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-right: 1px solid #555555;
    div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex: 1;
    }
`

export const TableCellEachDay = styled(TableCell)`
    width: 255px;
    > div:nth-child(1) {
        font-size: 1.2rem;
        padding: 3px 0px;
    }
    > div:nth-child(2) {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    div div {
        padding: 5px 0px;
    }
    div div:not(:nth-child(4)) {
        border-right: 1px solid rgb(18, 52, 86, 0.4);
        flex: 1;
    }
    div div:nth-child(1) {
        color: #b22222;
    }
    div div:nth-child(2) {
        color: #00008b;
    }
    div div:nth-child(4) img {
        width: 30px;
        height: 30px;
    }
`

export const TableCellEachDayMtTitle = styled(TableCell)`
    width: 90px;
`