"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState, useCallback } from "react";

const containerStyle = {
	width: "100%",
	height: "400px",
};

const defaultCenter: google.maps.LatLngLiteral = {
	lat: 28.6139,
	lng: 77.209,
};

export default function LocationPicker({ onLocationSelect }: { onLocationSelect: (coords: [number, number]) => void }) {
	const [position, setPosition] = useState<google.maps.LatLngLiteral | null>(null);
	const [address, setAddress] = useState<string>("");

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, // 🔐 store in `.env.local`
	});

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					const coords = {
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					};
					setPosition(coords);
					handlePositionChange(coords);
				},
				() => {
					setPosition(defaultCenter);
					handlePositionChange(defaultCenter);
				}
			);
		}
	}, []);

	const handlePositionChange = useCallback(
		async (coords: google.maps.LatLngLiteral) => {
			onLocationSelect([coords.lat, coords.lng]);
			try {
				const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`);
				const data = await response.json();
				const locationName = data.results?.[0]?.formatted_address || "Unknown location";
				console.log("Location name:", data);
				setAddress(locationName);
			} catch (error) {
				console.error("Reverse geocoding failed", error);
				setAddress("Unable to fetch location name.");
			}
		},
		[onLocationSelect]
	);

	if (!isLoaded || !position) return <p>Loading map...</p>;

	return (
		<div className="flex flex-col items-start gap-3 my-4">
			<label className="text-gray-600">Click on the map to select your location:</label>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={position}
				zoom={13}
				onClick={(e) => {
					const coords = {
						lat: e.latLng?.lat() || position.lat,
						lng: e.latLng?.lng() || position.lng,
					};
					setPosition(coords);
					handlePositionChange(coords);
				}}
			>
				<Marker
					position={position}
					draggable
					onDragEnd={(e) => {
						const coords = {
							lat: e.latLng?.lat() || position.lat,
							lng: e.latLng?.lng() || position.lng,
						};
						setPosition(coords);
						handlePositionChange(coords);
					}}
				/>
			</GoogleMap>

			{address && <p className="mt-2 italic text-gray-600">📍 Selected Location: {address}</p>}
		</div>
	);
}
