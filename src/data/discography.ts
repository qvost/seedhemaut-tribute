export type Track = {
  title: string;
  features: string;
  producer: string;
  duration: string;
};

export type Album = {
  title: string;
  hindi: string;
  year: number;
  kind: string;
  cover: string;
  apple: string;
  label: string;
  tracks: Track[];
  source: string;
};

const appleArt = (path: string) =>
  `https://is1-ssl.mzstatic.com/image/thumb/${path}/800x800bb.jpg`;

const tracks = (list: string, producer = '—'): Track[] =>
  list.split('|').map((row) => {
    const [title, features = '', duration = '—'] = row.split('~');
    return { title, features, duration, producer };
  });

export const discography: Album[] = [
  {
    title: '2 Ka Pahada',
    hindi: '२ का पहाड़ा',
    year: 2017,
    kind: 'EP',
    label: 'Elements Agency India',
    apple: '1804720075',
    cover: appleArt('Music211/v4/4f/89/54/4f895409-a288-e473-0e14-1aafa783d65b/199066202494.jpg'),
    source: 'https://music.amazon.in/tracks/B0DZLBGZ47',
    tracks: tracks(
      'Seedhe Maut Anthem~~3:18|Royalty~~5:01|Classsikh Maut~Prabh Deep~3:13|Stay Calm~~1:44|Keh Chuka, Pt. 1~~2:59',
    ),
  },
  {
    title: 'Bayaan',
    hindi: 'बयान',
    year: 2018,
    kind: 'ALBUM',
    label: 'Azadi Records',
    apple: '1804729497',
    cover: appleArt('Music211/v4/6e/a2/1b/6ea21b60-3155-9aac-fdd8-0579af266a1c/199066651063.jpg'),
    source: 'https://seedhe-maut.bandcamp.com/album/bayaan',
    tracks: tracks(
      'Intro~~0:25|Shaktimaan~~3:05|Gehraiyaan~Vaksh~3:42|Uss Din~~3:02|Jolly (Skit)~~0:23|Meri Baggi~~3:18|Dehshat~~2:56|PNP~~3:01|Pankh~Bawari Basanti~3:47|EDOKDOG (Skit)~~0:37|Kyu~~5:08|Chalta Reh~~3:50',
      'Sez on the Beat',
    ),
  },
  {
    title: 'न',
    hindi: 'न',
    year: 2021,
    kind: 'MIXTAPE',
    label: 'Azadi Records',
    apple: '1804733505',
    cover: 'https://coverartarchive.org/release/d47b9ed1-d6ee-4e78-8e22-28ade6c1fc93/front-500',
    source: 'https://seedhe-maut.bandcamp.com/album/mixtape',
    tracks: tracks(
      'Namastute~~2:00|Naamcheen~~2:42|No Enema~Foreign Beggars / Sez on the Beat~4:42|Nanchaku~MC Stan~3:13|Nafrat~DJ Sa~2:44|Nazarbattu Freestyle~~2:28|Nawazuddin~~3:12|Na Jaye~~3:19|Nadaan~~3:28|Natkhat~~3:12',
    ),
  },
  {
    title: 'Nayaab',
    hindi: 'नायाब',
    year: 2022,
    kind: 'ALBUM',
    label: 'Azadi Records / The MVMNT',
    apple: '1804725962',
    cover: appleArt('Music211/v4/b8/41/71/b84171ff-de77-3505-af3d-41a5b8d37fc4/199066166178.jpg'),
    source: 'https://seedhe-maut.bandcamp.com/album/nayaab',
    tracks: tracks(
      'Nayaab~~2:07|Toh Kya~~3:00|Hoshiyaar~~3:13|Anaadi~~3:18|Dum Ghutte~~3:22|Maina~~3:48|Choti Soch~~2:08|Gandi Aulaad~~3:37|Khoj~~3:39|Kohra~~4:06|Jua~~2:41|Rajdhaani~~4:26|Chidiya Udd~~2:06|Batti~AB17~3:08|Teen Dost~~2:48|Marne Ke Baad Bhi…~~3:31',
      'Sez on the Beat',
    ),
  },
  {
    title: 'Lunch Break',
    hindi: 'लंच ब्रेक',
    year: 2023,
    kind: 'MIXTAPE',
    label: 'Azadi Records',
    apple: '1703238277',
    cover: 'https://resources.tidal.com/images/cc8254e0/93b5/43b2/bdf3/869180632101/1280x1280.jpg',
    source: 'https://seedhe-maut.bandcamp.com/album/lunch-break',
    tracks: tracks(
      "11K~~2:54|Sick & Proper~~2:07|Brand New~~2:19|Peace of Mind~~3:56|Pushpak Vimaan~Sonnyjim~3:12|Dikkat~~2:37|Kya Challa~~1:41|Fanne Khan~Yungsta~4:02|First Place~~1:58|Champions~~3:33|Baat Aisi Ghar Jaisi~~3:00|Naam Kaam Sheher~~2:46|Pain~~2:44|Hausla~~2:18|Lunch Break~~2:21|Asal G~Faris Shafi / Talal Qureshi~3:41|Swah!~Badshah~4:44|Focused Sedated~~2:55|Taakat~~2:36|Off Beat~~3:00|Luka Chippi~~2:21|Khauf~~3:02|I Don't Miss That Life~~2:54|Akatsuki~Raga~2:35|Khoon~Sikander Kahlon~2:45|W~~3:00|Joint in the Booth~~2:46|Khatta Flow~KR$NA~2:32|Kavi~~3:33|Kehna Chahte Hain…~~1:47",
    ),
  },
  {
    title: 'SHAKTI',
    hindi: 'शक्ति',
    year: 2024,
    kind: 'EP',
    label: 'DL91 Era',
    apple: '1762198505',
    cover: appleArt('Music221/v4/c5/54/3b/c5543b7a-68df-43c7-af19-de5bb20480ce/cover.jpg'),
    source: 'https://music.apple.com/in/album/shakti-ep/1762198505',
    tracks: tracks('Soyi Nahi|Raat Ki Rani|Naksha~~3:26|Khush Nahi'),
  },
  {
    title: 'Kshama',
    hindi: 'क्षमा',
    year: 2024,
    kind: 'ALBUM',
    label: 'DL91 Era',
    apple: '1784665627',
    cover: appleArt('Music221/v4/e7/b7/56/e7b75644-d761-43f0-d688-34d8e6ab4b41/8447053264881.jpg'),
    source: 'https://lnk.to/Kshama',
    tracks: tracks(
      'RED~Hisab~5:04|ICE~~2:40|Gourmet Shit!~Raftaar~3:31|Moon Comes Up~Badshah~5:00|Round 3~~2:57|Naraaz~~3:57|Brahamachari~Raga / GhAatak~3:34|Shakti Aur Kshama~~4:15',
    ),
  },
  {
    title: 'DL91 FM',
    hindi: 'दिल्ली ९१',
    year: 2025,
    kind: 'CREW MIXTAPE',
    label: 'DL91 Era',
    apple: '1812504728',
    cover: appleArt('Music221/v4/fe/14/c3/fe14c33d-0a5d-fe17-6a20-c4ff16df98fa/199350493379.jpg'),
    source: 'https://music.apple.com/in/album/dl91-fm/1812504728',
    tracks: tracks(
      'Capital Rap~Lil Bhavi~3:57|MP3~~2:51|KTMN~~2:36|Maar Kaat~Lil Bhavi~1:04|Kilas~Encore ABJ / OG Lucifer~3:26|Aadat~AB17~3:25|Banda Down~Bhaskar / AB17~3:37|Madira~~2:50|El Matador~Ghaatak~3:38|Pickup~OG Lucifer~2:45|Bas Jhut~~3:29|Rahat~~3:20|Wajah~Calm / OG Lucifer / Lil Bhavi~2:29|Akela~Ghaatak~5:02|DL91 FM~OG Lucifer / Ghaatak~4:16|Bechara~~3:14|Sike~AB17 / OG Lucifer~4:16|Barsaat~Calm / Bhaskar / AB17 / OG Lucifer~4:32|Guldasta~~3:12|Pancake~~2:42|Video Games~~3:39|Mud~Calm / OG Lucifer / Bhaskar~3:02|Abaad~Encore ABJ / Ghaatak~3:50|Dil Se~AB17~4:05|Dhoke~Lil Bhavi / Bhaskar~4:43|Bin Tere~Encore ABJ / Bhaskar~3:48|CD~OG Lucifer / Lil Bhavi / Bhaskar / AB17 / Ghaatak~2:36|Cha Chi~Calm / AB17 / Bhaskar / OG Lucifer~2:35|Addict~~3:00|Kehne Do~Bhaskar / Lil Bhavi~4:26',
    ),
  },
];

const trackProducers: Record<string, string> = {
  'Seedhe Maut Anthem': 'Sez on the Beat',
  'Classsikh Maut': 'Sez on the Beat',
  Namastute: 'Calm',
  'No Enema': 'Sez on the Beat',
  Nafrat: 'DJ Sa',
  Naksha: 'Calm · mix / master: Hurricane',
  'Shakti Aur Kshama': 'Calm',
};

for (const album of discography) {
  for (const track of album.tracks) {
    const credit = trackProducers[track.title];
    if (credit) {
      track.producer = credit;
    }
  }
}
