import { mapStateToProps } from '../QuestionDetail';

describe('The Question Detail Component', () => {
  describe('The Container Element', () => {
    describe('mapStateToProps', () => {
      it('Should map the state to props correctly', () => {
        const sampleQuestion = {
          question_id: 42,
          body: "Space is big"
        };
        const appState = {
          questions: [sampleQuestion]
        };
        const ownProps = {
          question_id: 42
        };
        const componentState = mapStateToProps(appState, ownProps);
        console.log(componentState);
        expect(componentState).toEqual(sampleQuestion);
      });
    });
  });
  it('Should not regress', () => {

  });
});