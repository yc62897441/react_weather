/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from '../components/Link'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import Overlay from 'ol/Overlay'
import { fromLonLat } from 'ol/proj'

const WeatherMapWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 90px);
    padding: 10px;
    background-color: #fbfbfb;
`
const MapWrapper = styled.div`
    position: relative;
    top: 0px;
    display: block;
    width: 100%;
    height: 100%;
    padding: 5px;
    border: 2px solid black;
`

const MapComponent = styled.div`
    width: 100%;
    height: 100%;
`

const LocatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4px 4px 1px;
    border: 1px solid rgb(85, 85, 85, 0.5);
    border-radius: 5px;
    text-decoration: none;
    color: rgb(0, 0, 0);
    font-size: 0.7rem;
    background-color: rgb(255, 255, 255, 0.75);
    cursor: pointer;
    @media (min-width: 375px) {
        .mark_mountain_info_wrapper {
            padding: 4px 4px 2px;
            font-size: 0.8rem;
        }
    }
    @media (min-width: 576px) {
        .mark_mountain_info_wrapper {
            padding: 5px 5px 2px;
            font-size: 1rem;
        }
    }
`

const LocatName = styled.div`
    margin-bottom: 2px;
    font-weight: 700;
`

const LocatInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    div:nth-child(1) {
        margin-right: 4px;
        color: firebrick;
        font-weight: 400;
    }
    div:nth-child(2) {
        color: darkblue;
        font-weight: 400;
    }
`

const LocatWxImgWrapper = styled.div`
    img {
        width: 25px;
        height: 25px;
        object-fit: contain;
    }
    @media (min-width: 576px) {
        img {
            width: 32px;
            height: 32px;
        }
    }
    @media (min-width: 768px) {
        img {
            width: 35px;
            height: 35px;
        }
    }
`

function WeatherMap({ locationsWeatherDataThreeHours }) {
    const isMapInit = useRef(false)

    // ???????????????
    useEffect(() => {
        function initMap() {
            const map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        }),
                    }),
                ],
                view: new View({
                    center: [13450000, 2720000],
                    zoom: 8,
                }),
            })
            return map
        }

        function adjust() {
            // ????????????????????????(?????????????????????????????????????????????(????????????)????????????)
            locationsWeatherDataThreeHours[46].lat = '24.066'
            locationsWeatherDataThreeHours[46].lon = '121.280036765'
        }

        function markMountains(map, locat) {
            // ???????????????
            const pos = fromLonLat([Number(locat.lon), Number(locat.lat)])

            // ?????????????????????????????????????????? UI ??????
            const router_link_id = 'MtId' + locat.parameterSet.parameter.parameterValue
            const mt_label = new Overlay({
                position: pos,
                element: document.getElementById(router_link_id),
            })

            // ????????? UI ????????????????????????
            map.addOverlay(mt_label)
        }

        if (!isMapInit.current && locationsWeatherDataThreeHours.length > 0) {
            // ???????????????
            isMapInit.current = true
            const map = initMap()

            // ????????????????????????(??????????????????????????????(????????????)??????)
            adjust()

            // ?????????????????? UI ???????????????????????????????????????
            locationsWeatherDataThreeHours.forEach((locat) => {
                markMountains(map, locat)
            })
        }
    }, [locationsWeatherDataThreeHours])

    return (
        <>
            <Header />
            <WeatherMapWrapper>
                <MapWrapper>
                    {/* ???????????????????????? */}
                    <MapComponent id="map"></MapComponent>

                    {/* ???????????????????????????????????? UI ?????? */}
                    {locationsWeatherDataThreeHours.map((locat) => (
                        <Link to={'/mountain/' + locat.parameterSet.parameter.parameterValue}>
                            <LocatWrapper id={'MtId' + locat.parameterSet.parameter.parameterValue}>
                                <LocatName>{locat.locationName}</LocatName>
                                <LocatInfoWrapper>
                                    <div>{locat.weatherElement[0].time[0].elementValue.value}??C</div>
                                    <div>{locat.weatherElement[3].time[0].elementValue.value}%</div>
                                </LocatInfoWrapper>
                                <LocatWxImgWrapper>
                                    <img src={'https://www.cwb.gov.tw/V8/assets/img/weather_icons/weathers/svg_icon/day/' + locat.weatherElement[9].time[0].elementValue[1].value + '.svg'} alt="image" title={locat.weatherElement[9].time[0].elementValue[0].value} />
                                </LocatWxImgWrapper>
                            </LocatWrapper>
                        </Link>
                    ))}
                </MapWrapper>
            </WeatherMapWrapper>
            <Footer />
        </>
    )
}

export default WeatherMap
