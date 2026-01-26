export interface ILockable {
    readonly id: string;
    readonly name: string;
    lock(): void;
    unlock(): void;
    isLocked(): boolean;
}
