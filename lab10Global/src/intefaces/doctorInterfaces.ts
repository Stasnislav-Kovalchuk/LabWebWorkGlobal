export interface IDoctor {
    doctor_id: number;
    name: string;
    description: string;
    updated_at: string;
    price: number;
    picture: string;
    location: string;
    rating: number;

}

export const defaultDoctor: IDoctor = {
    doctor_id: -1,
    name: '',
    description: '',
    updated_at: new Date().toISOString(),
    price: 0,
    picture: '',
    location: '',
    rating: 0,
};

export interface SearchOptions {
    price: string | null;
    rating: number | null;
    country: string | null;
    term: string;
    sort?: string; // додаємо опціональне поле sort, якщо воно використовується в контексті
  }

  export interface IDoctor {
    doctor_id: number;
    name: string;
    specialization?: string; // Додайте це поле, якщо воно є у ваших даних
    price: number;
    rating: number;
    country?: string; // Додайте це поле, якщо воно є у ваших даних
    // Додайте інші поля, які є у ваших даних
  }
  