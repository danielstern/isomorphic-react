import { delay } from 'redux-saga';

export default {

    async getNotifications(){

        // console.warn("Contacting real notifications server!");
        await delay(2000);
        return { count : 3 };

    }

};
