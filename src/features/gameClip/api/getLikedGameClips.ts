import { useEffect, useState } from 'react';

import { collection, doc, getDoc } from 'firebase/firestore';

import { db } from '@/config/firebase';
import type { CustomQuery } from '@/hooks/useFirestore';
import { useFirestore } from '@/hooks/useFirestore';

import type { LikedGameClip } from '../types';

export type UseLikedGameClipsOptions = {
  userId: string;
  config?: {
    query?: Omit<CustomQuery<LikedGameClip>, 'target' | 'type'>;
  };
};

const DEFAULT_OPTIONS: UseLikedGameClipsOptions = {
  userId: '',
  config: {
    query: {
      orderBy: [
        {
          field: 'createdAt',
          direction: 'desc',
        },
      ],
      // limit: {
      //   limit: 10,
      // },
    },
  },
};

export const useLikedGameClips = ({ config, userId }: UseLikedGameClipsOptions) => {
  const userRef = doc(db, 'users', userId);

  const [userIsExist, setUserIsExist] = useState(true);

  const likedGameClips = useFirestore<LikedGameClip[]>({
    target: collection(userRef, 'likedGameClips'),
    where: [...(DEFAULT_OPTIONS.config?.query?.where ?? []), ...(config?.query?.where ?? [])],
    orderBy: [...(DEFAULT_OPTIONS.config?.query?.orderBy ?? []), ...(config?.query?.orderBy ?? [])],
    start: config?.query?.start ?? DEFAULT_OPTIONS.config?.query?.start,
    end: config?.query?.end ?? DEFAULT_OPTIONS.config?.query?.end,
    limit: config?.query?.limit ?? DEFAULT_OPTIONS.config?.query?.limit,
  });

  useEffect(() => {
    const checkUserRef = async () => {
      const userRefDoc = await getDoc(userRef);
      setUserIsExist(userRefDoc.exists());
    };
    checkUserRef();
  }, [userRef]);

  return {
    ...likedGameClips,
    userIsExist,
  };
};
