import { Skeleton } from 'antd';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CreatePost = dynamic(() => import('./createPost'));

export default function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <CreatePost />
    </Suspense>
  );
}

