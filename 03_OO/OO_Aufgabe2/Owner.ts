export class Owner {
    constructor(
        public firstname: string,
        public lastname: string,
        public age: number,
    ) {}

    getfirastname(): string {
        return this.firstname;
    }

    setOwner(firstname: string, lastname: string, age: number) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
    }
}
