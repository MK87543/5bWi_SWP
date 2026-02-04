export class Stack<items> {
    private items: items[] = [];

    push(value: items): void {
        this.items.push(value);
    }

    pop(): items | undefined {
        if (this.items.length === 0) {
            throw new Error("Stack is empty");
        }
        return this.items.pop();
    }
}
