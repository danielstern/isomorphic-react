import unionWith from 'lodash/unionWith';

export const questions = (state = [],{type,question,questions})=>{
    const questionEquality = (a = {},b = {})=>{
        return a.question_id == b.question_id
    };

    if (type === `FETCHED_QUESTION`) {
        state = unionWith([question],state,questionEquality);
    }

    if (type === `FETCHED_QUESTIONS`) {
        state = unionWith(state,questions,questionEquality);
    }
    return state;
};