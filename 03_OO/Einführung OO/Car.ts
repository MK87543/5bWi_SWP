import { Engine } from './Engine.ts';



export class Car {
    public color: string = "red";


    constructor(private model:string, public make:string, private engine:Engine){
        this.model = model
    };

getHorsePower():number{
    return this.engine.getHorsePower();
}


    getColor():string{
        return this.color;
    }


    getMake():string{
        return this.make
    }
}