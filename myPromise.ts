type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void
) => void;
const enum PROMISE_STATUS {
  STATUS_PENDING = "pending",
  STATUS_FULFILLED = "fulfilled",
  STATUS_REJECTED = "rejected",
}

const execFunWithCatchErr = <T>(execFn:Function,value:T,resolve:Function,reject:Function)=>{
    try{
        const result = execFn(value);
        resolve(result)
    }catch(err){
        if(err instanceof Error){
            reject(err)
        }
    }
}
class myPromise<T> {
  PromiseState: string;
  value: T | undefined;
  reason: unknown | undefined;
  onFullfilledFns ?:Function[]
  onRejectedFns ?:Function[]
  constructor(f: Executor<T>) {
    this.PromiseState = PROMISE_STATUS.STATUS_PENDING;

    const resolve = (result: T) => {
      if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
        this.PromiseState = PROMISE_STATUS.STATUS_FULFILLED;
        this.value = result;
        queueMicrotask(()=>{
            this.onFullfilledFns!.forEach(( fn : any ) => {
              fn(this.value);
            });
        })
      }
    };
    const reject = (error: unknown) => {
      if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
        this.PromiseState = PROMISE_STATUS.STATUS_REJECTED;
        this.reason = error;
         queueMicrotask(() => {
           this.onRejectedFns!.forEach(( fn : any ) => {
             fn(this.reason);
           });
         });
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
  then<U>(g?:(result: T) => myPromise<U> ,e?: (error: unknown) => myPromise<U>): myPromise<U> {
    g = g || ( v => { throw v } )
    e = e || ( r => { throw r } )
 return new myPromise((resolve, reject) => {
   // 当状态为pending的时候进行的逻辑
   if (this.PromiseState === PROMISE_STATUS.STATUS_PENDING) {
     // 入栈操作
     if (g)
       this.onFullfilledFns!.push(() => {
         execFunWithCatchErr(g as Function, this.value, resolve, reject);
       });
     if (e)
       this.onRejectedFns!.push(() => {
         execFunWithCatchErr(e as Function, this.reason, resolve, reject);
       });
   }
   if (this.PromiseState === PROMISE_STATUS.STATUS_FULFILLED && g) {
     execFunWithCatchErr(e as Function, this.value, resolve, reject);
   }
   if (this.PromiseState === PROMISE_STATUS.STATUS_REJECTED && e) {
     execFunWithCatchErr(e, this.reason, resolve, reject);
   }
 });  	
   
  }
  catch<U>(g?: (error: unknown) => myPromise<U>): myPromise<U> {
   return this.then(undefined, g);
  }
}
