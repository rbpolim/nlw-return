import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";

import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "./ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);

    await api.post('/feedbacks', {
      type: feedbackType,
      comment,
      screenshot
    })

    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onRestartFeedback}
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="flex items-center gap-2 text-xl leading-6">
          <img className="w-6 h-6" src={feedbackTypeInfo.image.src} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="w-full my-4">
        <textarea
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:outline-none focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-500 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que esta acontecendo..."
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />

          <button
            type="submit"
            onClick={handleSubmitFeedback}
            disabled={comment.length === 0 || isSendingFeedback}
            className="flex items-center justify-center flex-1 p-2 text-sm transition-colors border-transparent rounded-md bg-brand-500 hover:bg-brand-300 focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}