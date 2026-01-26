import { Node } from "./Node.ts";
import { List } from "./List.ts";

export class LinkedList implements List {
    private root: Node | null = null;

    add(value: number): void {
        const newNode = new Node(value);
        if (this.root == null) {
            this.root = newNode;
        } else {
            let current: Node = this.root;
            while (current.getNext() !== null) {
                current = current.getNext()!;
            }
            current.setNext(newNode);
        }
    }

    get(index: number): number {
        let current: Node | null = this.root;
        let currentIndex = 0;

        while (current !== null) {
            if (currentIndex === index) {
                return current.getValue();
            }
            current = current.getNext();
            currentIndex++;
        }

        throw new RangeError("Index out of bounds");
    }

    delete(value: number) {
        return "fuck";
    }
}
