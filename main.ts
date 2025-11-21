import { parse } from "@std/csv/parse";
import { People } from './People.ts';
import type { PersonCsv } from './Person.ts';

// open the CSV file as a stream
const input = await Deno.open("Yamasaki Family Tree.csv", { read: true });
const inputReader = input.readable.getReader();
const decoder = new TextDecoder();

// const output = await Deno.open("tree.json", {write:true});
// const outputWriter = output.writable.getWriter();

while (true) {
  const result = await inputReader.read();
  if (result.done) {
    break;
  }
  const peopleCsv = parse(decoder.decode(result.value), { skipFirstRow: true }) as PersonCsv[];
  const people = new People(peopleCsv);
  await Deno.writeTextFile("./output/people.json", JSON.stringify(people.list, null, 2));
}

