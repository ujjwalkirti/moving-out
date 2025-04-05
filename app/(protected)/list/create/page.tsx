import CreateListingForm from "@/app/_components/CreateListing/CreateListingForm";
import { Typography } from "@mui/material";

async function CreateListingPage() {
	const categories = ["Furniture", "Electronics", "Clothing", "Books", "Other"];
	const types = ["For Sale", "Giveaway", "Exchange"];
	const defaultTags = ["urgent", "negotiable", "brand new", "used", "pickup only"];
	return (
		<div className="w-full flex flex-col items-center">
			<Typography variant="h4" gutterBottom>
				Create a New Listing
			</Typography>
			<Typography variant="subtitle1" color="textSecondary" gutterBottom px={2}>
				Fill in the details below to list your item for sale, giveaway, or exchange.
			</Typography>
			<CreateListingForm categories={categories} types={types} defaultTags={defaultTags} />
		</div>
	);
}

export default CreateListingPage;
