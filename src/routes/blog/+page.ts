import { GraphQLClient } from 'graphql-request';

export async function load() {
  const graphcms = new GraphQLClient(
    'https://api-us-west-2.graphcms.com/v2/ckx6em1th5ke501xq4z6t1q05/master',
    {
      headers: {}
    }
  );
  const { posts } = await graphcms.request(
    `{ 
        posts {
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
          }
          tags
          author {
						name
            picture {
              url
            }
					}
        }
      }`
  );
  return {
    props: {
      posts
    }
  };
}
