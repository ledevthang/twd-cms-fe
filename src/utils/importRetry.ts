import React from 'react';
import { RetriesEnum, IntervalEnum } from '@/types/importRetry.enum';
import { delay } from './delay';

export default async function importRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries = RetriesEnum.FiveTimes,
  interval = IntervalEnum.OneSecond
): Promise<{ default: T }> {
  try {
    return await factory();
  } catch (error) {
    if (retries) {
      await delay(interval);
      return importRetry(factory, retries - 1, interval);
    }
    throw error;
  }
}
