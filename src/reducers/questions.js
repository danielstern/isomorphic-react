/**
 * todo... rewrite using lodash
 */
export const questions = (state = [],{type,question,questions})=>{
    if (type === `FETCHED_QUESTION`) {
        if (!state.find(q=>q.question_id.toString() === question.question_id.toString())) {
            state = [...state,question];
        } else {
            state = state.map(cachedQuestion=>{
                if (cachedQuestion.question_id.toString() === question.question_id.toString()) {
                    return {...question};
                } else {
                    return cachedQuestion;
                }
            })
        }
    }
    if (type === `FETCHED_QUESTIONS`) {
        questions.forEach(question=>{
            if (!state.find(q=>q.question_id.toString() === question.question_id.toString())) {
                state = [...state,question];
            }
        })
    }
    return state;
}