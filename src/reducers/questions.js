export const questions = (state = [],{type,question,questions})=>{
    if (type === `FETCHED_QUESTION`) {
        if (!state.find(q=>q.question_id === question.question_id)) {
            state = [...state,question];
        } else {
            state = state.map(cachedQuestion=>{
                if (cachedQuestion.question_id === question.question_id) {
                    return {...cachedQuestion,question};
                } else {
                    return cachedQuestion;
                }
            })
        }
    }
    if (type === `FETCHED_QUESTIONS`) {
        questions.forEach(question=>{
            if (!state.find(q=>q.question_id === question.question_id)) {
                state = [...state,question];
            }
        })
    }
    return state;
}