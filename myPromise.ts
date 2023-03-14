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
  value: T | undefined;
  reason: unknown | undefined;
  constructor(f: Executor<T>) {
    this.PromiseState = PROMISE_STATUS.STATUS_PENDING;

    const resolve = (result: T) => {
      if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
        this.PromiseState = PROMISE_STATUS.STATUS_FULFILLED;
        this.value = result;
      }
    };
    const reject = (error: unknown) => {
      if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
        this.PromiseState = PROMISE_STATUS.STATUS_REJECTED;
        this.reason = error;
      }
    };
    try {
      f(resolve, reject);
    } catch (err) {
      if (err instanceof Error) {
        reject(err.message || err);
      }
    }
  }
  then<U>(g: (result: T) => myPromise<U>): myPromise<U> {}
  catch<U>(g: (error: unknown) => myPromise<U>): myPromise<U> {}
}
