import { Suspense } from "react";
import DemoAccount from "./DemoAccounts";

const features = [
	{
		title: "Store URLs",
		description: "Store all of your URLs in one place.",
	},
	{
		title: "Organise Links",
		description: "Organise your links for easy access.",
	},
	{
		title: "Search Links",
		description: "Search through your links to find what you need quickly.",
	}
];

const why = [
	{
		title: "Keep your links organised",
		description: "Have a collection of links, that you're always using? Organise them into collections for easy access.",
	},
	{
		title: "Access anywhere",
		description: "Access your links from any device, anywhere in the world.",
	},
	{
		title: "Share with others (Soon)",
		description: "Share your collections with others, or keep them private.",
		border: "border-amber-500/30"
	},
]

export default function Home() {
	return (
		<>
			<div className="w-full mt-4 px-2">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 rounded-xl border-muted py-4">
					<h1 className="text-4xl font-bold">
						URL Store
					</h1>
					<h2 className="text-2xl mt-2 text-muted-foreground">
						Store your URLs efficiently
					</h2>
				</div>
			</div>
			<h3 className="text-3xl font-bold mt-8 text-center mb-2">Features</h3>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{features.map((feature, index) => (
						<div key={index} className={"border-2 rounded-xl p-4" + (feature.border ? ` ${feature.border}` : " border-muted")}>
							<h4 className="text-xl font-bold">{feature.title}</h4>
							<p className="text-muted-foreground">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
			<h3 className="text-3xl font-bold mt-8 text-center">Why?</h3>
			<p className="text-muted-foreground text-center mb-2">Here are a few reasons why you should use URL Store:</p>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{why.map((item, index) => (
						<div key={index} className={"border-2 rounded-xl p-4 " + (item.border ? item.border : "border-muted")}>
							<h4 className="text-xl font-bold">{item.title}</h4>
							<p className="text-muted-foreground">{item.description}</p>
						</div>
					))}
				</div>
			</div>
			<h3 className="text-3xl font-bold mt-8 text-center">Get Started</h3>
			<p className="text-muted-foreground text-center mb-2">Ready to start using URL Store? Sign up with an account, or use the demo account below:</p>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<Suspense fallback={<p>Loading demo account...</p>}>
					<DemoAccount />
				</Suspense>
			</div>
		</>
	)
}