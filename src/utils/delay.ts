export const delay = (timeout: number) =>
  new Promise(done => setTimeout(done, timeout));
