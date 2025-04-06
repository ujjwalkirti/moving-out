import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "Moving Out",
	description: "MovingOut.in – a hyperlocal moving-sale platform for bachelors & students who want to sell their stuff before shifting, fast.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <section className="w-full p-2 lg:w-4/5 mx-auto">{children}</section>;
}
