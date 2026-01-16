class Person1 {
    public name: string = "Max";
    private password: string = "geheim";
    protected alter: number = 25;

    public gggshowPassword(): void {
        console.log(this.password);
    }
}

class Student1 extends Person1 {
    public fvgvgshowijljknfo(): void {
        this.name = "anna";
        console.log(this.alter);
        console.log(this.password);
        console.log(this.name);
    }
}

const person1 = new Person();
const student1 = new Student();

console.log(person1.name);

person1.showPassword();
student1.showinfo();
