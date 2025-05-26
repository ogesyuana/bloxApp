import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CreateUser = dynamic(() => import('./createUser'));

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <CreateUser />
    </Suspense>
  );
}

