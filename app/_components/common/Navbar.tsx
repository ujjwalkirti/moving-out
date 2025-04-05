import React from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Navbar() {
	return (
		<header className=" p-4  h-16 shadow-md shadow-gray-400 bg-gradient-to-b from-gray-700 to-gray-900">
			<nav className="flex justify-between items-center gap-4 w-full lg:w-4/5 mx-auto">
				<Link href="/" className="cursor-pointer">
					<p className="text-3xl font-bold">Moving-Out</p>
				</Link>
				<div className="flex items-center gap-4">
					<SignedOut>
						<SignInButton />
						<SignUpButton />
					</SignedOut>
					<SignedIn>
						<Link href="/list" className="cursor-pointer hover:underline">
							<p className="">Your listed items</p>
						</Link>
						<Link href={"/admin"} className="cursor-pointer hover:underline">
							<p className="">Dashboard</p>
						</Link>
						<UserButton />
					</SignedIn>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
