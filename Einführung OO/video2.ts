class Person {
    public name: string = "Max";
    private password: string = "geheim";
    protected alter: number = 25;

    public showPassword(): void {
        console.log(this.password);
    }
}

class Student extends Person {
    public showInfo(): void {
        this.name = "Anna";
        this.alter = 28;
        console.log(this.name);
        console.log(this.alter);
    }
}

const person = new Person();
const student = new Student();

person.showPassword();
student.showInfo();
