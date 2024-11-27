import { IDoctor } from './doctorInterfaces'; // Додайте правильний шлях до файлу

export interface ISearchOptions {
    search: string,
    price_le: number,
    country: string
    rate_ge: number,
    order_by: string,
}

export interface IArticle {
    id: number,
    title: string,
    description: string,
    picture: string,
}    



export const defaultSearchOptions: ISearchOptions = {
    search: '',
    price_le: 0,
    country: '',
    rate_ge: 0,
    order_by: 'price',
}

export interface ICart {
    id: number,
    doctor: IDoctor,
    doctor_type: string,
    quantity: number
}