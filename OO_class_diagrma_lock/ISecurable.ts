import { ILockable } from "./ILockable.ts";

export interface ISecurable {
    isSecure(): boolean;
    getComponents(): ILockable[];
    getName(): string;
}
