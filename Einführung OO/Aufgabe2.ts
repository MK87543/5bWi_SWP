interface Car {
    brand: string;
    model: string;
    price: number;
    year: number;
}

// Sample data
const cars2: Car[] = [
  { brand: "BMW", model: "X5", price: 65000, year: 2023 },
  { brand: "Audi", model: "A4", price: 45000, year: 2022 },
  { brand: "Mercedes", model: "C-Class", price: 52000, year: 2023 },
  { brand: "Volkswagen", model: "Golf", price: 28000, year: 2021 },
  { brand: "Tesla", model: "Model 3", price: 48000, year: 2023 },
  { brand: "Porsche", model: "911", price: 120000, year: 2024 },
  { brand: "Toyota", model: "Corolla", price: 25000, year: 2022 },
  { brand: "Ford", model: "Mustang", price: 55000, year: 2023 }
];



//Map funktion
//Neues Array mit verkürtzen daten
const newArr: string[] = cars2.map(car => `${car.brand} ${car.price}`)
console.log(newArr);

const numberArray : number[] = [1,2,3,4,5];
const verdoppelt:number[] = numberArray.map(numb => numb*2);
console.log(verdoppelt);


//filter
//aus einem Array nach Daten Filtern
const newArr2: Array <Car> = cars2.filter(cars =>cars.price < 40000)
console.log(newArr2);

const numberArray2 : number[] = [1,2,3,4,5];
const result = numberArray2.filter(numb => numb >= 3);
console.log(result);

//sort
//sortieren des Arrays
const newArr3: Array <Car> = cars2.sort((a,b) => a.price- b.price)
console.log(newArr3);

const numberArray3 : number[] = [1,4,3,1,4,5,2];
const result3 = numberArray3.sort((a,b) => a - b)
console.log(result3);


//find
//finden von daten im array
const newArr4: Car | undefined = cars2.find(cars => cars.brand == "Ford");
console.log(newArr4);

const numberArray4 : number[] = [1,4,3,1,4,5,2];
const result4 = numberArray4.find(numb => numb ==3)
console.log(result4);


//reduce
const newArr5:  number = cars2.reduce((sum, car) => sum + car.price, 0)
console.log(newArr5);

const numberArray5 : number[] = [1,4,3,1,4,5,2];
const result5 = numberArray5.reduce((sum, numb) => sum + numb,0)
console.log(result5);



//some
//gibt True oder False zurück je nachem ob es was findet
const newArr6: boolean = cars2.some(cars => cars.price ==25000)
console.log(newArr6);

const numberArray6 : number[] = [1,4,3,1,4,5,2];
const result6 = numberArray6.some(numb => numb ==3)
console.log(result6);


//every
//gibt false zurück wenn ein element das suchkriterium nicht erfüllt
const newArr7: boolean = cars2.every(cars => cars.price ==25000)
console.log(newArr7);

const numberArray7 : number[] = [1,4,3,1,4,5,2];
const result7 = numberArray7.every(numb => numb ==3)
console.log(result7);





