import { LockableBase } from "./LockableBase.ts";

export class Window extends LockableBase {
    constructor(name: string = "Window") {
        super(name);
    }
}
