import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Set default marker icon
const DefaultMarkerIcon = L.icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const LeafletMap = ({ latitude, longitude, profileName }) => {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapMarker
          latitude={latitude}
          longitude={longitude}
          profileName={profileName}
        />
      </MapContainer>
    </div>
  );
};

const MapMarker = ({ latitude, longitude, profileName }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude, map]);

  return (
    <Marker position={[latitude, longitude]} icon={DefaultMarkerIcon}>
      <Popup>{profileName}</Popup>
    </Marker>
  );
};

export default LeafletMap;
