import { useState } from 'react';
import type { Album } from '../data/discography';

export function AlbumImage({ album }: { album: Album }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="art-fallback">
        <span>SEEDHE MAUT</span>
        <b>{album.hindi}</b>
        <small>
          {album.title} / {album.year}
        </small>
        <small>Artwork unavailable · open source ↗</small>
      </div>
    );
  }

  return (
    <img
      src={album.cover}
      alt={`${album.title} official cover`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
