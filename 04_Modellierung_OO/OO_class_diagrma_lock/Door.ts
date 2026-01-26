import { LockableBase } from "./LockableBase.ts";

export class Door extends LockableBase {
    constructor(name: string = "Door") {
        super(name);
    }
}
