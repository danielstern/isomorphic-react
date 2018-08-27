import { questions } from './questions';

describe('The questions reducer', () => {
  it('Should not modify state for unrecognized action', () => {
    console.log('Testing questions');
    const state = ['foo', 'bar'];
    const stateClone = ['foo', 'bar'];
    const newState = questions(state, { type: 'UNRECOGNIZED_ACTION' });

    expect(newState).toEqual(stateClone);
    expect(newState).toBe(state);
  });

  it('Should add new questions', () => {
    const state = [{question_id: 'foo'}, {question_id: 'bar'}];
    const newQuestion = {question_id: 'baz'};
    const newQuestionClone = {question_id: 'baz'};
    const newState = questions(state, {type: 'FETCHED_QUESTION', question: newQuestion});

    // console.log(newState);

    expect(newState).toContain(newQuestion);
    expect(state).not.toContain(newQuestion);
    expect(newState).toHaveLength(3);
  });
});