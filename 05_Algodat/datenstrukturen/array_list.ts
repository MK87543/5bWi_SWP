import { List } from "./List.ts";

export class ArrayList implements List {
    private items: number[] = [];

    add(value: number): void {
        this.items.push(value);
    }

    get(index: number): number {
        if (index < 0 || index >= this.items.length) {
            throw new RangeError("Index out of bounds");
        }

        return this.items[index];
    }

    delete(index: number): void {
        if (index < 0 || index >= this.items.length) {
            throw new RangeError("Index out of bounds");
        }
    }
}
