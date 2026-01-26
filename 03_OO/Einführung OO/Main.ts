import { Car } from './Car.ts';
import { Engine } from './Engine.ts';


let car:Car = new Car("i3","bmw", new Engine(100));

console.log(car.getColor());
console.log(car.getMake())
console.log(car.getHorsePower())
