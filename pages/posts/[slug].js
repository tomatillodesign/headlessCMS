import Image from "next/image";
import { BlockCentered, RoundedCard } from "../../components/StyledComponents/WrappingComponents";
import PageLayout from "../../components/PageLayout"
export default function Post(data) {
  // console.log({data});
  const post = data.post
  return (
    <PageLayout>
      <div className="h-screen">
        <BlockCentered>
          <RoundedCard className='h-100px text-black'>
            <h1>{post.title}</h1>
            {post.featuredImage?.node.sourceUrl &&
              <Image width="640" height="426" src={post.featuredImage.node.sourceUrl} alt={`${post.title}`} />
            }
            <article dangerouslySetInnerHTML={{ __html: post.content }}></article>
          </RoundedCard>
        </BlockCentered>
      </div>


    </PageLayout>
  )
}

export async function getStaticProps(context) {
  const res = await fetch('https://arautorepair1.wpengine.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
            query SinglePostQuery($id: ID!, $idType: PostIdType!) {
                post(id: $id, idType: $idType) {
                content
                slug
                title
                featuredImage {
                    node {
                    sourceUrl
                    }
                }
                }
            }
        `,
      variables: {
        id: context.params.slug,
        idType: 'SLUG'
      }
    })
  })

  const json = await res.json()

  return {
    props: {
      post: json.data.post
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch('https://arautorepair1.wpengine.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts {
            nodes {
              content
              id
              slug
              title
            }
          }
        }
      `
    })
  })

  const json = await res.json()
  const posts = json.data.posts.nodes
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }))
  return { paths, fallback: false }
}