import { ILockable } from "./ILockable.ts";

export abstract class LockableBase implements ILockable {
    readonly id: string;

    constructor(public readonly name: string) {
        this.id = crypto.randomUUID();
    }

    private _isLocked: boolean = false;

    lock(): void {
        this._isLocked = true;
        console.log(`🔒 [${this.name}] has been LOCKED.`);
    }

    unlock(): void {
        this._isLocked = false;
        console.log(`🔓 [${this.name}] has been UNLOCKED.`);
    }

    isLocked(): boolean {
        return this._isLocked;
    }
}
