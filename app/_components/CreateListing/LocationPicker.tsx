"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

const DraggableMarker = ({ position, onPositionChange }: { position: [number, number]; onPositionChange: (pos: [number, number]) => void }) => {
	const [markerPosition, setMarkerPosition] = useState<[number, number]>(position);

	useMapEvents({
		click(e) {
			setMarkerPosition([e.latlng.lat, e.latlng.lng]);
			onPositionChange([e.latlng.lat, e.latlng.lng]);
		},
	});

	return (
		<Marker
			draggable
			eventHandlers={{
				dragend: (e) => {
					const marker = e.target;
					const newPos = marker.getLatLng();
					setMarkerPosition([newPos.lat, newPos.lng]);
					onPositionChange([newPos.lat, newPos.lng]);
				},
			}}
			position={markerPosition}
			icon={L.icon({
				iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
				iconSize: [25, 41],
				iconAnchor: [12, 41],
			})}
		/>
	);
};

export default function LocationPicker({ onLocationSelect }: { onLocationSelect: (coords: [number, number]) => void }) {
	const [position, setPosition] = useState<[number, number] | null>(null);
	const [address, setAddress] = useState<string>("");

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
					setPosition(coords);
					handlePositionChange(coords);
				},
				(err) => {
					// Fallback to Delhi
					const fallback: [number, number] = [28.6139, 77.209];
					setPosition(fallback);
					handlePositionChange(fallback);
				}
			);
		}
	}, []);

	const handlePositionChange = async (coords: [number, number]) => {
		onLocationSelect(coords);
		try {
			const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords[0]}&lon=${coords[1]}`);
			const data = await res.json();
			setAddress(data.display_name);
		} catch (error) {
			console.error("Error fetching address:", error);
			setAddress("Unable to fetch location name.");
		}
	};

	if (!position) return <p>Fetching your location...</p>;

	return (
		<div className="flex flex-col items-start gap-3 my-4">
			<label className="text-gray-600">Click on the map to select your location:</label>
			<MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
				<TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<DraggableMarker position={position} onPositionChange={handlePositionChange} />
			</MapContainer>

			{address && <p style={{ marginTop: "10px", fontStyle: "italic", color: "#555" }}>📍 Selected Location: {address}</p>}
		</div>
	);
}
