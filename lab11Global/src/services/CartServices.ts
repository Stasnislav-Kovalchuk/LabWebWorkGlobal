import $api from "../http";
import type { AxiosResponse } from "axios/index";
import {ICart} from "../intefaces/commonInterfaces";


export default class CartServices {
    static async getCarts(): Promise<any> {
        return $api.get('/cart');
    }

    static async addCart(doctor_id: number, quantity: number, doctor_type: string): Promise<any> {
        return $api.post(`/cart?doctor_id=${doctor_id}&quantity=${quantity}&doctor_type=${doctor_type}`);
    }

    static async deleteCart(item_index: number): Promise<any> {
        return $api.delete(`/cart/${item_index}`);
    }

}