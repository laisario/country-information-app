"use client"
import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import { useRouter } from 'next/navigation'
import { TCountryInformation } from '@/types'

interface MapProps {
    country: TCountryInformation | null;
}


function Map({ country }: MapProps) {
    const [geoJson, setGeoJson] = useState(null)
    const router = useRouter()
    const [countryCenter, setCountryCenter] = useState<[number, number] | null>(null); // Default center

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/alpha/${country?.code}`)
            .then(res => res?.json())
            .then(data => setCountryCenter(data[0]?.latlng))
        fetch('/world.json').then(res => res.json()).then(data => {
            setGeoJson(data);
        })
    }, [])

    const onEachFeature = (feature, layer) => {
        const countryCode = feature.properties.ISO_A2
        const selectedBorders = country?.borders?.map(border => border?.code)

        layer.setStyle({
            fillColor: selectedBorders?.includes(countryCode) ? "blue" : country?.code === countryCode ? "red" : "grey",
            fillOpacity: selectedBorders?.includes(countryCode) ? 0.5 : country?.code === countryCode ? 0.5 : 0.2,
            color: 'black',
            weight: 1,
        })

        layer.on('click', () => {
            const targetUrl = `/countries/${countryCode}`;
            router.push(targetUrl);
        });
    }

    return (
        <div style={{ height: '400px', width: '100%' }}>
            {countryCenter && <MapContainer
                key="map"
                zoom={3}
                center={countryCenter}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {geoJson && <GeoJSON
                    data={geoJson}
                    onEachFeature={onEachFeature}
                />}
            </MapContainer>}
        </div>
    )
}

export default React.memo(Map)