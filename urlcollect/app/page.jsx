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
		title: "Search Functionality",
		description: "Find links based on their content, tags, title, etc.",
	},
];

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
						<div key={index} className="border-2 rounded-xl border-muted p-4">
							<h4 className="text-xl font-bold">{feature.title}</h4>
							<p className="text-muted-foreground">{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</>
	)
}