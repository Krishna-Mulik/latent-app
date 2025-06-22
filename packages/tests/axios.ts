import axiosDefault from "axios";

const axios = {

    async post<T = any, R = axiosDefault.AxiosResponse<T>, D = any>(url: string, data?: D, config?: axiosDefault.AxiosRequestConfig<D>): Promise<R> {
        try {
            const res = await axiosDefault.post<T, R, D>(url, data, config);
            return res
        } catch (e) {
            if (axiosDefault.isAxiosError(e) && e.response) {
                return e.response as R;
            }

            throw e;
        }
    },

    async get<T = any, R = axiosDefault.AxiosResponse<T>, D = any>(url: string, config?: axiosDefault.AxiosRequestConfig<D>): Promise<R> {
        try {
            const res = await axiosDefault.get<T, R, D>(url, config);
            return res
        } catch (e) {
            if (axiosDefault.isAxiosError(e) && e.response) {
                return e.response as R;
            }

            throw e;
        }
    },

    async put<T = any, R = axiosDefault.AxiosResponse<T>, D = any>(url: string, data?: D, config?: axiosDefault.AxiosRequestConfig<D>): Promise<R> {
        try {
            const res = await axiosDefault.put<T, R, D>(url, data, config);
            return res
        } catch (e) {
            if (axiosDefault.isAxiosError(e) && e.response) {
                return e.response as R;
            }

            throw e;
        }
    },

    async delete<T = any, R = axiosDefault.AxiosResponse<T>, D = any>(url: string, config?: axiosDefault.AxiosRequestConfig<D>): Promise<R> {
        try {
            const res = await axiosDefault.delete<T, R, D>(url, config);
            return res
        } catch (e) {
            if (axiosDefault.isAxiosError(e) && e.response) {
                return e.response as R;
            }

            throw e;
        }
    }

}

export default axios;

