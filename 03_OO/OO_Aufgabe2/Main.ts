import { Engine } from "./Engine.ts";
import { Owner } from "./Owner.ts";
import { Car } from "./Car.ts";

class Main {
    public outoput(): void {
        const owner = new Owner("Vali", "Gächter", 18);
        const engine = new Engine("Mclaren 720S", 720, "Superbenzin");
        const car = new Car(engine, owner);

        const owner1 = new Owner("Vächter", "Gali", 18);
        const engine1 = new Engine("Renault twingo", 80, "Racketentreibstoff");
        const car1 = new Car(engine1, owner1);

        console.log(car.getCar());
        console.log(car1.getCar());
    }
}

const main = new Main();
main.outoput();
