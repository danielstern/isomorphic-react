let count = 0;

export default {

    __setCount(_count){

        count = _count;

    },
    async getNotifications(){

        // console.warn("Using mock notification service");
        return { count };

    }
};

