import Header from '@/components/Header/Header';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import dynamic from 'next/dynamic';

const DynamicGallery = dynamic(() => import('@/page-components/ImageGallery/ImageGallery'), {
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const { data: session } = useSession();
  let username;

  if (session && session.user) {
    username = session.user.username;
  }

  return (
    <>
      <Head>
        <title>Gallery | NexJS Image Gallery App</title>
        <meta name="description" content="This app was built by Hamza Nouinou" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <Header username={username} />
        <DynamicGallery />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
