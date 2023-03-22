import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectToDatabase from '@/database/level';
import userStatus from '@/enums/user-status';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Login',
      async authorize(credentials) {
        const { username, password } = credentials;
        const userDB = await connectToDatabase();
        return userDB
          .get(username)
          .then((user) => {
            if (user.password === password) {
              if (user.status !== userStatus.blocked) {
                return {
                  id: user.id,
                  username: user.username,
                };
              }

              userDB.close();
              throw new Error('Ce compte a été bloqué.');
            }

            throw new Error('Informations de connexion invalides');
          })
          .catch((error) => {
            userDB.close();
            if (error.notFound) {
              throw new Error('Informations de connexion invalides');
            }

            throw new Error(error.message);
          });
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session && token) {
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
