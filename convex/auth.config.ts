export default {
	providers: [
		{
			domain: process.env.DOMAIN_CLERK_URL!,
			applicationID: 'convex',
		},
	],
}
