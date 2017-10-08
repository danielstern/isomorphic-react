import { put } from 'redux-saga/effects'
export default function * () {
    const raw = yield fetch('http://localhost:3000/api/questions');
    const json = yield raw.json();
    console.log("JSON?",json);
    const questions = json.items;
    yield put({type:`FETCHED_QUESTIONS`,questions});
}