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
  PromiseState: string;
  constructor(f: Executor<T>) {
    this.PromiseState = PROMISE_STATUS.STATUS_PENDING;

    const resolve = () => {
      if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
        this.PromiseState = PROMISE_STATUS.STATUS_FULFILLED;
      }
    };
    const reject = () => {
      if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
        this.PromiseState = PROMISE_STATUS.STATUS_REJECTED;
      }
    };
    f(resolve, reject);
  }
  then<U>(g: (result: T) => myPromise<U>): myPromise<U> {}
  catch<U>(g: (error: unknown) => myPromise<U>): myPromise<U> {}
}
