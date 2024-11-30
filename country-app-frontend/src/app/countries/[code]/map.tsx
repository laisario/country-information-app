"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import * as topojson from "topojson-client"
import { useRouter } from 'next/navigation'

function getFeatureCentroid(geometry) {
    if (geometry.type === "Polygon") {
        return calculateCentroid(geometry.coordinates[0]);
    } else if (geometry.type === "MultiPolygon") {
        const allCoordinates = geometry.coordinates.flatMap(polygon => polygon[0]);
        return calculateCentroid(allCoordinates);
    }
    return [0, 0]; // Default fallback
}

function calculateCentroid(coordinates) {
    let totalX = 0, totalY = 0, totalArea = 0;

    for (let i = 0; i < coordinates.length - 1; i++) {
        const [x1, y1] = coordinates[i];
        const [x2, y2] = coordinates[i + 1];

        const a = x1 * y2 - x2 * y1;
        totalX += (x1 + x2) * a;
        totalY += (y1 + y2) * a;
        totalArea += a;
    }

    totalArea *= 0.5;
    const centroidX = totalX / (6 * totalArea);
    const centroidY = totalY / (6 * totalArea);

    return [centroidX, centroidY];
}


function Map({ country }) {
    const [geoJson, setGeoJson] = useState(null)
    const router = useRouter()
    const [countryCenter, setCountryCenter] = useState<[number, number]|null>(null); // Default center

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
            fillColor: selectedBorders.includes(countryCode) ? "blue" : country?.code === countryCode ? "red" : "grey",
            fillOpacity: selectedBorders.includes(countryCode) ? 0.5 : country?.code === countryCode ? 0.5 : 0.2,
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