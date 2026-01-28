export class Queue<items> {
    private items: items[] = [];

    enqueue(value: items): void {
        this.items.push(value);
    }

    dequeue(): items | undefined {
        if (this.items.length === 0) {
            throw new Error("Queue is empty");
        }
        return this.items.shift();
    }
}
