import { useEffect, useState } from "react";
import useWebSocket from 'react-use-websocket';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { useMap, useMapEvents } from "react-leaflet";
import { Routes, Route } from "react-router-dom";

import VehicleMarker from "./routes/VehicleMarker";
import ActiveStop from "./routes/ActiveStop";
import ActiveVehicle from "./routes/ActiveVehicle";
import Filter from "./routes/Filter";

export default () => {
    const map = useMap();
    const [vehicles, setVehicles] = useState([]);
    const [bounds, setBounds] = useState(map.getBounds());

    const group = JSON.parse(localStorage?.grouping || "false");

    useWebSocket("wss://ws.domeqalt.repl.co/", {
        onOpen: () => console.log('opened'),
        onClose: () => console.log('closed'),
        onMessage: ({ data }) => setVehicles(JSON.parse(data)),
        shouldReconnect: () => true,
        reconnectInterval: 10000,
        reconnectAttempts: 15,
        retryOnError: true
    });

    useEffect(() => {
        fetch("/api/warsaw/positions").then(res => res.json()).then(setVehicles).catch(() => null);
    }, []);

    let filteredVehicles = vehicles;
    let inBounds = filteredVehicles.filter(vehicle => bounds?.contains(vehicle?.location));

    return <>
        <Events />
        <Routes>
            <Route path="/" element={group
                ? <MarkerClusterGroup animateAddingMarkers>{filteredVehicles.map(vehicle => <VehicleMarker vehicle={vehicle} key={vehicle.trip || vehicle.tab} />)}</MarkerClusterGroup>
                : (inBounds.length <= 150 ? inBounds.map(vehicle => <VehicleMarker vehicle={vehicle} key={vehicle.trip || vehicle.tab} />) : null)} />
            <Route path="/stop/:id" element={<ActiveStop city={"warsaw"} vehicles={vehicles} />} />
            <Route path="/:type/:tab" element={<ActiveVehicle city={"warsaw"} vehicles={vehicles} />} />
            <Route path="/filter" element={<Filter city={"warsaw"} vehicles={vehicles} />} />
        </Routes>
    </>;

    function Events() {
        useMapEvents({
            moveend: () => {
                setBounds(map.getBounds());
                localStorage.setItem("warsaw.pos", [map.getCenter().lat, map.getCenter().lng]);
                localStorage.setItem("warsaw.zoom", map.getZoom());
            }
        });
        return null;
    }
};