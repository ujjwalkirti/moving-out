"use client";

import React from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NavbarDrawer from "./NavbarDrawer";
import { navbarLinks } from "@/app/_constants/Navbar";

function Navbar() {
	const [open, setOpen] = React.useState(false);
	return (
		<header className=" p-4 shadow-md shadow-gray-400 bg-gradient-to-b from-gray-700 to-gray-900">
			<nav className="flex justify-between items-center gap-4 w-full lg:w-4/5 mx-auto text-white">
				<Link href="/" className="cursor-pointer">
					<p className="text-xl lg:text-3xl font-bold">Moving-Out</p>
				</Link>
				<div className="hidden lg:flex ilg:tems-center gap-4">
					<SignedOut>
						<SignInButton />
						<SignUpButton />
					</SignedOut>
					<SignedIn>
						{navbarLinks.map((link, index) => (
							<Link key={link.label} href={link.href} className="cursor-pointer hover:underline">
								<p className="">{link.label}</p>
							</Link>
						))}
						<UserButton />
					</SignedIn>
				</div>
				<div className="flex items-center gap-2 lg:hidden">
					<UserButton />
					<IconButton onClick={() => setOpen(!open)} sx={{ color: "white" }}>
						<MenuIcon />
					</IconButton>
					{open && <NavbarDrawer open={open} toggleDrawer={(open: boolean) => () => setOpen(open)} />}
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
