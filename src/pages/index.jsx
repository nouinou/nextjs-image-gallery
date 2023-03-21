import Header from '@/components/Header/Header';
import ImageGallery from '@/page-components/ImageGallery/ImageGallery';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function Home() {
  const { data: session } = useSession();
  let username;

  if (session && session.user) {
    username = session.user.username;
  }

  return (
    <div className="container">
      <Header username={username} />
      <ImageGallery />
    </div>
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
