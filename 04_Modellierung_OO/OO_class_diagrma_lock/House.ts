import { ISecurable } from "./ISecurable.ts";
import { Door } from "./Door.ts";
import { Window } from "./Window.ts";
import { ILockable } from "./ILockable.ts";

export class House implements ISecurable {
    private doors: Door[] = [];
    private windows: Window[] = [];

    constructor(public readonly address: string) {}

    addDoor(door: Door): void {
        this.doors.push(door);
    }

    addWindow(window: Window): void {
        this.windows.push(window);
    }

    isSecure(): boolean {
        const doorsSecure = this.doors.every((door) => door.isLocked());
        const windowsSecure = this.windows.every((window) => window.isLocked());
        return doorsSecure && windowsSecure;
    }

    getComponents(): ILockable[] {
        return [...this.doors, ...this.windows];
    }

    getName(): string {
        return `House at ${this.address}`;
    }
}
