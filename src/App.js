import { MapContainer, TileLayer } from 'react-leaflet';
import { ToastContainer } from 'react-toastify';
import Main from './components/Main';
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const { customMapStyle, mapStyle } = JSON.parse(localStorage.getItem("settings") || "{}");

    return <>
        <MapContainer
            center={localStorage.bounds?.split(",") || [52.22983095298667, 21.0117354814593]}
            zoom={localStorage.zoom || 16}
            minZoom={7}
            maxZoom={18}
            style={{ width: "100%", height: `100vh` }}
        >
            <TileLayer url={MapStyle()} />
            <Main />
            <ToastContainer
                position="top-center"
                autoClose={7500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                theme="dark"
                rtl={false}
                pauseOnFocusLoss={false}
                limit={5}
                draggable
                pauseOnHover={false}
            />
        </MapContainer>
    </>;

    function MapStyle() {
        switch (mapStyle) {
            case "mapboxbasic":
                return "https://api.mapbox.com/styles/v1/domeq/ckzsbx3mn001s14pape9nn2qq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA";
            case "mapboxmonochrame":
                return "https://api.mapbox.com/styles/v1/domeq/ckzsc7iaf000115jq0rtti3k8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA";
            case "mapboxstreets":
                return "https://api.mapbox.com/styles/v1/domeq/ckzsc7ufs000e15mrqldtaa15/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA";
            case "mapboxsatellite":
                return "https://api.mapbox.com/styles/v1/domeq/ckzsc8506000215jqervcjkbk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA";
            case "mapboxnavigation":
                return "https://api.mapbox.com/styles/v1/domeq/ckzsc8ra900qs14l84la2zfpk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZG9tZXEiLCJhIjoiY2t6c2JlOWZ3MGx3cjJubW9zNDc5eGpwdiJ9.nUlvFKfUzpxBxJVc4zmAMA";
            case "custom":
                return customMapStyle;
            default:
                return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        };
    };
};

export default App;