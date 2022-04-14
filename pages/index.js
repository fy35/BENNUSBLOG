import Head from 'next/head';
import PostWidget from '../components/PostWidget';
import PostCard from '../components/PostCard';
import Categories from '../components/Categories';
import FeaturedPosts from '../sections/FeaturedPosts';

import { getPosts } from '../services';

const Home = ({ posts }) => {
  return (
    <div className="container mx-auto mb-8 px-10">
      <Head>
        <title>LightpinkParadise</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="col-span-1 lg:col-span-4">
          <div className="relative top-8 lg:sticky">
            <PostWidget />
            <Categories />
          </div>
        </div>

        <div className="col-span-1 lg:col-span-8">
          {posts.map((post) => (
            <PostCard key={post.node.slug} post={post.node} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
