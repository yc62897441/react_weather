import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { config } from '../utils/dataConfig'
import { formatDate, formatDateTime } from '../helpers/moment'

const MountainWrapper = styled.div`
    width: 100vw;
    padding: 10px;
    background-color: #fbfbfb;
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
    let mountainId = useParams().id
    const [currentMountain, setCurrentMountain] = useState()
    const [currentMountainThreeHours, setCurrentMountainThreeHours] = useState()

    function formatCurrentMountain(initCurrentMountain) {
        if (initCurrentMountain) {
            // 暫存資料陣列
            const tempCurrentMountain = {
                locationName: initCurrentMountain.locationName,
                weatherElement: [],
            }

            // 將資料整理後，存進暫存資料陣列
            initCurrentMountain.weatherElement.forEach((weatherElement) => {
                const tempWeatherElement = { description: weatherElement.description, time: [] }
                weatherElement.time.forEach((eachDay) => {
                    tempWeatherElement.time.push({
                        value: config.mountain[weatherElement.elementName].format(eachDay.elementValue),
                        startTime: eachDay.startTime.slice(0, 10),
                    })
                })
                tempCurrentMountain.weatherElement.push(tempWeatherElement)
            })
            // 回傳暫存資料陣列
            return tempCurrentMountain
        }
    }

    function formatCurrentMountainThreeHours(initCurrentMountainThreeHours) {
        if (initCurrentMountainThreeHours) {
            // 暫存資料陣列
            const tempCurrentMountainThreeHours = {
                locationName: initCurrentMountainThreeHours.locationName,
                weatherElement: [],
            }

            // 將資料整理後，存進暫存資料陣列
            initCurrentMountainThreeHours.weatherElement.forEach((weatherElement) => {
                const tempWeatherElement = { description: weatherElement.description, time: [] }

                weatherElement.time.forEach((eachDay) => {
                    tempWeatherElement.time.push({
                        value: config.mountainThreeHours[weatherElement.elementName].format(eachDay.elementValue),
                        dataTime: eachDay.dataTime && eachDay.dataTime,
                    })
                })
                tempCurrentMountainThreeHours.weatherElement.push(tempWeatherElement)
            })

            // 回傳暫存資料陣列
            return tempCurrentMountainThreeHours
        }
    }

    useEffect(() => {
        if (locationsWeatherData) {
            const tempCurrentMountain = formatCurrentMountain(locationsWeatherData.find((location) => location.parameterSet.parameter.parameterValue === mountainId))
            const tempCurrentMountainThreeHours = formatCurrentMountainThreeHours(locationsWeatherDataThreeHours.find((location) => location.parameterSet.parameter.parameterValue === mountainId))
            setCurrentMountain(tempCurrentMountain)
            setCurrentMountainThreeHours(tempCurrentMountainThreeHours)
        }
    }, [locationsWeatherData, locationsWeatherDataThreeHours, mountainId])
    return (
        <>
            <Header locationsWeatherData={locationsWeatherData} />
            <MountainWrapper>
                {/* 一開始初始化時，抓不到 locationsWeatherData，run 第二輪後才會有 */}
                {currentMountain && currentMountain.locationName + ' 一周天氣預報'}
                {currentMountain && (
                    <MainTable>
                        <TableHeader>
                            <TableRow>
                                <TableCellEachDayMtTitle>天氣類型</TableCellEachDayMtTitle>
                                {/* 迴圈產生一周 7 天，每日日期之表頭欄位(7欄) */}
                                {currentMountain.weatherElement[0].time.map((time) => (
                                    <TableCellEachDay key={time.startTime}>
                                        <div>{formatDate(time.startTime)}</div>
                                    </TableCellEachDay>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* 迴圈產生所有天氣類型，每一個類型為一個 TableRow */}
                            {currentMountain.weatherElement.map((weatherElement) => (
                                <TableRow key={weatherElement.description}>
                                    <TableCellEachDayMtTitle>{weatherElement.description}</TableCellEachDayMtTitle>
                                    {/* 迴圈產生一周 7 天，每日天氣預報資訊 */}
                                    {Array.from({ length: 7 }, (value, index) => (
                                        <TableCellEachDay key={index}>
                                            <div>
                                                <div>{weatherElement.time[index].value}</div>
                                            </div>
                                        </TableCellEachDay>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </MainTable>
                )}
                <br></br>
                {currentMountainThreeHours && currentMountainThreeHours.locationName + ' 3小時天氣預報'}
                {currentMountainThreeHours && (
                    <MainTable>
                        <TableHeader>
                            <TableRow>
                                <TableCellEachDayMtTitle>天氣類型</TableCellEachDayMtTitle>
                                {/* 迴圈產生 3 天內每 3 小時的區間，每日日期之表頭欄位(24欄) */}
                                {currentMountainThreeHours.weatherElement[0].time.map((time) => (
                                    <TableCellEachDay key={time.dataTime}>
                                        <div>{formatDateTime(time.dataTime)}</div>
                                    </TableCellEachDay>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* 迴圈產生所有天氣類型，每一個類型為一個 TableRow */}
                            {currentMountainThreeHours.weatherElement.map((weatherElement) => (
                                <TableRow key={weatherElement.description}>
                                    <TableCellEachDayMtTitle>{weatherElement.description}</TableCellEachDayMtTitle>
                                    {/* 迴圈產生 3 天之每 3 小時預報資訊 */}
                                    {/* 「6小時降雨機率」、「12小時降雨機率」這兩種資料為每 6、12 小時一筆，用不同的 Colspan 處理 */}
                                    {weatherElement.time.length > 12
                                        ? Array.from({ length: weatherElement.time.length }, (value, index) => (
                                              <TableCellEachDay key={index}>
                                                  <div>
                                                      <div>{weatherElement.time[index].value}</div>
                                                  </div>
                                              </TableCellEachDay>
                                          ))
                                        : weatherElement.time.length > 6
                                        ? Array.from({ length: weatherElement.time.length }, (value, index) => (
                                              <TableCellEachDayColspan2 key={index}>
                                                  <div>
                                                      <div>{weatherElement.time[index].value}</div>
                                                  </div>
                                              </TableCellEachDayColspan2>
                                          ))
                                        : Array.from({ length: weatherElement.time.length }, (value, index) => (
                                              <TableCellEachDayColspan4 key={index}>
                                                  <div>
                                                      <div>{weatherElement.time[index].value}</div>
                                                  </div>
                                              </TableCellEachDayColspan4>
                                          ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </MainTable>
                )}
            </MountainWrapper>
            <Footer />
        </>
    )
}

export default Mountain
