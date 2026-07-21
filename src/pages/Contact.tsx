import type { FormEvent } from 'react';

export function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = encodeURIComponent(
      `From: ${data.get('name')} <${data.get('email')}>\n\n${data.get('message')}`,
    );
    window.location.href = `mailto:hello@anisha.dev?subject=Note%20from%20anisha.dev&body=${body}`;
  };

  return (
    <div className="page page--narrow">
      <h1 className="h1">Contact &amp; collab</h1>
      <p className="section-lead">Pick the one that fits — it helps me reply faster.</p>

      <div className="grid-3" style={{ marginBottom: 44 }}>
        <a
          href="mailto:hello@anisha.dev?subject=Speaking%20invite"
          className="contact-card"
        >
          <div className="contact-swatch contact-swatch--pink" />
          <div className="contact-card__title">Speaking invites</div>
          <div className="contact-card__body">
            Conference, meetup, or podcast — send dates, audience, and format.
          </div>
        </a>
        <a
          href="mailto:hello@anisha.dev?subject=Sponsorship%20inquiry"
          className="contact-card"
        >
          <div className="contact-swatch contact-swatch--orange" />
          <div className="contact-card__title">Sponsorship &amp; partnerships</div>
          <div className="contact-card__body">
            Workshops, sample-app collabs, or content partnerships with your dev tools.
          </div>
        </a>
        <a href="mailto:hello@anisha.dev?subject=Say%20hello" className="contact-card">
          <div className="contact-swatch contact-swatch--yellow" />
          <div className="contact-card__title">General collab</div>
          <div className="contact-card__body">
            Open to most things dev-community shaped — just tell me what you&rsquo;re building.
          </div>
        </a>
      </div>

      <form className="form-card" onSubmit={onSubmit}>
        <h3>Or send a note directly</h3>
        <div className="form-row">
          <input
            className="form-input"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
        </div>
        <textarea
          className="form-textarea"
          name="message"
          rows={4}
          placeholder="What are you building / what's the ask?"
          required
        />
        <button type="submit" className="btn-primary">
          Send message
        </button>
      </form>
    </div>
  );
}
