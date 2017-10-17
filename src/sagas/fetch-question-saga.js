import { takeEvery, put } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';

export default function * () {
    /**
     * Every time REQUEST_FETCH_QUESTION, fork a handleFetchQuestion process for it
     */
    yield takeEvery(`REQUEST_FETCH_QUESTION`,handleFetchQuestion);
}

/**
 * Fetch question details from the local proxy API
 */
function * handleFetchQuestion ({question_id}) {
    const raw = yield fetch(`/api/questions/${question_id}`);
    const json = yield raw.json();
    const question = json.items[0];
    /**
     * Notify application that question has been fetched
     */
    yield put({type:`FETCHED_QUESTION`,question});
}