import { PersonCsv, Person } from './Person.ts';

export class People {
  list:Person[] = [];

  constructor(people: PersonCsv[]) {
    people.forEach(item => {
      this.list.push(new Person(item));
    })

    this.assignChildren();
    this.assignSiblings();
    this.assignCoparents();
  }

  assignChildren() {
    this.list.forEach(person => {
      const father = person.fatherId;
      if (father > 1) {
        this.list[father - 2].addChild(person.id);
      }
      const mother = person.motherId;
      if (mother > 1) {
        this.list[mother - 2].addChild(person.id);
      }
    })
  }

  assignSiblings() {
    this.list.forEach(person => {
      const father = person.fatherId;
      if (father > 1) {
        this.list[father - 2].children.forEach(childId => {
          if (childId !== person.id)
            person.addSibling(childId);
        })
      }
      const mother = person.motherId;
      if (mother > 1) {
        this.list[mother - 2].children.forEach(childId => {
          if (childId !== person.id)
            person.addSibling(childId);
        })
      }
    })
  }

  // assign shared parents as coparents
  assignCoparents() {
    this.list.forEach(person => {
      const father = person.fatherId;
      const mother = person.motherId;
      if (father > 1 && mother > 1) {
        this.list[mother-2].addCoparent(father);
        this.list[father-2].addCoparent(mother);
      }
    })
  }
  
  getList() {
    return this.list;
  }
  
  getPerson(id: number) {
    return this.list[id-2];
  }
}
