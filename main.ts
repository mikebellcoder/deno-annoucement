import { walk } from "jsr:@std/fs@1.0.4";
import { relative } from "node:path";

/** recursively lists out files in a directory  */
export async function tree(dir: string): Promise<string[]> {
  const out = [];
  for await (const entry of walk(dir)) {
    if (entry.isDirectory) continue;
    out.push(relative(dir, entry.path));
  }
  return out;
}

if (import.meta.main) {
  const files = await tree(Deno.args[0]);
  console.log(files);
}
