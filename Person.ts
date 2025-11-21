export type PersonCsv = {
  id:string;
  first_name: string;
  last_name: string;
  middle_name: string;
  family_kanji: string;
  kanji: string;
  sex: string;
  father: string;
  mother: string;
  birth: string;
  spouse: string;
}

export enum Sex {
  Male = 'M',
  Female = 'F'
};

const addIfNotPresent = (someArray: number[], id:number) => {
  const i = someArray.indexOf(id);
  if (i === -1) someArray.push(id);
}

export class Person {
  id:number;
  firstName: string;
  lastName: string;
  middleName: string;
  kanji: string;
  family_kanji:string;
  sex: Sex;
  motherId: number;
  fatherId: number;
  children: number[];
  siblings: number[];
  spouses: number[];
  coparents: number[];

  constructor(csv: PersonCsv) {
    this.id = parseInt(csv.id, 10) || 0;
    this.firstName = csv.first_name;
    this.lastName = csv.last_name;
    this.middleName = csv.middle_name;
    this.kanji = csv.kanji;
    this.family_kanji = csv.family_kanji;
    this.sex = csv.sex.toUpperCase() === 'M' ? Sex.Male : Sex.Female;
    this.fatherId = parseInt(csv.father, 10) || -1;
    this.motherId = parseInt(csv.mother, 10) || -1;
    this.spouses = csv.spouse ? [parseInt(csv.spouse, 10)] : [];
    this.children = [];
    this.siblings = [];
    this.coparents = [];
  }

  addChild(id:number) {
    if (id !== this.id) {
      addIfNotPresent(this.children, id);
    }
  }

  addSibling(id:number) {
    if (id !== this.id) {
      addIfNotPresent(this.siblings, id);
    }
  }

  addCoparent(id:number) {
    if (id !== this.id && this.spouses.indexOf(id) === -1) {
      addIfNotPresent(this.coparents, id);
    }
  }

}