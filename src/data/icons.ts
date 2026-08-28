import type { DesktopIconData } from '../types';
import discoMainImg from '../assets/desktop/disco-main.jpg';
import discoMockupImg from '../assets/desktop/disco-mockup.jpg';
import discoBoothImg from '../assets/desktop/disco-booth.jpg';
import discoMapImg from '../assets/desktop/disco-map.jpg';
import discoPolishImg from '../assets/desktop/disco-polish.jpg';
import atonementImg from '../assets/desktop/atonement.jpg';
import atonementMockupImg from '../assets/desktop/atonement-mockup.jpg';
import atonementRawImg from '../assets/desktop/atonement-raw.jpg';
import herImg from '../assets/desktop/her.jpg';
import herMockupImg from '../assets/desktop/her-mockup.jpg';
import herRawImg from '../assets/desktop/her-raw.jpg';
import photostripImg from '../assets/desktop/photostrip.jpg';
import figImg from '../assets/desktop/fig.jpg';
import artImg from '../assets/desktop/art.jpg';
import weirdImg from '../assets/desktop/weird.jpg';
import tourReelImg from '../assets/desktop/tour-reel.jpg';
import sessionTapeImg from '../assets/desktop/session-tape.jpg';
import zineCoverImg from '../assets/desktop/zine-cover.jpg';

