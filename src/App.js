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

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/weathermap" element={<WeatherMap />}></Route>
          <Route path="/weatherfilter" element={<WeatherFilter />}></Route>
          <Route path="/mountain/:id" element={<Mountain />}></Route>
          <Route path="*" element={<HomeView />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
