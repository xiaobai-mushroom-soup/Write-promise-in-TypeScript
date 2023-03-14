type Executor<T, E extends Error> = (
  resolve: (result: T) => void,
  reject: (error: E) => void
) => void;

class myPromise<T, E extends Error> {
  constructor(f: Executor<T, E>) {}
  then<U, F extends Error>(g: (result: T) => myPromise<U, F>): myPromise<U, F>;
  catch<U, F extends Error>(g: (error: E) => myPromise<U, F>): myPromise<U, F>;
}

