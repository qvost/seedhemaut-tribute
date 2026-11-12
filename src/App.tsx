import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { discography, type Album } from './data/discography';
import { duo, photos } from './data/duo';
import { engineering, studios } from './data/studios';
import { AlbumImage } from './components/AlbumImage';
import { AlbumDrawer } from './components/AlbumDrawer';

gsap.registerPlugin(ScrollTrigger);

const links = [
  ['Official site', 'https://www.seedhemaut.com/'],
  ['MAAL ↗', 'https://maal.seedhemaut.com/'],
  ['SMX tour ↗', 'https://www.seedhemaut.com/'],
  ['SMN community ↗', 'https://www.seedhemaut.com/'],
  ['Spotify ↗', 'https://open.spotify.com/artist/2oBG74gAocPMFv6Ij9ykdo'],
  ['Apple Music ↗', 'https://music.apple.com/in/artist/seedhe-maut/1246145582'],
  ['YouTube ↗', 'https://www.youtube.com/@SeedheMaut'],
  ['Instagram ↗', 'https://www.instagram.com/seedhemaut/'],
];

const chapters = [
  ['duo', 'THE DUO'],
  ['discography', 'DISCOGRAPHY'],
  ['studios', 'COLLABORATORS'],
  ['world', 'SMX & MAAL'],
];

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState(true);
  const [photo, setPhoto] = useState(0);
  const [active, setActive] = useState(3);
  const [album, setAlbum] = useState<Album | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let disposed = false;
    let cleanup = () => {};

    void import('lenis')
      .then(({ default: Lenis }) => {
        if (disposed) return;
        const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        cleanup = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      })
      .catch(() => {});

    return () => {
      disposed = true;
      cleanup();
    };
  }, [reduced]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.from('.hero-title span', {
        y: 140,
        opacity: 0,
        stagger: 0.16,
        duration: 1.2,
        ease: 'power4.out',
      });

      gsap.to('.hero-photo', {
        y: 100,
        rotate: 5,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero-title', {
        y: -85,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.from('.duo-column:first-child', {
        xPercent: -25,
        scrollTrigger: {
          trigger: '.duo',
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        },
      });

      gsap.from('.duo-column:last-child', {
        xPercent: 25,
        scrollTrigger: {
          trigger: '.duo',
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        },
      });

      gsap.from('.curtain span', {
        yPercent: 120,
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.curtain',
          start: 'top 80%',
          end: 'bottom 50%',
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>('.studio-row').forEach((el) =>
        gsap.fromTo(
          el,
          { opacity: 0.22 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 75%',
              end: 'top 45%',
              scrub: true,
            },
          },
        ),
      );

      ScrollTrigger.create({
        trigger: '.archive',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) =>
          setActive(Math.min(7, Math.floor(self.progress * 8))),
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    document.body.style.overflow = menu || album ? 'hidden' : '';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menu, album]);

  return (
    <div
      ref={root}
      className={`${mode ? 'maut-mode' : ''} ${reduced ? 'reduced' : ''}`}
    >
      <div className="grain" />
      <a className="sr-only focus:not-sr-only" href="#duo">
        Skip to the duo
      </a>

      <header className="flex items-center justify-between">
        <a href="#" className="brand">
          SEEDHE <span>✦</span> MAUT
        </a>
        <button
          className="menu-button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
        >
          {menu ? 'CLOSE' : 'MENU'} <span>{menu ? '×' : '☰'}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-topline">
          <span>NEW DELHI, INDIA</span>
          <span>28.6139° N, 77.2090° E</span>
        </div>

        <div className="ghost">सीधे मौत</div>

        <div className="hero-title">
          <span>SEEDHE</span>
          <span>
            MAUT<span className="title-star">✳</span>
          </span>
        </div>

        <motion.button
          className="hero-photo"
          aria-label="Cycle live photographs of Seedhe Maut"
          onClick={() => setPhoto((photo + 1) % photos.length)}
          onPointerMove={(e) => {
            if (reduced) return;
            const r = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty(
              '--rx',
              `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`,
            );
            e.currentTarget.style.setProperty(
              '--ry',
              `${((e.clientX - r.left) / r.width - 0.5) * 12}deg`,
            );
          }}
          onPointerLeave={(e) => {
            e.currentTarget.style.setProperty('--rx', '0deg');
            e.currentTarget.style.setProperty('--ry', '0deg');
          }}
        >
          <img
            src={photos[photo]}
            alt="Calm and Encore ABJ performing live"
          />
          <div className="photo-caption">
            <span>CALM × ENCORE ABJ</span>
          </div>
          <span className="photo-index">0{photo + 1} / 03</span>
        </motion.button>

        <div className="hero-side">
          <span>TERA BHAI SEEDHE MAUT.</span>
        </div>

        <a href="#duo" className="scroll-hint">
          SCROLL TO ENTER <span>↓</span>
        </a>

        <div className="hero-bottom">
          <div className="stamps">
            <b>SMN</b>
            <b>✳</b>
            <b>▣</b>
            <b>
              DL
              <br />
              91
            </b>
            <b className="advisory">
              PARENTAL
              <br />
              ADVISORY
            </b>
          </div>
          <span>DL91 ERA / NEW DELHI · 2017–2026</span>
          <button onClick={() => setMode(!mode)} aria-pressed={mode}>
            <i className={mode ? 'on' : ''} /> MAUT MODE: {mode ? 'ON' : 'OFF'}
          </button>
        </div>
      </section>

      <div className="ticker">
        <div>
          सीधे मौत ✳ SEEDHE MAUT ✳ सीधे मौत ✳ SEEDHE MAUT ✳{' '}
        </div>
      </div>

      <section className="duo section-pad" id="duo">
        <div className="duo-grid">
          {duo.map((member, i) => (
            <article className="duo-column" key={member.name}>
              <div className={`photo-stream stream-${i}`}>
                <div>
                  {[...photos, ...photos].map((src, j) => (
                    <img
                      key={j}
                      src={src}
                      alt={`${member.name} and Seedhe Maut on stage`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
              <div className="duo-copy">
                <small>{member.tag}</small>
                <h2>{member.name}</h2>
                <span>{member.real}</span>
                <div className="bio">
                  <p>{member.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="duo-end">
          दो नाम। एक आवाज़।
        </p>
      </section>

      <section className="archive" id="discography">
        <div className="archive-sticky">
          <div className="archive-title">
            <h2>DISCOGRAPHY</h2>
          </div>

          <div className="arc">
            {discography.map((item, i) => {
              const distance = i - active;
              return (
                <button
                  key={item.title}
                  className={`sleeve ${i === active ? 'active' : ''}`}
                  style={
                    {
                      '--distance': distance,
                      zIndex: 10 - Math.abs(distance),
                      transform: `translateX(calc(-50% + ${distance * 230}px)) translateY(${Math.abs(distance) * Math.abs(distance) * 28}px) rotate(${distance * 12}deg) scale(${Math.max(0.5, 1 - Math.abs(distance) * 0.13)})`,
                    } as React.CSSProperties
                  }
                  onClick={() => {
                    setActive(i);
                    setAlbum(item);
                  }}
                  aria-label={`Open ${item.title} tracklist`}
                >
                  <div className="vinyl" />
                  <AlbumImage album={item} />
                  <span className="sleeve-label">
                    {item.year} / {item.kind} <b>OPEN ↗</b>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="album-current">
            <span>0{active + 1} / 08</span>
            <h3>{discography[active]?.title}</h3>
            <div>
              <button
                onClick={() => setActive((active + 7) % 8)}
                aria-label="Previous album"
              >
                ←
              </button>
              <button
                onClick={() => setActive((active + 1) % 8)}
                aria-label="Next album"
              >
                →
              </button>
            </div>
          </div>

          <div className="album-tabs">
            {discography.map((item, i) => (
              <button
                key={item.title}
                className={i === active ? 'selected' : ''}
                onClick={() => setActive(i)}
              >
                {item.year}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="curtain">
        <span>सीधे मौत</span>
      </section>

      <section className="studios section-pad" id="studios">
        {[...studios, engineering].map((studio) => (
          <article className="studio-row" key={studio.name}>
            <div>
              <small>{studio.type}</small>
              <h2>{studio.name}</h2>
              <p>{studio.note}</p>
            </div>
            <span className="studio-era">{studio.era} ↗</span>
          </article>
        ))}
      </section>

      <section id="world" className="world section-pad">
        <a
          href="https://www.seedhemaut.com/"
          target="_blank"
          rel="noreferrer"
        >
          <h2>SMX <em>WORLD TOUR</em> ↗</h2>
          <p>Tour dates &amp; updates</p>
        </a>

        <a
          href="https://maal.seedhemaut.com/"
          target="_blank"
          rel="noreferrer"
          className="maal"
        >
          <span>MERCH</span>
          <b>MAAL ↗</b>
        </a>
      </section>

      <footer className="section-pad">
        <div className="section-label">
          <span>SEEDHE MAUT NATION</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>

        <div className="footer-title">
          SEEDHE MAUT<span>सीधे मौत</span>
        </div>

        <div className="footer-links">
          {links.map(([label, url]) => (
            <a key={label} href={url} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>

        <div className="footer-bottom">
          <span>28.6139° N, 77.2090° E · DL91</span>
          <span>INDEPENDENT FAN TRIBUTE / NOT AN OFFICIAL SITE</span>
        </div>
      </footer>

      <AnimatePresence>
        {menu && (
          <motion.nav
            className="menu-overlay"
            aria-label="Main navigation"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
          >
            {chapters.map(([id, title]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenu(false)}
              >
                {title}
                <b>↗</b>
              </a>
            ))}
          </motion.nav>
        )}

        {album && (
          <AlbumDrawer
            album={album}
            onClose={() => setAlbum(null)}
            onAlbum={setAlbum}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
