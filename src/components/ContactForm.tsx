import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useSubmit } from "./useSubmit";

const empty = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(empty);
  const { status, submit } = useSubmit("contact");

  if (status.state === "sent") return <p className="notice">Got it. I'll get back to you soon.</p>;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    submit({ ...form, formType: "contact" });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required value={form.name} onChange={onChange} />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={onChange} />
      </div>
      <div className="field">
        <label htmlFor="subject">
          Subject <span className="hint">(optional)</span>
        </label>
        <input id="subject" name="subject" value={form.subject} onChange={onChange} />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={6} required value={form.message} onChange={onChange} />
      </div>
      <button className="button" type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send"}
      </button>
      {status.state === "error" && <p className="error">{status.message}</p>}
    </form>
  );
}
