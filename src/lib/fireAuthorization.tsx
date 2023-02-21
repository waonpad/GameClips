import * as React from 'react';

import type { Comment } from '@/features/comments';
import type { User } from '@/features/users';

import { useFireAuth } from './fireAuth';

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
  'comment:delete': (user: User, comment: Comment) => {
    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.role === 'USER' && comment.authorId === user.id) {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user, userDocData } = useFireAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0 && userDocData) {
        return allowedRoles?.includes(userDocData?.role);
      }

      return true;
    },
    [userDocData]
  );

  return { checkAccess, role: userDocData?.role };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};