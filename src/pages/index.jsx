import Header from '@/components/Header/Header';
import ImageGallery from '@/page-components/ImageGallery/ImageGallery';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  let username;

  if (status !== 'loading' && !session) {
    router.push('/login');
  }

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
