type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;

class myPromise<T> {
  constructor(f: Executor<T>) {}
  then<U>(g: (result: T) => myPromise<U>): myPromise<U> {}
  catch<U>(g: (error: unknown) => myPromise<U>): myPromise<U>{};
}
