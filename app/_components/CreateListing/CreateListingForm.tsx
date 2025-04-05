"use client";

import React, { useRef } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Box, Chip, CircularProgress, Typography, ImageList, ImageListItem, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import dynamic from "next/dynamic";

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

	const isSubmittingRef = useRef(false);

	const nameRef = useRef<HTMLInputElement>(null);
	const dateRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLInputElement>(null);
	const amountRef = useRef<HTMLInputElement>(null);
	const imagesRef = useRef<HTMLInputElement>(null);
	const locationRef = useRef<{ lat: number; lng: number }>(null);
	const categoryRef = useRef<HTMLSelectElement>(null);
	const typeRef = useRef<HTMLSelectElement>(null);

	const tagsRef = useRef<string[]>([]);

	const handleTagsChange = (event: any) => {
		const {
			target: { value },
		} = event;
		tagsRef.current = typeof value === "string" ? value.split(",") : value;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (isSubmittingRef.current) return;

		isSubmittingRef.current = true;

		const files = imagesRef.current?.files;

		const imageFiles = files ? Array.from(files) : [];

		const listing = {
			name: nameRef.current?.value || "",
			date: dateRef.current?.value ? new Date(dateRef.current.value) : new Date(),
			description: descRef.current?.value || "",
			amount: Number(amountRef.current?.value || 0),
			category: categoryRef.current?.value || "",
			type: typeRef.current?.value || "",
			images: imageFiles,
			tags: tagsRef.current,
		};

		console.log("Form submitted:", listing);

		// Submit to API here
	};

	return (
		<Box sx={{ width: "100%", maxWidth: 600, mx: "auto", px: { xs: 1, md: 2 } }}>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth margin="normal">
					<TextField inputRef={nameRef} label="Name" required />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<TextField inputRef={dateRef} type="date" label="Date" InputLabelProps={{ shrink: true }} required />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<TextField inputRef={descRef} label="Description" multiline rows={4} required />
				</FormControl>

				<FormControl fullWidth margin="normal">
					<TextField inputRef={amountRef} label="Amount (₹)" type="number" required />
				</FormControl>

				<LocationPicker
					onLocationSelect={(coords) => {
						locationRef.current = { lat: coords[0], lng: coords[1] };
					}}
				/>

				<FormControl fullWidth margin="normal">
					<InputLabel>Category</InputLabel>
					<Select inputRef={categoryRef} defaultValue="" input={<OutlinedInput label="Category" />} required>
						{categories.map((cat) => (
							<MenuItem key={cat} value={cat}>
								{cat}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<InputLabel>Type</InputLabel>
					<Select inputRef={typeRef} defaultValue="" input={<OutlinedInput label="Type" />} required>
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
							<Typography variant="body2">{file.label}</Typography>
						</ImageListItem>
					))}
				</ImageList>

				<FormControl fullWidth margin="normal">
					<InputLabel>Tags</InputLabel>
					<Select
						multiple
						defaultValue={[]}
						onChange={handleTagsChange}
						input={<OutlinedInput label="Tags" />}
						renderValue={(selected) => (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{(selected as string[]).map((tag) => (
									<Chip key={tag} label={tag} />
								))}
							</Box>
						)}
					>
						{defaultTags.map((tag) => (
							<MenuItem key={tag} value={tag}>
								{tag}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={isSubmittingRef.current}>
					{isSubmittingRef.current ? <CircularProgress size={24} /> : "Submit Listing"}
				</Button>
			</form>
		</Box>
	);
}

export default CreateListingForm;
