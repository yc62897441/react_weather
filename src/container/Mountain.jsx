import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useImmer } from 'use-immer';
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MountainWrapper = styled.div`
  width: 100vw;
  padding: 10px;
  background-color: #FBFBFB;
`

const MainTable = styled.table`
  background-color: #FBFBFB;
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
    background-color: #E9E9E9;
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
  width: 150px;
`

const TableCellEachDayColspan2 = styled(TableCellEachDay)`
  width: 300px;
`

const TableCellEachDayColspan4 = styled(TableCellEachDay)`
  width: 600px;
`

const TableCellEachDayMtTitle = styled(TableCell)`
  width: 90px;
`

function Mountain({ locationsWeatherData, locationsWeatherDataThreeHours }) {
    let MountainId = useParams().id;
    const [currentMountain, updateCurrentMountain] = useImmer()
    const [currentMountainThreeHours, updateCurrentMountainThreeHours] = useImmer()
    let isCurrentMountainFormated = useRef(false)
    let isCurrentMountainThreeHoursFormated = useRef(false)

    console.log('Mountain')
    console.log('currentMountain', currentMountain)
    console.log('currentMountainThreeHours', currentMountainThreeHours)
    console.log('isCurrentMountainFormated', isCurrentMountainFormated)
    console.log('isCurrentMountainThreeHoursFormated', isCurrentMountainThreeHoursFormated)
    console.log('==========')

    useEffect(() => {
        console.log('useEffect useEffect useEffect locationsWeatherData')
        updateCurrentMountain(locationsWeatherData.find(location => location.parameterSet.parameter.parameterValue === MountainId))
    }, [locationsWeatherData])

    useEffect(() => {
        console.log('useEffect useEffect useEffect locationsWeatherDataThreeHours')
        updateCurrentMountainThreeHours(locationsWeatherDataThreeHours.find(location => location.parameterSet.parameter.parameterValue === MountainId))
    }, [locationsWeatherDataThreeHours])

    formatCurrentMountain()

    function formatCurrentMountain() {
        if (currentMountain && !isCurrentMountainFormated.current) {
            console.log('format format format currentMountain')
            isCurrentMountainFormated.current = true
            currentMountain.weatherElement[0].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountain.weatherElement[1].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountain.weatherElement[2].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '%')
            currentMountain.weatherElement[3].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountain.weatherElement[4].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountain.weatherElement[5].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountain.weatherElement[6].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountain.weatherElement[7].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[1].value)
            currentMountain.weatherElement[8].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[1].value)
            currentMountain.weatherElement[9].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '%')
            currentMountain.weatherElement[10].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value)
            currentMountain.weatherElement[11].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[0].value + eachDay.elementValue[0].measures)
            currentMountain.weatherElement[12].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[0].value)
            currentMountain.weatherElement[13].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[0].value)
        }

        if (currentMountainThreeHours && !isCurrentMountainThreeHoursFormated.current) {
            console.log('format format format currentMountainThreeHours')
            isCurrentMountainThreeHoursFormated.current = true
            currentMountainThreeHours.weatherElement[0].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountainThreeHours.weatherElement[1].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountainThreeHours.weatherElement[2].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '%')
            currentMountainThreeHours.weatherElement[3].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '%')
            currentMountainThreeHours.weatherElement[4].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '%')
            currentMountainThreeHours.weatherElement[6].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[0].value + eachDay.elementValue[0].measures)
            currentMountainThreeHours.weatherElement[7].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[1].value)
            currentMountainThreeHours.weatherElement[8].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue.value + '°C')
            currentMountainThreeHours.weatherElement[9].time.forEach(eachDay => eachDay.elementValue.value = eachDay.elementValue[0].value)
        }
    }

    // TODO: run 兩輪，why?
    // console.log('locationsWeatherData', locationsWeatherData)
    // console.log('MountainId', MountainId)

    return (
        <>
            <Header locationsWeatherData={locationsWeatherData} />
            <MountainWrapper>
                {/* 一開始初始化時，抓不到 locationsWeatherData，run 第二輪後才會有 */}
                {currentMountain && currentMountain.locationName + ' 一周天氣預報'}
                {
                    currentMountain && <MainTable>
                        <TableHeader>
                            <TableRow>
                                <TableCellEachDayMtTitle>天氣類型</TableCellEachDayMtTitle>
                                {/* 迴圈產生一周 7 天，每日日期之表頭欄位(7欄) */}
                                {
                                    currentMountain.weatherElement[0].time.map(time =>
                                        <TableCellEachDay key={time.startTime}>
                                            <div>{time.startTime.slice(0, 10)}</div>
                                        </TableCellEachDay>
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* 迴圈產生所有天氣類型，每一個類型為一個 TableRow */}
                            {currentMountain.weatherElement.map(weatherElement =>
                                <TableRow key={weatherElement.description}>
                                    <TableCellEachDayMtTitle>{weatherElement.description}</TableCellEachDayMtTitle>
                                    {/* 迴圈產生一周 7 天，每日天氣預報資訊 */}
                                    {Array.from({ length: 7 }, (value, index) => <TableCellEachDay key={index}>
                                        <div>
                                            <div>{weatherElement.time[index].elementValue.value}</div>
                                        </div>
                                    </TableCellEachDay>)}
                                </TableRow>
                            )}
                        </TableBody>
                    </MainTable>
                }
                <br></br>
                {currentMountainThreeHours && currentMountainThreeHours.locationName + ' 3小時預報預報'}
                {
                    currentMountainThreeHours && <MainTable>
                        <TableHeader>
                            <TableRow>
                                <TableCellEachDayMtTitle>天氣類型</TableCellEachDayMtTitle>
                                {/* 迴圈產生 3 天內每 3 小時的區間，每日日期之表頭欄位(24欄) */}
                                {
                                    currentMountainThreeHours.weatherElement[0].time.map(time =>
                                        <TableCellEachDay key={time.dataTime}>
                                            {time.dataTime.slice(0, 10) + ' ' + time.dataTime.slice(11, 16)}
                                        </TableCellEachDay>
                                    )
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* 迴圈產生所有天氣類型，每一個類型為一個 TableRow */}
                            {currentMountainThreeHours.weatherElement.map(weatherElement =>
                                <TableRow key={weatherElement.description}>
                                    <TableCellEachDayMtTitle>{weatherElement.description}</TableCellEachDayMtTitle>
                                    {/* 迴圈產生 3 天之每 3 小時預報資訊 */}
                                    {/* 「6小時降雨機率」、「12小時降雨機率」這兩種資料為每 6、12 小時一筆，用不同的 Colspan 處理 */}
                                    {
                                        weatherElement.time.length > 12 ?
                                            Array.from({ length: weatherElement.time.length }, (value, index) => <TableCellEachDay key={index}>
                                                <div>
                                                    <div>{weatherElement.time[index].elementValue.value}</div>
                                                </div>
                                            </TableCellEachDay>)
                                            : weatherElement.time.length > 6 ?
                                                Array.from({ length: weatherElement.time.length }, (value, index) => <TableCellEachDayColspan2 key={index}>
                                                    <div>
                                                        <div>{weatherElement.time[index].elementValue.value}</div>
                                                    </div>
                                                </TableCellEachDayColspan2>)

                                                : Array.from({ length: weatherElement.time.length }, (value, index) => <TableCellEachDayColspan4 key={index}>
                                                    <div>
                                                        <div>{weatherElement.time[index].elementValue.value}</div>
                                                    </div>
                                                </TableCellEachDayColspan4>)
                                    }
                                </TableRow>
                            )}
                        </TableBody>
                    </MainTable>
                }
            </MountainWrapper>
            <Footer />
        </>
    )
}

export default Mountain
