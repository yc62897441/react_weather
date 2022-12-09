import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link as ReactRouterLink } from 'react-router-dom'

const HomeViewWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 90px);
  overflow: scroll;
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
  width: 255px;
  >div:nth-child(1) {
      font-size: 1.2rem;
      padding: 3px 0px;
  };
  >div:nth-child(2) {
      display: flex;
      flex-direction: row;
      align-items: center;
  };
  div div {
    padding: 5px 0px;
  };
  div div:not(:nth-child(4)) {
    border-right: 1px solid rgb(18, 52, 86, 0.4);
    flex: 1;
  };
  div div:nth-child(1) {
    color: #B22222;;
  };
  div div:nth-child(2) {
    color: #00008B;
  };
  div div:nth-child(4) img {
    width: 30px;
    height: 30px;
  }
`

const TableCellEachDayMtTitle = styled(TableCell)`
  width: 90px;
`

const Link = styled(ReactRouterLink)`
  margin-right: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: #0D6EFD;
  :hover {
    color: #1133DD;
  }
  @media (min-width: 576px) {
    margin-right: 1.2rem;
  }
`

function HomeView({ locationsWeatherData }) {
  return (
    <>
      <Header locationsWeatherData={locationsWeatherData} />
      <HomeViewWrapper>
        <MainTable>
          <TableHeader>
            <TableRow>
              <TableCellEachDayMtTitle>山岳</TableCellEachDayMtTitle>
              {/* 迴圈產生一周 7 天，每日日期之表頭欄位(7欄) */}
              {
                locationsWeatherData.length > 0 && locationsWeatherData[0].weatherElement[0].time.map(time =>
                  <TableCellEachDay key={time.startTime} class="table-cell table-cell-each-day">
                    <div>{time.startTime.slice(0, 10)}</div>
                    <div>
                      <div>最高溫</div>
                      <div>最低溫</div>
                      <div>降雨機率</div>
                      <div>天氣現象</div>
                    </div>
                  </TableCellEachDay>
                )
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* 迴圈產生所有山岳地點，每個地點為一個 TableRow */}
            {locationsWeatherData.map(location =>
              <TableRow key={location.parameterSet.parameter.parameterValue}>
                <TableCellEachDayMtTitle>
                  <ReactRouterLink to={'/mountain/' + location.parameterSet.parameter.parameterValue}>
                    {location.locationName}
                  </ReactRouterLink>
                </TableCellEachDayMtTitle>
                {/* 迴圈產生一周 7 天，每日天氣預報資訊 */}
                {Array.from({ length: 7 }, (value, index) => <TableCellEachDay>
                  <div></div>
                  <div>
                    <div>{location.weatherElement[3].time[index].elementValue.value}°C</div>
                    <div>{location.weatherElement[4].time[index].elementValue.value}°C</div>
                    <div>{location.weatherElement[9].time[index].elementValue.value || 'NA'}%</div>
                    <div>
                      <img
                        src={'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/' + location.weatherElement[12].time[0].elementValue[1].value + '.svg'}
                        alt="image" />
                    </div>
                  </div>
                </TableCellEachDay>)}
              </TableRow>
            )}
          </TableBody>
        </MainTable>
      </HomeViewWrapper>
      <Footer />
    </>
  )
}

export default HomeView
