import { Box, Typography, Container, Button } from "@mui/material";
export default function Home() {
	return (
		<section className="w-full px-2 lg:w-4/5 mx-auto">
			<Container maxWidth="sm" sx={{ py: 8 }}>
				<Box textAlign="center" display="flex" flexDirection="column" gap={2}>
					<Typography variant="h4" fontWeight="bold">
						Are you moving out?
					</Typography>
					<Typography variant="body1">And are worried what to do with your stuff?</Typography>
					<Typography variant="body1">Well, worry not! We are here to help you sell your stuff before you shift.</Typography>
					<Typography variant="h6" fontWeight="medium">
						Presenting
					</Typography>
					<Typography variant="h5" fontWeight="bold" color="primary">
						MovingOut.in
					</Typography>
					<Typography variant="body1">A hyperlocal moving-sale platform for bachelors & students who want to sell their stuff before shifting, fast.</Typography>

					<Button href="/list" variant="contained" size="large" sx={{ mt: 4 }}>
						List Your Item
					</Button>
					<Typography variant="body1" sx={{ mt: 4 }}>
						OR
					</Typography>
					<Button href="/browse" variant="contained" size="large" sx={{ mt: 4 }}>
						Browse Items
					</Button>
				</Box>
			</Container>
		</section>
	);
}
