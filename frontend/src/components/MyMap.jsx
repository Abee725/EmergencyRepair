import 'leaflet/dist/leaflet.css'
import leaflet from 'leaflet'
import { useRef, useEffect } from 'react'

const MyMap = ({ latitude, longitude }) => {
  const mapRef = useRef()

  useEffect(() => {
    if (latitude && longitude) {
      mapRef.current = leaflet.map('map').setView([latitude, longitude], 13)

      leaflet
        .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapRef.current)

      leaflet
        .marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup('Worker current Location')
        .openPopup()
    }
  }, [latitude, longitude])

  return <div id='map' style={{ height: '400px', width: '100%' }}></div>
}

export default MyMap
