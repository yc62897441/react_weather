import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeView from './container/HomeView'
import WeatherFilter from './container/WeatherFilter'
import WeatherMap from './container/WeatherMap'
import Mountain from './container/Mountain'
import SignIn from './container/SignIn'
import SignUp from './container/SignUp'

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
  perThreeHours: 'F-B0053-035' //登山三天3小時天氣預報
}
const dataType = 'JSON'
const CWBAuthorization = ""

function App() {
  const [locationsWeatherData, setLocationsWeatherData] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/${dataCategory.oneWeek}?Authorization=${CWBAuthorization}&format=${dataType}`)
        if (response.status === 200) {
          setLocationsWeatherData([...response.data.cwbopendata.dataset.locations.location])
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/weathermap" element={<WeatherMap />}></Route>
          <Route path="/weatherfilter" element={<WeatherFilter />}></Route>
          <Route path="/mountain/:id" element={<Mountain locationsWeatherData={locationsWeatherData} />}></Route>
          <Route path="*" element={<HomeView locationsWeatherData={locationsWeatherData} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
