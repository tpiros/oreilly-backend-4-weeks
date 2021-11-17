// Taken from Deno docs (https://deno.land/std@0.113.0/examples/cat.ts)
import { copy } from 'https://deno.land/std/streams/conversion.ts';
const filenames = Deno.args;
for (const filename of filenames) {
  const file = await Deno.open(filename);
  await copy(file, Deno.stdout);
  file.close();
}
