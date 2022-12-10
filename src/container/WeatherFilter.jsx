import { useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const WaetherFilterWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 90px);
    overflow: scroll;
    padding: 10px;
    background-color: #fbfbfb;
`
const FilterControlWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    margin: 0px auto 10px;
    .btn {
        width: 75px;
        padding: 2px 3px;
    }
    @media (min-width: 576px) {
        width: 400px;
        margin: 0px auto 20px;
        .btn {
            width: 150px;
            padding: 4px 6px;
        }
    }
`
const FilterForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    label {
        margin-bottom: 3px;
    }
    @media (min-width: 576px) {
        label {
            margin-bottom: 5px;
        }
    }
`

const FormRow = styled.div`
    input {
        margin-bottom: 8px;
    }
    @media (min-width: 576px) {
        input {
            margin-bottom: 12px;
        }
    }
`

const MainTable = styled.table`
    background-color: #fbfbfb;
    border: 2px solid #555555;
    color: #000000;
`

const TableHeader = styled.thead`
    /* 沒有加入 display: inline-block，則 table__body 的寬度會縮起來；每一列的高度也無法固定，會均分 height */
    display: inline-block;
    line-height: 20px;
    border-bottom: 2px solid #555555;
`

const TableBody = styled.tbody`
    /* 加入 display: block，才可以用 height 或 max-height 搭配 overflow 去設定超出高度後的樣式*/
    display: block;
`

const TableRow = styled.tr`
    display: flex;
    flex-direction: row;
    min-height: 50px;
    :nth-child(2n) {
        background-color: #e9e9e9;
    }
`

const TableCell = styled.td`
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

const TableCellEachDay = styled(TableCell)`
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

const TableCellEachDayMtTitle = styled(TableCell)`
    width: 90px;
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

function WeatherFilter({ locationsWeatherData }) {
    const [dateIndex, setDateIndex] = useState(0)
    const [maxTemperature, setMaxTemperature] = useState(0)
    const [minTemperature, setMinTemperature] = useState(0)
    const [rainRate, setRainRate] = useState(0)
    const [matchLocations, setMatchLocations] = useState([])

    function handleChange(dataType, value) {
        switch (dataType) {
            case 'dateIndex':
                return setDateIndex(Number(value))
            case 'maxTemperature':
                return setMaxTemperature(Number(value))
            case 'minTemperature':
                return setMinTemperature(Number(value))
            case 'rainRate':
                return setRainRate(Number(value))
            default:
                return
        }
    }

    function handleFilter() {
        // 篩選出符合三個條件(最高溫、最低溫、降雨機率)「交集」的地點
        const tempArray = locationsWeatherData.filter((location) => location.weatherElement[3].time[dateIndex].elementValue.value <= maxTemperature && location.weatherElement[4].time[dateIndex].elementValue.value >= minTemperature && location.weatherElement[9].time[dateIndex].elementValue.value <= rainRate)

        setMatchLocations(tempArray)
    }

    return (
        <>
            <Header />
            <WaetherFilterWrapper>
                <FilterControlWrapper>
                    <FilterForm>
                        <FormRow>
                            <label class="form-label">日期</label>
                            <div class="select-wrapper">
                                <select class="form-select" name="a-type" id="a-type" onChange={(e) => handleChange('dateIndex', e.target.value)} required>
                                    {locationsWeatherData?.length > 0 &&
                                        locationsWeatherData[0].weatherElement[3].time.map((eachDay, index) => (
                                            <option value={index} key={eachDay.startTime.slice(0, 10)}>
                                                {eachDay.startTime.slice(0, 10)}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </FormRow>
                        <label class="form-label" for="highestTemperature">
                            最高溫(小於等於__°C)
                        </label>
                        <input class="form-control" id="highestTemperature" type="number" min="-20" max="50" value={maxTemperature} onChange={(e) => handleChange('maxTemperature', e.target.value)}></input>

                        <label class="form-label" for="lowestTemperature">
                            最低溫(大於等於__°C)
                        </label>
                        <input class="form-control" id="lowestTemperature" type="number" min="-20" max="50" value={minTemperature} onChange={(e) => handleChange('minTemperature', e.target.value)}></input>

                        <label class="form-label" for="rainrate">
                            降雨機率(小於等於__%)
                        </label>
                        <input class="form-control" id="rainrate" type="number" min="0" max="100" value={rainRate} onChange={(e) => handleChange('rainRate', e.target.value)}></input>
                    </FilterForm>
                    <button class="btn btn-primary" onClick={() => handleFilter('123')}>
                        Filter
                    </button>
                </FilterControlWrapper>
                {/*  */}
                {matchLocations.length > 0 ? (
                    <MainTable>
                        <TableHeader>
                            <TableRow>
                                <TableCellEachDayMtTitle>山岳</TableCellEachDayMtTitle>
                                {/* 迴圈產生一周 7 天，每日日期之表頭欄位(7欄) */}
                                {matchLocations.length > 0 &&
                                    matchLocations[0].weatherElement[0].time.map((time) => (
                                        <TableCellEachDay key={time.startTime} class="table-cell table-cell-each-day">
                                            <div>{time.startTime.slice(0, 10)}</div>
                                            <div>
                                                <div>最高溫</div>
                                                <div>最低溫</div>
                                                <div>降雨機率</div>
                                                <div>天氣現象</div>
                                            </div>
                                        </TableCellEachDay>
                                    ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* 迴圈產生所有山岳地點，每個地點為一個 TableRow */}
                            {matchLocations.map((location) => (
                                <TableRow key={location.parameterSet.parameter.parameterValue}>
                                    <TableCellEachDayMtTitle>
                                        <Link to={'/mountain/' + location.parameterSet.parameter.parameterValue}>{location.locationName}</Link>
                                    </TableCellEachDayMtTitle>
                                    {/* 迴圈產生一周 7 天，每日天氣預報資訊 */}
                                    {Array.from({ length: 7 }, (value, index) => (
                                        <TableCellEachDay>
                                            <div></div>
                                            <div>
                                                <div>{location.weatherElement[3].time[index].elementValue.value}°C</div>
                                                <div>{location.weatherElement[4].time[index].elementValue.value}°C</div>
                                                <div>{location.weatherElement[9].time[index].elementValue.value || 'NA'}%</div>
                                                <div>
                                                    <img src={'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/' + location.weatherElement[12].time[0].elementValue[1].value + '.svg'} alt="" title={location.weatherElement[12].time[0].elementValue[0].value} />
                                                </div>
                                            </div>
                                        </TableCellEachDay>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </MainTable>
                ) : (
                    '查無符合條件之地點，請重新搜尋'
                )}
            </WaetherFilterWrapper>
            <Footer />
        </>
    )
}

export default WeatherFilter
