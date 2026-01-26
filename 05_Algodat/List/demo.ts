import { LinkedList } from "./LinkedList.ts";
import { List } from "./List.ts";

const list: List = new LinkedList();

list.add(5);
list.add(21);
list.add(11);

console.log(list.get(0));
console.log(list.get(1));
