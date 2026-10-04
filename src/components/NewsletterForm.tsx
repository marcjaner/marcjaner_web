import { useState, type SubmitEvent } from "react";
import { useSubmit } from "./useSubmit";

export default function NewsletterForm({ inline = false }: { inline?: boolean }) {
  const [email, setEmail] = useState("");
  const { status, submit } = useSubmit("newsletter");

  if (status.state === "sent") return <p className="notice">You're on the list. See you in your inbox.</p>;

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    submit({ email });
  };

  return (
    <form className={inline ? "form inline" : "form"} onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="email" className={inline ? "visually-hidden" : undefined}>
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <button className="button" type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {status.state === "error" && <p className="error">{status.message}</p>}
    </form>
  );
}
