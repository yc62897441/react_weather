import { useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatMoment } from '../helpers/moment'
import { MainWrapper } from '../components/MainWrapper'
import { MainTable, TableHeader, TableBody, TableRow, TableCellEachDay, TableCellEachDayMtTitle } from '../components/FormGroup'
import { Link } from '../components/Link'

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
        // ???????????????????????????(????????????????????????????????????)?????????????????????
        const tempArray = locationsWeatherData.filter((location) => location.weatherElement[3].time[dateIndex].elementValue.value <= maxTemperature && location.weatherElement[4].time[dateIndex].elementValue.value >= minTemperature && location.weatherElement[9].time[dateIndex].elementValue.value <= rainRate)

        setMatchLocations(tempArray)
    }

    return (
        <>
            <Header />
            <MainWrapper>
                <FilterControlWrapper>
                    <FilterForm>
                        <FormRow>
                            <label class="form-label">??????</label>
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
                            ?????????(????????????__??C)
                        </label>
                        <input class="form-control" id="highestTemperature" type="number" min="-20" max="50" value={maxTemperature} onChange={(e) => handleChange('maxTemperature', e.target.value)}></input>

                        <label class="form-label" for="lowestTemperature">
                            ?????????(????????????__??C)
                        </label>
                        <input class="form-control" id="lowestTemperature" type="number" min="-20" max="50" value={minTemperature} onChange={(e) => handleChange('minTemperature', e.target.value)}></input>

                        <label class="form-label" for="rainrate">
                            ????????????(????????????__%)
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
                                <TableCellEachDayMtTitle>??????</TableCellEachDayMtTitle>
                                {/* ?????????????????? 7 ?????????????????????????????????(7???) */}
                                {matchLocations.length > 0 &&
                                    matchLocations[0].weatherElement[0].time.map((time) => (
                                        <TableCellEachDay key={time.startTime} class="table-cell table-cell-each-day">
                                            <div>{formatMoment(time.startTime, 'YYYY-MM-DD')}</div>
                                            <div>
                                                <div>?????????</div>
                                                <div>?????????</div>
                                                <div>????????????</div>
                                                <div>????????????</div>
                                            </div>
                                        </TableCellEachDay>
                                    ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* ?????????????????????????????????????????????????????? TableRow */}
                            {matchLocations.map((location) => (
                                <TableRow key={location.parameterSet.parameter.parameterValue}>
                                    <TableCellEachDayMtTitle>
                                        <Link to={'/mountain/' + location.parameterSet.parameter.parameterValue}>{location.locationName}</Link>
                                    </TableCellEachDayMtTitle>
                                    {/* ?????????????????? 7 ?????????????????????????????? */}
                                    {Array.from({ length: 7 }, (value, index) => (
                                        <TableCellEachDay>
                                            <div></div>
                                            <div>
                                                <div>{location.weatherElement[3].time[index].elementValue.value}??C</div>
                                                <div>{location.weatherElement[4].time[index].elementValue.value}??C</div>
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
                    '?????????????????????????????????????????????'
                )}
            </MainWrapper>
            <Footer />
        </>
    )
}

export default WeatherFilter
