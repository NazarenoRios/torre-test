'use client';

import React from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {
  const { push } = useRouter();

  const handleRedirect = () => {
    push('/TextExample');
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <button onClick={handleRedirect}>Redirect</button>
    </div>
  );
};

export default Page;
