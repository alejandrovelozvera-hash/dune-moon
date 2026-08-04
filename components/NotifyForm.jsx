"use client";

import { useState } from "react";

const ENDPOINT = "https://formsubmit.co/ajax/imdunemusic@gmail.com";
const SUBJECT = "Nuevo suscriptor: avísame el estreno de En Mi Mente";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: SUBJECT,
          email: email.trim(),
          _template: "table",
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={`notify${status === "ok" ? " is-done" : ""}`}>
      {status === "ok" ? (
        <p className="notify__done" role="status">
          ¡Listo! Te avisaré por correo cuando salga «En Mi Mente» el 15 de agosto.
        </p>
      ) : (
        <form className="notify__form" onSubmit={submit} noValidate>
          <label className="notify__label" htmlFor="notify-email">
            ¿Te aviso cuando estrene?
          </label>
          <div className="notify__row">
            <input
              id="notify-email"
              className="notify__input"
              type="email"
              required
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "sending"}
            />
            <button
              className="btn btn--primary notify__btn"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Enviando…" : "Avísame"}
            </button>
          </div>
          {status === "error" && (
            <p className="notify__error" role="alert">
              Hubo un error al enviar. Inténtalo de nuevo o escríbeme a
              imdunemusic@gmail.com
            </p>
          )}
        </form>
      )}
    </div>
  );
}
