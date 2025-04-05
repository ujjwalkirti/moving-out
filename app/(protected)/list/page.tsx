import { getAllListingsByUserId } from "@/app/_functions/db";
import { currentUser } from "@clerk/nextjs/server";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";

async function ListingFormPage() {
	const user = await currentUser();

	const listings = await getAllListingsByUserId(user!.id);
	return (
		<Container>
			<Typography variant="h4">Your Listings:</Typography>
			<Box sx={{ marginY: 2 }}>
				{listings.map((listing) => (
					<Box key={listing._id}>
						<Typography variant="h6">{listing.name}</Typography>
						<Typography variant="body1">{listing.description}</Typography>
					</Box>
				))}
			</Box>
			{listings.length === 0 && <Typography variant="body1" sx={{ marginY: 2 }}>You have no listings yet.</Typography>}
			<Button variant="contained">Want to sell something?</Button>
		</Container>
	);
}

export default ListingFormPage;
