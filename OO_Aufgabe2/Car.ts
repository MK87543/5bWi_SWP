import { Engine } from "./Engine.ts";
import { Owner } from "./Owner.ts";

export class Car {
    constructor(public engine: Engine, public owner: Owner) {}

    getCar(): string {
        return `${this.engine.getEngine()} | Owner: ${this.owner.firstname} ${this.owner.lastname} (${this.owner.age})`;
    }
}
