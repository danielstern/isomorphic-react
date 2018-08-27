import { delay } from "redux-saga";

export default {
  async GetNotifications() {
    console.warn('REAL NOTIFICATION SERVICE! REALLY CONTACTING APIS!');
    await delay(1000);
    return { count: 42 };
  }
}