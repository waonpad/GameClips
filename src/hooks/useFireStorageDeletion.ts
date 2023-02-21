import { useState, useEffect } from 'react';

import { ref, deleteObject } from 'firebase/storage';

import { storage } from '@/config/firebase';

export const useFireStorageDeletion = () => {
  const [deletion, setDeletion] = useState<{
    isLoading: boolean;
    error: Error | null;
  }>({
    isLoading: false,
    error: null,
  });

  const { error } = deletion;

  useEffect(() => {
    console.log(error);
  }, [error]);

  const mutate = (path: string, options?: { onSuccess?: () => void; onError?: () => void }) => {
    setDeletion({
      isLoading: true,
      error: null,
    });

    deleteObject(ref(storage, path))
      .then(() => {
        setDeletion({
          isLoading: false,
          error: null,
        });
        options?.onSuccess && options.onSuccess();
      })
      .catch((error) => {
        setDeletion({
          isLoading: false,
          error: error,
        });
        options?.onError && options.onError();
      });
  };

  return { deletion, mutate };
};