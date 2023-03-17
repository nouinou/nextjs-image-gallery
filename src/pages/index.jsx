import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== 'loading' && !session) {
    router.push('/login');
  }

  return (
    <>
      <button type="button" onClick={signOut}>
        signout
      </button>
      <div>content goes here</div>
    </>
  );
}
