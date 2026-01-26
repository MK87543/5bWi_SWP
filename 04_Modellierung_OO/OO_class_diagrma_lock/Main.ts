import { Car } from "./Car.ts";
import { House } from "./House.ts";
import { Door } from "./Door.ts";
import { Window } from "./Window.ts";
import { SecurityService } from "./SecurityService.ts";

const service = new SecurityService();

// Test Car
console.log("\n========================================");
console.log("       🚗  VEHICLE SECURITY TEST       ");
console.log("========================================");
const myCar = new Car("Tesla Model S");
const carDoor1 = new Door("Driver Door");
const carDoor2 = new Door("Passenger Door");

myCar.addDoor(carDoor1);
myCar.addDoor(carDoor2);

service.checkSecurity(myCar);

console.log("\n[Action] Locking all car doors...");
carDoor1.lock();
carDoor2.lock();

service.checkSecurity(myCar);

// Test House
console.log("\n========================================");
console.log("       🏠  HOME SECURITY TEST          ");
console.log("========================================");
const myHouse = new House("123 Cyber Lane");
const houseDoor = new Door("Front Door");
const houseWindow = new Window("Kitchen Window");

myHouse.addDoor(houseDoor);
myHouse.addWindow(houseWindow);

service.checkSecurity(myHouse);

console.log("\n[Action] Locking house door and window...");
houseDoor.lock();
houseWindow.lock();

service.checkSecurity(myHouse);
