import { default as dayjs } from 'dayjs';

import type { Timestamp, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const formatDate = (date: string | number | Date | dayjs.Dayjs) =>
  dayjs(date).format('MMMM D, YYYY h:mm A');
export const timestampToDate = (timestamp: Timestamp) => {
  return timestamp ? timestamp.toDate() : new Date(0);
};

export const formatDoc = (doc: QueryDocumentSnapshot<DocumentData>) => {
  const data = doc.data();
  const formatedData = { id: doc.id, ...data } as any;

  'createdAt' in data && (formatedData.createdAt = timestampToDate(data.createdAt));
  'updatedAt' in data && (formatedData.updatedAt = timestampToDate(data.updatedAt));
  return formatedData;
};
