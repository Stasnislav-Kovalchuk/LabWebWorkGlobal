export interface IDoctor {
    doctor_id: number;
    name: string;
    description: string;
    updated_at: string;
    price: number;
    picture: string;
}

export const defaultDoctor: IDoctor = {
    doctor_id: -1,
    name: '',
    description: '',
    updated_at: new Date().toISOString(),
    price: 0,
    picture: ''
};