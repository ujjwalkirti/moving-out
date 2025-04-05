import { getAllListingsByUserId } from "@/app/_functions/db";
import { currentUser } from "@clerk/nextjs/server";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

async function ListingFormPage() {
	const user = await currentUser();

	const listings = await getAllListingsByUserId(user!.id);
	return (
		<Container>
			<Typography variant="h4" fontWeight={"bold"}>
				Your Listings:
			</Typography>
			{listings.length > 0 && (
				<Box sx={{ marginY: 2, border: "1px solid #ccc", padding: 2 }}>
					{listings.map((listing) => (
						<Box key={listing._id}>
							<Typography variant="h6">{listing.name}</Typography>
							<Typography variant="body1">{listing.description}</Typography>
						</Box>
					))}
				</Box>
			)}
			{listings.length === 0 && (
				<Box sx={{ marginY: 2, border: "1px dashed #ccc", padding: 2, textAlign: "center" }}>
					<Typography variant="h6" fontWeight={"bold"} sx={{ textAlign: "center" }}>
						You have no listings yet.
					</Typography>
					<Typography variant="body1" sx={{ textAlign: "center", marginTop: 2 }}> Want to sell something?</Typography>
					<Button href="/list/create" variant="contained" sx={{ marginX: "auto", marginTop: 2 }}>
						Click here
					</Button>
				</Box>
			)}
		</Container>
	);
}

export default ListingFormPage;
