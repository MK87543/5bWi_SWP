export interface Phone {
    id: number;
    brand: string;
    model: string;
    price: number;
}

export interface IPhoneDAO {
    getAll(): Phone[];
    getById(id: number): Phone | undefined;
    create(brand: string, model: string, price: number): Phone;
    update(
        id: number,
        brand: string,
        model: string,
        price: number,
    ): Phone | null;
    delete(id: number): Phone | null;
}
