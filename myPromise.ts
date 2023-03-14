type Executor<T, E extends Error> = (
  resolve: (result: T) => void,
  reject: (error: E) => void
) => void;

class myPromise<T, E extends Error> {
  constructor(f: Executor<T, E>) {}
}
