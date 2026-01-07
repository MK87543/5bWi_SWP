import { ISecurable } from "./ISecurable.ts";
import { Door } from "./Door.ts";
import { ILockable } from "./ILockable.ts";

export class Car implements ISecurable {
    private doors: Door[] = [];

    constructor(public readonly model: string) {}

    addDoor(door: Door): void {
        this.doors.push(door);
    }

    isSecure(): boolean {
        return this.doors.every((door) => door.isLocked());
    }

    getComponents(): ILockable[] {
        return this.doors;
    }

    getName(): string {
        return `Car (${this.model})`;
    }
}
