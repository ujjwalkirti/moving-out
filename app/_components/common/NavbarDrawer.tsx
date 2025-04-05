import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import React from "react";
import { navbarLinks } from "@/app/_constants/Navbar";

interface NavbarDrawerProps {
	open: boolean;
	toggleDrawer: (open: boolean) => () => void;
}

function NavbarDrawer({ open, toggleDrawer }: NavbarDrawerProps) {
	const DrawerList = (
		<Box sx={{ width: 250, display: "flex", flexDirection: "column", backgroundColor: "dimgray", color: "white", height: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
			<List>
				{navbarLinks.map((link, index) => (
					<ListItem key={link.label} disablePadding>
						<ListItemButton>
							<ListItemText primary={link.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Box>
	);
	return (
		<SwipeableDrawer open={open} anchor="right" onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
			{DrawerList}
		</SwipeableDrawer>
	);
}

export default NavbarDrawer;
