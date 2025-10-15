class Car {
    constructor(
        public manufacturer: string,
        public ps: number,
        public fuel: string,
        public owner?: string,
    ) {
    }

    getManufacturer(): string {
        return this.manufacturer;
    }

    getPs(): number {
        return this.ps;
    }

    setOwner(owner: string) {
        this.owner = owner;
    }

    getOwner() {
        return this.owner;
    }
}

class Owner {
    constructor(
        public firstname: string,
        public lastname: string,
        public age: number,
    ) {}

    getfirastname(): string {
        return this.firstname;
    }
}
