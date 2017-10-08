import { takeEvery, put, select } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

export default function * () {
    yield takeEvery(`REQUEST_LOAD_QUESTION`,handleFetchQuestion);
}

function * handleFetchQuestion ({question_id}) {
    const loadedQuestions = yield select(state=>state.questions);
    if (Object.keys(loadedQuestions).includes(question_id)) {
        return;
    }
    const raw = yield fetch(`http://localhost:3000/api/questions/${question_id}`);
    const json = yield raw.json();
    const question = json.items[0];
    yield put({type:`FETCHED_QUESTION`,question});
}