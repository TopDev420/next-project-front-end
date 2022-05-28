import { useEffect } from 'react';
import { useRouter } from 'next/router';

const EmailVerified = () => {
  const router = useRouter();

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [router]);

  return (
    <div className="content text-center">
      <h1 className="mb-6">Your email has been verified</h1>
      <p>Redirecting you to home page in 5 seconds...</p>
    </div>
  );
};

export default EmailVerified;
