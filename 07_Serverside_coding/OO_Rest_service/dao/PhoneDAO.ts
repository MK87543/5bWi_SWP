import { IPhoneDAO, Phone } from "./IPhoneDAO.ts";

export class PhoneDAO implements IPhoneDAO {
    private phones: Phone[];
    private nextId: number;

    constructor() {
        this.phones = [
            { id: 1, brand: "Apple", model: "iPhone 15", price: 999 },
            { id: 2, brand: "Samsung", model: "Galaxy S24", price: 899 },
            { id: 3, brand: "Google", model: "Pixel 8", price: 699 },
        ];
        this.nextId = 4;
    }

    getAll(): Phone[] {
        return this.phones;
    }

    getById(id: number): Phone | undefined {
        return this.phones.find((p) => p.id === id);
    }

    create(brand: string, model: string, price: number): Phone {
        const newPhone: Phone = {
            id: this.nextId++,
            brand,
            model,
            price,
        };
        this.phones.push(newPhone);
        return newPhone;
    }

    update(
        id: number,
        brand: string,
        model: string,
        price: number,
    ): Phone | null {
        const index = this.phones.findIndex((p) => p.id === id);

        if (index === -1) {
            return null;
        }

        this.phones[index] = {
            id,
            brand,
            model,
            price,
        };

        return this.phones[index];
    }

    delete(id: number): Phone | null {
        const index = this.phones.findIndex((p) => p.id === id);

        if (index === -1) {
            return null;
        }

        const deletedPhone = this.phones.splice(index, 1)[0];
        return deletedPhone;
    }
}
