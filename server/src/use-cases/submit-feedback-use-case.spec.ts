import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
  it('should be able to submit a feedback', () => {
    expect(submitFeedbackUseCase.execute({
      type: 'BUG', 
      comment: 'test comment', 
      screenshot: 'data:image/png;base64,test.png',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', () => {
    expect(submitFeedbackUseCase.execute({
      type: '', 
      comment: 'test comment', 
      screenshot: 'data:image/png;base64,test.png',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', () => {
    expect(submitFeedbackUseCase.execute({
      type: 'BUG', 
      comment: '', 
      screenshot: 'data:image/png;base64,test.png',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', () => {
    expect(submitFeedbackUseCase.execute({
      type: 'BUG', 
      comment: 'test comment', 
      screenshot: 'test.png',
    })).rejects.toThrow();
  });
})