export const desktopIcons: DesktopIconData[] = [
  {
    id: 'love-song-sad',
    label: 'Weird',
    kind: 'music',
    shape: 'photo',
    glyph: '♫',
    accent: '#8a6b4f',
    accent2: '#5c4636',
    image: weirdImg,
    x: 34,
    y: 27,
    content: {
      eyebrow: 'Illustration',
      subtitle: 'Creative Process',
      body: [
        'This illustration explores the contrast between individuality and social acceptance. It is inspired by the idea that what is now considered acceptable as whimsical was once simply considered weird.',
        'The illustration also carries another interpretation. We often judge others for openly embracing the things we ourselves love but choose to hide in order to fit into society. It explores the tension between wanting to express who we truly are and the fear of being perceived as strange for doing so.',
      ],
    },
  },
  {
    id: 'stage-visuals',
    label: 'Stage Visuals',
    kind: 'video',
    shape: 'landscape',
    glyph: '▶',
    accent: '#2b2b2e',
    accent2: '#151517',
    x: 55,
    y: 28,
    content: {
      eyebrow: 'Live Visuals · Motion',
      subtitle: 'Add tour name, venue, or year here.',
      body: [
        'Placeholder description for the stage visuals project. This is a good spot to describe the brief, tools used (After Effects, Notch, TouchDesigner, etc.), and the outcome.',
      ],
      showVideo: true,
      linkLabel: 'Watch the reel',
    },
  },
  {
    id: 'trasa-konca-swiata',
    label: 'Atonement',
    kind: 'document',
    shape: 'poster',
    glyph: '✦',
    accent: '#b98b8f',
    accent2: '#7a4b52',
    image: atonementImg,
    x: 59,
    y: 66,
    content: {
      eyebrow: 'Graphic Design',
      subtitle: 'Creative Process',
      body: [
        'I designed this poster to reflect both the setting and emotional atmosphere of Atonement. The paper doilies reference the tea scene between the main characters. The deep green background references the film’s natural settings and visual palette, while also connecting to Robbie’s military uniform and Cecilia’s iconic green dress. Purple and pink tones represent melancholy, yearning and love, while the yellow highlights represent a sense of hope.',
        'Finally, I chose a dramatic cursive typeface to evoke the film’s 1930s setting and its connection to storytelling, particularly through Briony, whose role as a writer shapes the narrative. Together, these elements create a visual representation of the film’s themes.',
      ],
      sections: [
        { heading: 'Mock up', image: atonementMockupImg },
        { heading: 'Raw', image: atonementRawImg },
      ],
    },
  },
  {
    id: 'wtf',
    label: 'Photo strip',
    kind: 'music',
    shape: 'strip',
    glyph: '♫',
    accent: '#c7883a',
    accent2: '#8a5a1f',
    image: photostripImg,
    notOpenable: true,
    hideLabel: true,
    x: 30,
    y: 45,
    content: {
      eyebrow: 'Single · Artwork',
      subtitle: 'Add a release date or credit line here.',
      body: [
        'Placeholder write-up for “WTF.” Describe the concept behind the artwork and any campaign around the release.',
      ],
      linkLabel: 'Listen to the track',
    },
  },
  {
    id: 'pierwszy-swag',
    label: 'HER',
    kind: 'document',
    shape: 'poster',
    glyph: '✎',
    accent: '#d94f6a',
    accent2: '#8f2f45',
    image: herImg,
    x: 48,
    y: 35,
    content: {
      eyebrow: 'Graphic Design',
      subtitle: 'Creative Process',
      body: [
        'This is an autobiography book cover, I chose a grunge-inspired visual style to reflect the writing style of the book as well as the complexity and fragmentation of Taylor Swift’s public image. The portrait is constructed from incomplete sections, representing how the media and public often form narratives around her from partial information, speculation, and isolated moments rather than the full story, which gives us an incomplete view of who she really is.',
        'Instead of using her name as the title, I chose HER. This reflects the way Taylor is often referred to through labels and narratives created by others, whether by the fans or critics. The contrast in colouring also represents the stark difference between her public persona and the person behind it.',
      ],
      sections: [
        { heading: 'Mock up', image: herMockupImg },
        { heading: 'Raw', image: herRawImg },
      ],
    },
  },
  {
    id: 'mafija-vinyl',
    label: 'Art',
    kind: 'product',
    shape: 'photo',
    glyph: '◍',
    accent: '#3c3f6b',
    accent2: '#20223f',
    image: artImg,
    x: 42,
    y: 53,
    content: {
      eyebrow: 'Illustration',
      subtitle: 'Creative Process',
      body: [
        'This drawing was made as motivation for other artists to keep making art even if it is imperfect, especially in this age of AI.',
      ],
      linkLabel: 'View post',
      linkHref: 'https://www.instagram.com/p/DbkrSejBSJH/?igsi=MXZ0bm1nYmV4bWV1MA==',
    },
  },
  {
    id: 'to-nie-pop',
    label: 'Fig',
    kind: 'music',
    shape: 'photo',
    glyph: '♫',
    accent: '#a23b3b',
    accent2: '#601f1f',
    image: figImg,
    x: 38,
    y: 41,
    content: {
      eyebrow: 'Illustration',
      subtitle: 'Creative Process',
      body: [
        'This piece is inspired by the fig tree analogy in The Bell Jar, where the figs represent different possibilities and choices in life.',
        'My interpretation is that by becoming the tree, the individual is no longer limited to choosing between a fixed number of possibilities. The ability to grow, create, and pursue new opportunities comes from within.',
      ],
    },
  },
  {
    id: 'disco',
    label: 'Disco Occasionally',
    kind: 'product',
    shape: 'poster',
    glyph: '♫',
    accent: '#e85fa8',
    accent2: '#9b2f6d',
    image: discoMainImg,
    x: 71,
    y: 51,
    content: {
      eyebrow: 'Graphic Design, Marketing Strategy, Event Planning',
      subtitle: 'Mock Campaign',
      body: [
        'A global pre-release campaign designed to build anticipation for the album Kiss All the Time. Disco, Occasionally.',
        'The campaign introduces a series of unexpected disco experiences across major cities in Europe and the US. Rather than announcing every activation in advance, the discos appear without a predictable schedule and in locations where a disco would not normally be expected. Eg: a cafe, a library, a corporate building etc.',
        'The unpredictability becomes a central part of the campaign, encouraging fans to follow clues, share discoveries and speculate about where the experience will appear next. This helps to build strong bonds between the fans and the artist, serving into the tagline “We belong together.”',
      ],
      sections: [
        { heading: 'Mock up', image: discoMockupImg },
        {
          heading: 'The Telephone Booths',
          image: discoBoothImg,
          body: [
            "Pink British telephone booths are placed throughout participating cities as part of the campaign's discovery element.",
            'Fans can pick up the receiver to hear exclusive fragments connected to the upcoming album. Each booth reveals something different, including short instrumentals, lyrics, voice recordings or the clue for the next disco’s location.',
            'This encourages fans to visit multiple locations and share their discoveries online, collectively piecing together fragments of the album before its release.',
          ],
        },
        {
          heading: 'The Disco Map',
          image: discoMapImg,
          body: [
            'A dedicated digital platform allows fans to track the campaign across different cities.',
            'The map records locations where the disco has already appeared while keeping future locations hidden. Fans can unlock information about upcoming activations by solving clues released through social media and physical installations.',
            'As the campaign progresses, more locations are revealed, creating an interactive record of the album rollout across the world.',
          ],
        },
        {
          heading: 'The Pleasing Pop-Up',
          image: discoPolishImg,
          body: [
            'Selected disco locations include a Pleasing pop-up featuring a limited-edition nail polish inspired by the album.',
            "The collection uses shades and finishes influenced by the campaign's disco aesthetic, including metallic pinks, chrome, glittery blue and solid black.",
            'The pop-up extends the album experience into a physical product, allowing fans to interact with and purchase a limited-edition piece connected to the campaign.',
          ],
        },
      ],
    },
  },
  {
    id: 'solar-bialas',
    label: 'Solar x Białas',
    kind: 'collab',
    shape: 'landscape',
    glyph: '✧',
    accent: '#d3a23a',
    accent2: '#8c661f',
    x: 68,
    y: 67,
    content: {
      eyebrow: 'Collaboration · Campaign',
      subtitle: 'Add partner name and campaign scope here.',
      body: [
        'Placeholder description of the collaboration - partners involved, campaign goals, and deliverables.',
      ],
      showImageGrid: true,
    },
  },
  {
    id: 'interludium',
    label: 'Interludium',
    kind: 'music',
    shape: 'square',
    glyph: '♫',
    accent: '#405c53',
    accent2: '#22332d',
    x: 36,
    y: 61,
    content: {
      eyebrow: 'EP · Artwork',
      subtitle: 'Add track list or release date here.',
      body: [
        'Placeholder write-up for “Interludium.” Describe the concept, the artwork direction, and your role.',
      ],
      linkLabel: 'Listen to the EP',
    },
  },
  {
    id: 'new-single',
    label: 'New Single',
    kind: 'music',
    shape: 'square',
    glyph: '♪',
    accent: '#6b4c8a',
    accent2: '#3d2b52',
    x: 63,
    y: 32,
    content: {
      eyebrow: 'Single · Cover Art',
      subtitle: 'Add a release date or credit line here.',
      body: [
        'Placeholder write-up for “New Single.” Swap this copy for the real story behind the release.',
      ],
      linkLabel: 'Listen to the track',
    },
  },
  {
    id: 'tour-reel',
    label: 'Lyrics Animation',
    kind: 'video',
    shape: 'square',
    glyph: '▶',
    accent: '#8a4c4c',
    accent2: '#522b2b',
    image: tourReelImg,
    tileSize: { w: 71, h: 118 },
    x: 69,
    y: 26,
    content: {
      eyebrow: 'Illustration, Animation',
      subtitle: 'Content Creation',
      body: ['Generated 2.2M+ views and 169K+ likes'],
      linkLabel: 'View post',
      linkHref: 'https://www.instagram.com/reel/DapFw-XBDTD/?igsi=aGU0NjR6NnFkYjg=',
    },
  },
  {
    id: 'zine-cover',
    label: 'Rigged Animation',
    kind: 'document',
    shape: 'square',
    glyph: '✦',
    accent: '#4c6b8a',
    accent2: '#2b3d52',
    image: zineCoverImg,
    tileSize: { w: 100, h: 75 },
    x: 61,
    y: 47,
    content: {
      eyebrow: 'Illustration, Animation',
      subtitle: 'Content Creation',
      body: ['Generated 2.8M+ views and 231K+ likes'],
      linkLabel: 'View post',
      linkHref: 'https://www.instagram.com/reel/Da7xMeZhlHH/?igsi=bDhsMGlmZTV2b2dx',
    },
  },
  {
    id: 'merch-drop',
    label: 'Merch Drop',
    kind: 'product',
    shape: 'square',
    glyph: '◍',
    accent: '#8a7c4c',
    accent2: '#52472b',
    x: 50,
    y: 52,
    content: {
      eyebrow: 'Product Design · Packaging',
      subtitle: 'Add manufacturing or drop details here.',
      body: [
        'Placeholder description for the merch drop - materials, print finish, and unboxing details.',
      ],
      showImageGrid: true,
      linkLabel: 'Shop the drop',
    },
  },
  {
    id: 'session-tape',
    label: 'Viral',
    kind: 'collab',
    shape: 'square',
    glyph: '✧',
    accent: '#4c8a6b',
    accent2: '#2b523d',
    image: sessionTapeImg,
    tileSize: { w: 100, h: 79 },
    x: 42,
    y: 21,
    content: {
      eyebrow: 'Illustration, Animation',
      subtitle: 'Content Creation',
      body: ['Generated 11M+ views and 718K+ likes'],
      linkLabel: 'View post',
      linkHref: 'https://www.instagram.com/reel/DbaHxZ-B6w-/?igsi=MWQ4bmNwdjZ5dXJ6bw==',
    },
  },
  {
    id: 'b-sides',
    label: 'B-Sides',
    kind: 'music',
    shape: 'square',
    glyph: '♫',
    accent: '#8a4c6b',
    accent2: '#522b3d',
    x: 46,
    y: 67,
    content: {
      eyebrow: 'EP · Artwork',
      subtitle: 'Add track list or release date here.',
      body: [
        'Placeholder write-up for “B-Sides.” Describe the concept, the artwork direction, and your role.',
      ],
      linkLabel: 'Listen to the EP',
    },
  },
];
