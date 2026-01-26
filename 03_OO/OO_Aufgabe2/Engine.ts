import { Owner } from "./Owner.ts";

export class Engine {
    constructor(
        public manufacturer: string,
        public ps: number,
        public fuel: string,
    ) {
    }

    getManufacturer(): string {
        return this.manufacturer;
    }

    getPs(): number {
        return this.ps;
    }

    getEngine(): string {
        return ` Car: ${this.manufacturer}, ${this.ps} PS, ${this.fuel}`;
    }
}
