


interface Car {
    brand: string;
    model: string;
    price: number;
    year: number;
}

// Sample data
const cars: Car[] = [
  { brand: "BMW", model: "X5", price: 65000, year: 2023 },
  { brand: "Audi", model: "A4", price: 45000, year: 2022 },
  { brand: "Mercedes", model: "C-Class", price: 52000, year: 2023 },
  { brand: "Volkswagen", model: "Golf", price: 28000, year: 2021 },
  { brand: "Tesla", model: "Model 3", price: 48000, year: 2023 },
  { brand: "Porsche", model: "911", price: 120000, year: 2024 },
  { brand: "Toyota", model: "Corolla", price: 25000, year: 2022 },
  { brand: "Ford", model: "Mustang", price: 55000, year: 2023 }
];

function getTotalPrice(cars:Car[]): number {
    let totalprice:number = 0;
    cars.forEach(car => {
        totalprice += car.price;
    });
    return totalprice;
}



function printCars(cars: Car[]) : void{
    cars.forEach(car => {
    console.log(`Marke:  ${car.brand} Modell:  ${car.model}  Preis: ${car.price} Jahr:  ${car.year}`)
    });

}


function getExpensiveCars(cars: Car[], minPrice:number): Car[] {
    let foundCars:Array<Car> = [];

    cars.forEach(element => {
        if(element.price >= minPrice){
            foundCars.push(element);
        }        
    });

    return foundCars;
}

console.log("------------=========== Version 1 mit ForEach Schleifen =========--------------------------------")
let Price:number= getTotalPrice(cars);
console.log("Gesamter Preis aller AUtos: "+ Price)


console.log("-----------------------alle Autos------------------------------------------------------------------------")
printCars(cars);
console.log("------------------------------------------------------------------------------------------------")



let expensiveCars:Array<Car>= getExpensiveCars(cars, 50000);
console.log("Alle gefundenen Autos: ")
printCars(expensiveCars)   
console.log("------------------------------------------------------------------------------------------------")


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getTotalPriceR(cars:Car[]): number {
   return cars.reduce((total,car) => total + car.price,0)
}



function printCarsR(cars: Car[]): void {
    const output = cars.reduce((result, car) => 
        result + `Marke: ${car.brand} Modell: ${car.model}  Preis: ${car.price} € Jahr: ${car.year}\n`, 
        ""
    );
    console.log(output);
}

function getExpensiveCarsR(cars: Car[], minPrice:number): Car[] {
    return cars.filter(car => car.price >= minPrice);
}

console.log("----------------========= Version 2 mit Filter und Reduce =========-------------------------------")
let Price2:number= getTotalPriceR(cars);
console.log("Gesamter Preis aller AUtos"+ Price2)


console.log("-----------------------alle Autos------------------------------------------------------------------------")
printCarsR(cars);
console.log("------------------------------------------------------------------------------------------------")



let expensiveCars2:Array<Car>= getExpensiveCarsR(cars, 50000);
console.log("Alle gefundenen Autos"  )
printCarsR(expensiveCars2)
console.log("------------------------------------------------------------------------------------------------")
