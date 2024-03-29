import { useParams } from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import type { User } from '@/features/users';
import { useAuthContext } from '@/lib/auth';
import { POLICIES, Authorization } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { useGameClip } from '../api/getGameClip';
import { DeleteGameClip } from '../components/DeleteGameClip';

export const GameClip = () => {
  const { gameClipId } = useParams();
  const auth = useAuthContext();

  const gameClipQuery = useGameClip({ id: gameClipId });

  if (gameClipQuery.isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!gameClipQuery.data) return null;

  return (
    <ContentLayout title="GameClip">
      <div className="mt-4">
        <div className="w-full bg-white shadow-sm p-4">
          <span className="text-xs font-semibold">{formatDate(gameClipQuery.data.createdAt)}</span>
          <Authorization
            policyCheck={POLICIES['gameClip:delete'](auth?.userDocData as User, gameClipQuery.data)}
          >
            <div className="flex justify-between">
              <DeleteGameClip data={gameClipQuery.data} />
            </div>
          </Authorization>

          <div>
            <span>{gameClipQuery.data.body}</span>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
