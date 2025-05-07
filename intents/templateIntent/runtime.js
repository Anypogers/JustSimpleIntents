const RuntimeLock = {
  locked: false,
  lockedTime: 0,
  lock: function (time) {
    this.locked = true;
    this.lockedTime = time;
  },
  unlock: function () {
    this.locked = false;
    this.lockedTime = 0;
  },
  tryUnlock: function () {
    if (this.lockedTime > 0) {
      this.lockedTime -= 1;
    } else {
      this.unlock();
    }
  },
  isLocked: function () {
    return this.locked;
  }
}

export default async function run() {
  // This is a function that will be run constantly in the background
  // It's recommend for this to not do complex tasks, and only run from time to time, not every possible second.
  // This is because it can be very resource intensive, so putting a lock on it is a good idea.
  // It's also HIGHLY recommended for it to be asynchronous, so it doesn't block the main thread.
  if (RuntimeLock.isLocked()) {
    RuntimeLock.tryUnlock(); // Try to unlock the lock if it's time
    return; // If the lock is active, do not run the function
  }
  myRuntimeFunc();
  RuntimeLock.lock(10); // Locks the function for 10 iterations.
}

function myRuntimeFunc(){
  console.log("Hello World!");
}