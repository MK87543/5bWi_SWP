import { LinkedList } from "./LinkedList.ts";
import { List } from "./List.ts";
import { ArrayList } from "./array_list.ts";
import { Queue } from "./Queue.ts";
import { Stack } from "./Stack.ts";

const list: List = new ArrayList();

list.add(5);
list.add(21);
list.add(11);

console.log(list.get(0));
console.log(list.get(1));

const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
console.log(queue.dequeue());
//erster wert kommt wieder als erster raus

const stack = new Stack();
stack.push(100);
stack.push(200);
console.log(stack.pop());
//letzter wert kommt als erster raus
