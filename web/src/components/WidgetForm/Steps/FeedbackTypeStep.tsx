import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixei seu Feedback</span>

        <CloseButton />
      </header>

      <div className="flex w-full gap-2 py-8">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              type="button"
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
              className='flex flex-col items-center flex-1 w-24 gap-2 py-5 border-2 border-transparent rounded-lg bg-zinc-800 hover:border-brand-500 focus:border-brand-500 focus:outline-none'
            >
              <img src={value.image.src} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}