import $api from "../http";
import {IDoctor} from "../intefaces/doctorInterfaces";
import {ISearchOptions} from "../intefaces/commonInterfaces";


export default class DoctorServices {
    static async getDoctors(searchOptions: ISearchOptions | null){
        return $api.get('/doctors', {
            params: searchOptions ?? {}

        });
    }

    static async getDoctorById(doctor_id: number){
        return $api.get(`/doctors/${doctor_id}`);
    }

    static async createDoctor(doctor: IDoctor){
        return $api.post('/doctors', doctor);
    }

    static async updateDoctor (doctor: IDoctor){
        return $api.put(`/doctors/${doctor.doctor_id}`, doctor);
    }

    static async deleteDoctor(doctor_id: number){
        return $api.delete(`/doctors/${doctor_id}`);
    }

    static async getSum(ids: number[]){
        const params = `?doctor_ids=${ids.join('&doctor_ids=')}`;
        return $api.get(`/doctors/sumto${params}`);
    }

    static async getCountries(){
        return $api.get('/countries');
    }
}