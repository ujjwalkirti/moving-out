"use client";

import React, { useRef } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Box, CircularProgress, Typography, ImageList, ImageListItem, IconButton, FormLabel } from "@mui/material";
import { Close } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { indianStatesAndUTs } from "@/app/_constants/CreateListing";

interface CreateListingFormProps {
	categories: string[];
	types: string[];
	defaultTags: string[];
}

const LocationPicker = dynamic(() => import("./LocationPicker"), {
	ssr: false,
});

function CreateListingForm({ categories, types, defaultTags }: CreateListingFormProps) {
	const [selectedFiles, setSelectedFiles] = React.useState<{ label: string; url: string }[]>([]);
	const [formState, setFormState] = React.useState<"submitting" | "idle">("idle");

	const locationRef = React.useRef<{ lat: number; lng: number }>(null);
	const imagesRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (formState === "submitting") return;

		setFormState("submitting");

		const files  = imagesRef.current?.files;
		const imageFiles = files ? Array.from(files) : [];

		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
		}

		setFormState("idle");
		// Submit to API here
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 600, mx: "auto", px: { xs: 1, md: 2 } }}>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth margin="normal">
					<FormLabel>Name:</FormLabel>
					<TextField name="name" placeholder="Ex: Iphone 14" aria-placeholder="Item name" type="text" required variant="outlined" />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<FormLabel>Date by which you want it to be sold?</FormLabel>
					<TextField helperText="Select a deadline within the next 3–5 days" name="date" type="date" variant="outlined" defaultValue={new Date().toISOString().split("T")[0]} required />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<FormLabel>Please describe your item:</FormLabel>
					<TextField name="description" placeholder="Ex: I want to sell my Iphone 14, and additional accessories etc etc." aria-placeholder="Description" multiline rows={4} required />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<FormLabel>Give a reasonable price:</FormLabel>
					<TextField name="amount" placeholder="Amount (₹)" aria-placeholder="Amount" variant="outlined" type="text" required />
				</FormControl>

				<LocationPicker
					onLocationSelect={(coords) => {
						locationRef.current = { lat: coords[0], lng: coords[1] };
					}}
				/>

				{/* address line 1 */}
				<FormControl fullWidth margin="normal">
					<FormLabel>Flat No. / House No. / Building Name</FormLabel>
					<TextField name="address_line_1" variant="outlined" placeholder="Ex: 123, ABC Street, XYZ Building" required />
				</FormControl>
				{/* address line 2 */}
				<FormControl fullWidth margin="normal">
					<FormLabel>Area / Street / Locality</FormLabel>
					<TextField name="address_line_2" variant="outlined" placeholder="Ex: XYZ Area, XYZ Street, XYZ Locality" required />
				</FormControl>
				{/* address line 3 */}
				<FormControl fullWidth margin="normal">
					<FormLabel>Nearby landmark</FormLabel>
					<TextField name="address_line_3" variant="outlined" placeholder="Optional" aria-placeholder="Nearby landmark, Optional" />
				</FormControl>
				{/* State selection */}
				<FormControl fullWidth margin="normal">
					<FormLabel>State</FormLabel>
					<Select name="state" defaultValue="" required displayEmpty variant="outlined">
						<MenuItem value="" disabled>
							Select your state
						</MenuItem>
						{indianStatesAndUTs.map((state) => (
							<MenuItem key={state} value={state}>
								{state}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				{/* PIN code */}
				<FormControl fullWidth margin="normal">
					<FormLabel>PIN Code</FormLabel>
					<TextField name="pincode" variant="outlined" type="number" slotProps={{ htmlInput: { min: 100000, max: 999999 } }} placeholder="Ex: 400001" required />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<InputLabel>Category</InputLabel>
					<Select name="categories" defaultValue="" input={<OutlinedInput label="Category" />} required>
						{categories.map((cat) => (
							<MenuItem key={cat} value={cat}>
								{cat}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<InputLabel>Type</InputLabel>
					<Select name="types" defaultValue="" input={<OutlinedInput label="Type" />} required>
						{types.map((t) => (
							<MenuItem key={t} value={t}>
								{t}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<label htmlFor="images" className="text-gray-600">
						Upload Images
					</label>
					<input
						type="file"
						id="images"
						name="images"
						multiple
						accept="image/*"
						ref={imagesRef}
						onChange={(e) => {
							const files = e.target.files;
							if (files) {
								const fileArray = Array.from(files);
								const previewUrls = fileArray.map((file) => ({ label: file.name, url: URL.createObjectURL(file) }));

								setSelectedFiles(previewUrls);
							}
						}}
						style={{
							marginTop: "8px",
							border: "1px solid #ccc",
							padding: "10px",
							borderRadius: "4px",
						}}
					/>
				</FormControl>

				{/* display file names */}
				<ImageList cols={selectedFiles.length} gap={6}>
					{selectedFiles.map((file, index) => (
						<ImageListItem key={index} sx={{ border: "1px solid #ccc", borderRadius: "4px", padding: "4px" }}>
							<img src={file.url} alt={`preview-${index}`} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
							<IconButton
								onClick={() => {
									// change the images ref as well and remove the file from the array
									const fileList = imagesRef.current?.files;
									if (fileList) {
										const updatedFiles = Array.from(fileList).filter((_, i) => i !== index);
										const dataTransfer = new DataTransfer();
										updatedFiles.forEach((file) => dataTransfer.items.add(file));
										if (imagesRef.current) {
											imagesRef.current.files = dataTransfer.files;
										}
									}

									setSelectedFiles((prevValues) => prevValues.filter((f, i) => i !== index));
								}}
								sx={{ position: "absolute", top: 1, right: 1, zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" }, borderRadius: "50%" }}
							>
								<Close />
							</IconButton>
							<Typography variant="body2" p={2}>
								{file.label}
							</Typography>
						</ImageListItem>
					))}
				</ImageList>

				<FormControl fullWidth margin="normal">
					<FormLabel>Tags</FormLabel>
					<TextField name="tags" variant="outlined" placeholder="Enter tags separated by commas" />
				</FormControl>

				<Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: "bold" }} disabled={formState === "submitting"}>
					{formState === "submitting" ? <CircularProgress size={24} /> : "Submit Listing"}
				</Button>
			</form>
		</Box>
	);
}

export default CreateListingForm;
