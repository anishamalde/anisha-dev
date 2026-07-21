import { TALKS, UPCOMING_TALKS, type Talk, type UpcomingTalk } from '../data';

type ItemProps = {
  title: string;
  venue: string;
  stamp: string;
  location?: string;
  blurb?: string;
  kind?: Talk['kind'];
  coSpeaker?: string;
  slidesUrl?: string;
  videoUrl?: string;
};

function TalkItem({
  title,
  venue,
  stamp,
  location,
  blurb,
  kind,
  coSpeaker,
  slidesUrl,
  videoUrl,
}: ItemProps) {
  const hasMeta = kind === 'podcast' || coSpeaker || slidesUrl || videoUrl || location;

  return (
    <div className="talk-item">
      <div className="talk-item__head">
        <div className="talk-item__title">{title}</div>
        <div className="talk-row__stamp">
          {venue} · {stamp}
        </div>
      </div>
      {blurb && <p className="talk-item__blurb">{blurb}</p>}
      {hasMeta && (
        <div className="talk-item__links">
          <div className="talk-item__meta">
            {location && <span className="talk-item__co">{location}</span>}
            {kind === 'podcast' && <span className="badge-note">podcast</span>}
            {coSpeaker && <span className="talk-item__co">with {coSpeaker}</span>}
          </div>
          <div className="talk-item__cta">
            {slidesUrl && (
              <a href={slidesUrl} target="_blank" rel="noreferrer">
                Slides ↗
              </a>
            )}
            {videoUrl && (
              <a href={videoUrl} target="_blank" rel="noreferrer">
                {kind === 'podcast' ? 'Listen ↗' : 'Video ↗'}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function fromTalk(talk: Talk): ItemProps {
  return {
    title: talk.title,
    venue: talk.venue,
    stamp: talk.year,
    blurb: talk.blurb,
    kind: talk.kind,
    coSpeaker: talk.coSpeaker,
    slidesUrl: talk.slidesUrl || undefined,
    videoUrl: talk.videoUrl || undefined,
  };
}

function fromUpcoming(talk: UpcomingTalk): ItemProps {
  return {
    title: talk.title,
    venue: talk.venue,
    stamp: talk.date,
    location: talk.location,
  };
}

export function Talks() {
  return (
    <div className="page page--narrow">
      <h1 className="h1">Talks</h1>

      {UPCOMING_TALKS.length > 0 && (
        <>
          <h2 className="eyebrow">Upcoming</h2>
          {UPCOMING_TALKS.map((talk) => (
            <TalkItem key={talk.title} {...fromUpcoming(talk)} />
          ))}
        </>
      )}

      <h2
        className="eyebrow"
        style={{ marginTop: UPCOMING_TALKS.length > 0 ? 40 : 0 }}
      >
        Past
      </h2>
      {TALKS.map((talk) => (
        <TalkItem key={`${talk.title}-${talk.year}`} {...fromTalk(talk)} />
      ))}
    </div>
  );
}
