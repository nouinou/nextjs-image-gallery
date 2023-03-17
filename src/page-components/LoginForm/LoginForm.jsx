import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { router } from 'next/router';
import { useState } from 'react';
import Input from '@/components/InputField/Input';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [error, setError] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const login = await signIn('credentials', { ...data, redirect: false });

    if (login.error) {
      setError(login.error);
    }

    if (!login.error) {
      router.replace('/');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome back</h1>
      <p className={styles.sub}>Welcome back! Please enter your details.</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          name="username"
          type="text"
          placeholder="Enter your username"
          required
          register={register}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          register={register}
        />
        <button type="submit" className="primary">
          Submit
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
