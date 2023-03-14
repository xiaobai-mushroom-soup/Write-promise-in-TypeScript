type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;
const enum PROMISE_STATUS {
  STATUS_PENDING = "pending",
  STATUS_FULFILLED = "fulfilled",
  STATUS_REJECTED = "rejected",
}
class myPromise<T> {
  constructor(f: Executor<T>) {
    const resolve = () => {};
    const reject = () => {};
  }
  then<U>(g: (result: T) => myPromise<U>): myPromise<U> {}
  catch<U>(g: (error: unknown) => myPromise<U>): myPromise<U> {}
}
