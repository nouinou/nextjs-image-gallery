import Head from 'next/head';
import styles from '@/styles/Login.module.css';
import LoginForm from '@/page-components/LoginForm/LoginForm';
import Testimonial from '@/components/Testemonial/Testemonial';

export default function Login() {
  const testimonial = {
    name: 'Andi Lane',
    text: `We've been using NestJs Image Gallery 
          to kick start every new project 
          and can't imagine working without it`,
    position: 'Founder, Catalog',
    company: 'Web Design Agency',
    stars: 5,
  };

  return (
    <>
      <Head>
        <title>Login | NexJS Image Gallery App</title>
        <meta name="description" content="This app was built by Hamza Nouinou" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.left}>
          <LoginForm />
        </div>

        <div className={styles.right}>
          <Testimonial data={testimonial} />
        </div>
      </div>
    </>
  );
}
