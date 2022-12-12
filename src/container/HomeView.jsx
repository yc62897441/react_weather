/* eslint-disable jsx-a11y/img-redundant-alt */
import Header from '../components/Header'
import Footer from '../components/Footer'
import { formatMoment } from '../helpers/moment'
import { MainWrapper } from '../components/MainWrapper'
import { MainTable, TableHeader, TableBody, TableRow, TableCellEachDay, TableCellEachDayMtTitle } from '../components/FormGroup'
import { Link } from '../components/Link'

function HomeView({ locationsWeatherData }) {
    return (
        <>
            <Header locationsWeatherData={locationsWeatherData} />
            <MainWrapper>
                <MainTable>
                    <TableHeader>
                        <TableRow>
                            <TableCellEachDayMtTitle>山岳</TableCellEachDayMtTitle>
                            {/* 迴圈產生一周 7 天，每日日期之表頭欄位(7欄) */}
                            {locationsWeatherData.length > 0 &&
                                locationsWeatherData[0].weatherElement[0].time.map((time) => (
                                    <TableCellEachDay key={time.startTime} class="table-cell table-cell-each-day">
                                        <div>{formatMoment(time.startTime, 'YYYY-MM-DD')}</div>
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
                        {locationsWeatherData.map((location) => (
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
                                                <img src={'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/' + location.weatherElement[12].time[0].elementValue[1].value + '.svg'} alt="image" title={location.weatherElement[12].time[0].elementValue[0].value} />
                                            </div>
                                        </div>
                                    </TableCellEachDay>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </MainTable>
            </MainWrapper>
            <Footer />
        </>
    )
}

export default HomeView
