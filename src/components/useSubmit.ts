import { useState } from "react";
import { postJson } from "../lib/api";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function useSubmit(fn: string) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (body: unknown) => {
    setStatus({ state: "sending" });
    try {
      await postJson(fn, body);
      setStatus({ state: "sent" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setStatus({ state: "error", message });
    }
  };

  return { status, submit };
}
