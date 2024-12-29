// @ts-nocheck
import { GraphQLClient } from 'graphql-request';

/** @param {Parameters<import('./$types').PageLoad>[0]} ctx */
export async function load(ctx) {
	const graphcms = new GraphQLClient(
		'https://api-us-west-2.graphcms.com/v2/ckx6em1th5ke501xq4z6t1q05/master',
		{
			headers: {}
		}
	);
	const { post } = await graphcms.request(
		`query PostPageQuery($slug: String!) {
			post(where: { slug: $slug }) {
				title
				slug
				date
				excerpt
				coverImage {
					url
					handle
				}
				content {
					text
					raw
					html
				}
				tags
				author {
					name
					picture {
						url
					}
				}
			}
		}`,
		{
			slug: ctx.page.params.slug
		}
	);
	return {
		props: {
			post
		}
	};
}