type Executor = (resolve: Function, reject: Function) => void;

class myPromise {
  constructor(f: Executor) {}
}
