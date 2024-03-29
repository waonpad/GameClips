import { useParams } from 'react-router-dom';

import { ContentLayout } from '@/components/Layout';

import { CreateGameClip } from '../components/CreateGameClip';
import { LikedGameClipList } from '../components/LikedGameClipList';

export const LikedGameClips = () => {
  const { userId } = useParams();

  return (
    <ContentLayout title="Liked GameClips">
      <div className="flex justify-end">
        <CreateGameClip />
      </div>
      <div className="mt-4">
        <LikedGameClipList userId={userId} />
      </div>
    </ContentLayout>
  );
};
