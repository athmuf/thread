'use client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatRelativeTime = (date: string) => {
  return dayjs(date).fromNow(true) + ' ago';
};
