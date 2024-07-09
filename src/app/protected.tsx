
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export default function Protected() {
  return <div>This is a protected page</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
