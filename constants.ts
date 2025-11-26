
import type { ToyStyle } from './types';
import { ToyStyleId } from './types';

export const TOY_STYLES: ToyStyle[] = [
  {
    id: ToyStyleId.Funko,
    name: 'Funko Pop',
    preview: 'https://picsum.photos/seed/funko/200',
    prompt: `
      Create a Funko Pop vinyl figure version of the subject with:
      - Oversized square head (approximately 40% of total height)
      - Large, round, solid black eyes with no pupils
      - A very small, simplified body and limbs
      - A signature round Funko display base
      - A glossy vinyl texture that catches light
      - Bold, vibrant color blocking
      - Thick black outlines on some features
    `,
  },
  {
    id: ToyStyleId.Lego,
    name: 'LEGO Minifigure',
    preview: 'https://picsum.photos/seed/lego/200',
    prompt: `
      Create a LEGO Minifigure version of the subject with:
      - A cylindrical head and classic LEGO geometric body parts
      - Claw-shaped C-hands
      - Classic yellow skin tone (unless the subject's identity requires otherwise)
      - Simple facial features in the LEGO style (dots for eyes, simple line for mouth)
      - Visible connection points and seams between body parts
      - A matte plastic texture
      - Overall geometric simplification of features
    `,
  },
  {
    id: ToyStyleId.Nendoroid,
    name: 'Nendoroid',
    preview: 'https://picsum.photos/seed/nendoroid/200',
    prompt: `
      Create a Japanese Nendoroid figure version of the subject with:
      - Chibi/super deformed proportions (head is about the same size as the body, 1:1 ratio)
      - Large, expressive anime-style eyes with detailed coloring and highlights
      - Cute, rounded facial features and a small mouth
      - Visible ball joints at articulation points (neck, shoulders, hips)
      - A small, circular, clear display base
      - A strong 'kawaii' (cute) aesthetic
      - Soft shading and highlights typical of anime figures
    `,
  },
  {
    id: ToyStyleId.ActionFigure,
    name: 'Action Figure',
    preview: 'https://picsum.photos/seed/action/200',
    prompt: `
      Create a hyper-realistic action figure version of the subject with:
      - Realistic but stylized proportions, often heroic or athletic
      - Multiple, clearly visible points of articulation (joints at elbows, knees, shoulders, etc.)
      - A detailed, textured plastic finish with different sheens (matte for cloth, semi-gloss for armor)
      - An intense, dynamic pose
      - Highly detailed sculpting for hair, clothing, and accessories
    `,
  },
  {
    id: ToyStyleId.Bearbrick,
    name: 'Bearbrick',
    preview: 'https://picsum.photos/seed/bearbrick/200',
    prompt: `
      Create a Bearbrick figure version of the subject with:
      - The iconic anthropomorphic bear shape with a cubic, geometric form
      - A distinct 9-part structure (head, torso, hips, arms, hands, legs)
      - A minimalist and smooth surface, perfect for designs
      - The subject's features and clothing adapted into a surface pattern or design on the Bearbrick shape
      - A high-gloss, polished finish
    `,
  },
  {
    id: ToyStyleId.PopMart,
    name: 'Pop Mart',
    preview: 'https://picsum.photos/seed/popmart/200',
    prompt: `
      Create a Pop Mart / Blind Box style figure version of the subject with:
      - Adorable, cute proportions with a slightly oversized head
      - A modern 'kawaii' aesthetic with whimsical or fantasy elements
      - A soft, harmonious pastel color palette
      - Cute, charming accessories and joyful expressions
      - A smooth, high-quality matte or semi-gloss finish, looking like a collectible art toy
    `,
  },
];
