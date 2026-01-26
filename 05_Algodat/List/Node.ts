export class Node {
    value: number;
    next: Node | null;

    constructor(value: number) {
        this.value = value;
        this.next = null;
    }

    getValue(): number {
        return this.value;
    }

    getNext(): Node | null {
        return this.next;
    }

    setNext(node: Node | null): void {
        this.next = node;
    }
}
