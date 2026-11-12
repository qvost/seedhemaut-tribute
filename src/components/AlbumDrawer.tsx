import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { discography, type Album } from '../data/discography';
import { AlbumImage } from './AlbumImage';

type AlbumDrawerProps = {
  album: Album;
  onClose: () => void;
  onAlbum: (album: Album) => void;
};

export function AlbumDrawer({ album, onClose, onAlbum }: AlbumDrawerProps) {
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Tab') {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>(
            '.inspector button, .inspector a, .inspector input',
          ),
        );
        const first = nodes[0];
        const last = nodes.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previous instanceof HTMLElement) {
        previous.focus();
      }
    };
  }, [onClose]);

  useEffect(() => {
    setTrack(null);
    setQuery('');
  }, [album]);

  const filtered = album.tracks
    .map((t, i) => ({ t, i }))
    .filter(({ t }) =>
      `${t.title} ${t.features}`.toLowerCase().includes(query.toLowerCase()),
    );

  return (
    <motion.div
      className="modal-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="scrim"
        aria-label="Close album inspector"
        onClick={onClose}
      />

      <motion.aside
        className="inspector"
        role="dialog"
        aria-modal="true"
        aria-label={`${album.title} tracklist`}
        data-lenis-prevent
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.4 }}
      >
        <div className="drawer-top">
          <span>THE ARCHIVE / OPEN SLEEVE</span>
          <button ref={closeRef} onClick={onClose}>
            CLOSE ×
          </button>
        </div>

        <div className="album-intro">
          <AlbumImage album={album} />
          <div>
            <small>
              {album.year} / {album.kind}
            </small>
            <h2>{album.title}</h2>
            <p>
              {album.label}
              <br />
              {album.tracks.length} TRACKS
            </p>
            <a
              href={`https://music.apple.com/in/album/${album.apple}`}
              target="_blank"
              rel="noreferrer"
            >
              STREAM ALBUM ↗
            </a>
          </div>
        </div>

        <div className="project-pills">
          {discography.map((item) => (
            <button
              key={item.title}
              className={item.title === album.title ? 'selected' : ''}
              onClick={() => onAlbum(item)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <input
          aria-label="Search tracks and features"
          placeholder="SEARCH TRACK / FEATURE…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="track-heading">
          <span>TRACK / COLLABORATORS</span>
          <span>TIME</span>
        </div>

        {filtered.map(({ t, i }) => (
          <div className={`track ${track === i ? 'playing' : ''}`} key={i}>
            <button onClick={() => setTrack(i)}>
              <span className="track-num">
                {track === i ? (
                  <span className="equalizer">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : (
                  String(i + 1).padStart(2, '0')
                )}
              </span>
              <span className="track-title">
                {t.title}
                {t.features && <small>WITH {t.features}</small>}
              </span>
              <span>{t.duration}</span>
            </button>

            {track === i && (
              <motion.div
                className="track-detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
              >
                <p>PRODUCTION / {t.producer}</p>
                <small>Open full track on Spotify or YouTube</small>
                <div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://open.spotify.com/search/${encodeURIComponent(
                      `Seedhe Maut ${t.title}`,
                    )}`}
                  >
                    SPOTIFY ↗
                  </a>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                      `Seedhe Maut ${t.title}`,
                    )}`}
                  >
                    YOUTUBE ↗
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="empty">NO SIGNAL. TRY ANOTHER TRACK.</p>
        )}

        <a
          className="source-link"
          href={album.source}
          target="_blank"
          rel="noreferrer"
        >
          RELEASE SOURCE / CREDITS ↗
        </a>
      </motion.aside>
    </motion.div>
  );
}
