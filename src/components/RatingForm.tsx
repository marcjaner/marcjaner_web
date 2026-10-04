import { useEffect, useState, type SubmitEvent } from "react";
import { useSubmit } from "./useSubmit";

const scores = Array.from({ length: 11 }, (_, i) => i);

export default function RatingForm() {
  const [postId, setPostId] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [comments, setComments] = useState("");
  const { status, submit } = useSubmit("newsletter-rating");

  // The page is one static file served for every /newsletter/rate/<postId>.
  useEffect(() => {
    const id = location.pathname.split("/").filter(Boolean)[2];
    setPostId(id ? decodeURIComponent(id) : "");
  }, []);

  if (postId === null) return null;
  if (!postId)
    return <p className="notice">This link is missing the issue it's rating. Try the link from the email again.</p>;
  if (status.state === "sent") return <p className="notice">Thanks. Every rating gets read.</p>;

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (rating !== null) submit({ postId, rating, name, comments });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <fieldset className="field">
        <legend>How good was it?</legend>
        <div className="scale">
          {scores.map((score) => (
            <label key={score}>
              <input
                type="radio"
                name="rating"
                value={score}
                checked={rating === score}
                onChange={() => setRating(score)}
                required
              />
              {score}
            </label>
          ))}
        </div>
        <div className="scale-ends">
          <span>Unsubscribing</span>
          <span>Forwarded it to a friend</span>
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="comments">
          Anything else? <span className="hint">(optional)</span>
        </label>
        <textarea id="comments" rows={4} value={comments} onChange={(e) => setComments(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="name">
          Name <span className="hint">(optional — leave empty to stay anonymous)</span>
        </label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <button className="button" type="submit" disabled={rating === null || status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send rating"}
      </button>
      {status.state === "error" && <p className="error">{status.message}</p>}
    </form>
  );
}
