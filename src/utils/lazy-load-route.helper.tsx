import { lazy, Suspense } from 'react';
import { LoadingScreen } from '../components/LoadingScreen';

/**
 * Lazily load the mentioned component which resides in the page directory
 * This method will be used in routes so that the files are loaded only
 * When users are on that route
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function lazyLoadRoutes(factory: () => Promise<{ default: any }>) {
  const LazyElement = lazy(factory);

  // Wrapping around the suspense component is mandatory
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LazyElement />
    </Suspense>
  );
}
