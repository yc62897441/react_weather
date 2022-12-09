import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Overlay from 'ol/Overlay'
import { fromLonLat, toLonLat } from 'ol/proj';

const WeatherMapWrapper = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #FBFBFB;
`
const MapWrapper = styled.div`
  position: relative;
  top: 0px;
  display: block;
  width: 100%;
  padding: 5px;
`

const MapComponent = styled.div`
  width: 100%;
  height: 80vh;
`

function WeatherMap({ locationsWeatherData }) {

    useEffect(() => {
        let ignore = false
        let map = ''
        function initMap() {
            console.log('initMap')
            map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                        })
                    })
                ],
                view: new View({
                    center: [13450000, 2720000],
                    zoom: 8,
                })
            })
        }
        if (!ignore) {
            initMap()
        }
        return () => {
            console.log('set ignore true')
            map = ''
            ignore = true
        }
    }, [])
    // useEffect(() => {
    //     console.log('locationsWeatherData', locationsWeatherData)
    // }, [locationsWeatherData])

    return (
        <>
            <Header />
            <WeatherMapWrapper>
                <MapWrapper>
                    <MapComponent id="map"></MapComponent>
                </MapWrapper>
            </WeatherMapWrapper>
            <Footer />
        </>
    )
}

export default WeatherMap
