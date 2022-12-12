import { useState, useEffect } from 'react'
import { CWBHttpRequest } from './utils/api'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeView from './container/HomeView'
import WeatherFilter from './container/WeatherFilter'
import WeatherMap from './container/WeatherMap'
import Mountain from './container/Mountain'
import SignIn from './container/SignIn'
import SignUp from './container/SignUp'
import ErrorPage from './container/ErrorPage'

import { createGlobalStyle } from 'styled-components'
const GlobalStyle = createGlobalStyle`
  * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  }
`

const dataCategory = {
    oneWeek: 'F-B0053-031', //登山一週24小時天氣預報
    oneWeekDayNight: 'F-B0053-033', //登山一週日夜天氣預報 33
    perThreeHours: 'F-B0053-035', //登山三天3小時天氣預報
}
const dataType = 'JSON'

function App() {
    const [locationsWeatherData, setLocationsWeatherData] = useState([])
    const [locationsWeatherDataThreeHours, setLocationsWeatherDataThreeHours] = useState([])
    const [isApiError, setIsApiError] = useState(false)
    useEffect(() => {
        async function fetchData() {
            try {
                const [responseOneWeek, responsePerThreeHours] = await Promise.all([
                    CWBHttpRequest('get', dataCategory.oneWeek, dataType, '公開資料取得錯誤'),
                    CWBHttpRequest('get', dataCategory.perThreeHours, dataType, '公開資料取得錯誤')
                ])

                if (responseOneWeek.status === 200) {
                    setLocationsWeatherData([...responseOneWeek.data.cwbopendata.dataset.locations.location])
                } else {
                    throw new Error()
                }
                if (responsePerThreeHours.status === 200) {
                    setLocationsWeatherDataThreeHours([...responsePerThreeHours.data.cwbopendata.dataset.locations.location])
                } else {
                    throw new Error()
                }

                setIsApiError(false)
            } catch (error) {
                console.error('error', error)
                setIsApiError(true)
            }
        }
        fetchData()
    }, [isApiError])
    return (
        <div className="App">
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    {!isApiError ? (
                        <>
                            <Route path="/weathermap" element={<WeatherMap locationsWeatherDataThreeHours={locationsWeatherDataThreeHours} />}></Route>
                            <Route path="/weatherfilter" element={<WeatherFilter locationsWeatherData={locationsWeatherData} />}></Route>
                            <Route path="/mountain/:id" element={<Mountain locationsWeatherData={locationsWeatherData} locationsWeatherDataThreeHours={locationsWeatherDataThreeHours} />}></Route>
                            <Route path="*" element={<HomeView locationsWeatherData={locationsWeatherData} />}></Route>
                        </>
                    ) : (
                            <Route path="*" element={<ErrorPage />}></Route>
                        )}
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
