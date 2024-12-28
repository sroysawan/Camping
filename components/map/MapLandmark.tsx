'use client'
import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { LatLng, latLng } from 'leaflet'
import { useEffect, useState } from 'react';
import SearchMap from './SearchMap';
import { Latlng } from '@/utils/types';

const iconUrl =
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const markerIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: [20, 30],
});

// type Latlng = [number, number]
type LocationMarkerProps = {
    position: Latlng | null
    setPosition: (position: Latlng) => void
}
function LocationMarker({ position, setPosition }: LocationMarkerProps) {
    const map = useMapEvents({
        click(e) {
            const newLocation: Latlng = [e.latlng.lat, e.latlng.lng]
            setPosition(newLocation)
            map.flyTo(e.latlng)
        },
    })
    return position === null ? null : (
        <Marker position={position} icon={markerIcon}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

function ResetCenterView({ position, setPosition }: LocationMarkerProps) {
    const map = useMap()
    useEffect(() => {
        if (position) {
            map.setView(
                L.latLng(position[0], position[1]),
                map.getZoom(), {
                animate: true,
                duration: 1
            }
            )
        }
    }, [position])

    return null
}


const MapLandmark = ({ location }: {
    location?: { lat: number, lng: number }
}) => {
    const defaultLocation: Latlng = [13.7563, 100.5018]
    const [position, setPosition] = useState<Latlng | null>(null)

    const mapCenter = position || location || defaultLocation;
    return (
        <>
            <h1 className='mt-4 mb-2 font-semibold'>Where are you?</h1>
            <input name="lat" value={position ? position[0] : defaultLocation[0]} type='hidden' />
            <input name="lng" value={position ? position[1] : defaultLocation[1]} type='hidden' />
            <SearchMap position={position} setPosition={setPosition} />
            <MapContainer
                className='h-[50vh] rounded-lg z-0 relative mb-2'
                center={mapCenter}
                zoom={7}
                scrollWheelZoom={true}
            >

                <Marker position={mapCenter} icon={markerIcon}>
                    <Popup>
                        กรุงเทพมหานคร (Bangkok) <br /> เมืองหลวงของประเทศไทย
                    </Popup>
                </Marker>

                <ResetCenterView position={position} setPosition={setPosition} />
                <LocationMarker position={position} setPosition={setPosition} />
                <LayersControl>
                    <LayersControl.BaseLayer name="Openstreetmap" checked>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="ESRI Imagery">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>
            </MapContainer>
        </>
    )
}

export default MapLandmark
