import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
