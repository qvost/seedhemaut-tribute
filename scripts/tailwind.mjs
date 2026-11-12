import { compile } from 'tailwindcss';
import { writeFile } from 'node:fs/promises';

const compiler = await compile('@tailwind utilities;');
const css = compiler.build([
  'flex',
  'items-center',
  'justify-between',
  'sr-only',
  'focus:not-sr-only',
]);

await writeFile('src/tailwind.generated.css', css);
