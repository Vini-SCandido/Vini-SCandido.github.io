import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: 'Rumor Aleatório',
    description: 'Um blog de aventuras fantásticas',
    site: context.site,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.id}/`
    })),
    customData: `<language>pt-br</language><atom:link href="https://vini-scandido.github.io/rss.xml" rel="self" type="application/rss+xml" />`,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
  })
}