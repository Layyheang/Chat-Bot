import router from '../app/app-routes';
import { API_BASE_URL } from "../app/app-config"; 
import { Storage } from '../util/localstore/storage' 
import axios, { 
    AxiosError, 
    HttpStatusCode, 
    type AxiosInstance, 
    type AxiosRequestConfig, 
    type AxiosResponse 
} from 'axios' 
 
export interface Pagination { 
    page: number, 
    size: number, 
    totalPage: number, 
    totalSize: number, 
} 
export interface DataResponse<T> { 
    status: number 
    code: number 
    message: string 
    data: T 
    pagination: Pagination 
    error: string 
    token: string
} 
 
 
/** 
 * @class Http setup global axios configuration 
 * @axiosSource https://axios-http.com/docs/req_config 
 */ 
class Http { 
    // For identify while refreshing token  
    isInRefreshingToken = false;  
    // for store request while refreshing token  
    apiRequestQueue:(() => void)[] = []; 
    /** 
     * setup instance when object member was called 
     */ 
    private get http(): AxiosInstance { 
        const http = axios.create({ 
            baseURL: API_BASE_URL 
        }); 
        /** 
         * @axiosRequestInterceptor 
         */ 
        http.interceptors.request.use(async(config) => { 
            config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'application/json'; 
            const token = Storage.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
            return config; 
            // refresh token 
        }, (error) => Promise.reject(error)) 
 
        /** 
         * @axiosResponseInterceptor 
         */ 
        http.interceptors.response.use( 
            (response) => { 
                return response; 
            }, 
            (error:AxiosError) => { 
                const url = error.config?.url 
                if(error.response?.status === HttpStatusCode.Unauthorized || error.response?.status === HttpStatusCode.Forbidden && url !== '/auth/login') { 
                    // clear state  
                    Storage.clearStorage() 
                    // const store = useAuthStore() 
                    // store.setUser(null); 
                    router.replace("/login"); 
                } 
                return Promise.reject(error); 
            } 
        ) 
        return http 
    } 
 
    /** 
     * @axiosRequest 
     * @param url
     * @param config
     * @returns 
     * using sample: 
     * http.request({ 
     *    method: 'GET', 
     *    url: '/sample', 
     *    ... 
     * }) 
     */ 
    public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
        return this.http.get<T, R>(url, config);
      }
    /** 
     *  
     * @param url  
     * @param config  
     * @returns  
     * @function for file only 
     */ 
    public getFile<T = any, R = AxiosResponse<BlobPart>>(url: string, config?: AxiosRequestConfig): Promise<R> { 
        return this.http.get<T, R>(url, config) 
    } 
     
    /** 
     * @axiosPostMethod 
     * @param url 
     * @param data 
     * @param config optional paramenter 
     * @returns 
     * using sample: 
     * http.post('/sample', data, config) 
     */ 
    public post<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>( 
        url: string, 
        data?: T, 
        config?: AxiosRequestConfig 
    ): Promise<R> {   
        return this.http.post<T, R>(url, data, config) 
        
    } 
 
    /** 
     * @axiosPutMethos 
     * @param url 
     * @param data 
     * @param config optional paramenter 
     * @returns 
     * using sample: 
     * http.put('/sample', data, config) 
     */ 
    public put<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>( 
        url: string, 
        data?: T, 
        config?: AxiosRequestConfig 
    ): Promise<R> { 
        return this.http.put<T, R>(url, data, config) 
    } 
 
    /** 
     * @axiosDeleteMethod 
     * @param url 
     * @param config optional parameter 
     * @returns 
     * using sample: 
     * http.delete('/sample', config) 
     */ 
    public delete<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>(url: string, config?: AxiosRequestConfig): Promise<R> { 
        return this.http.delete<T, R>(url, config) 
    } 
    /**  
     * @axiosPatchMethos  
     * @param url  
     * @param data  
     * @param config optional paramenter  
     * @returns  
     * using sample:  
     * http.patch('/sample', data, config)  
     */  
    public patch<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>(  
        url: string,  
        data?: T,  
        config?: AxiosRequestConfig  
    ): Promise<R> {  
        return this.http.patch<T, R>(url, data, config)  
    } 
 
} 
 
 
export const http = new Http()     




// import router from '../app/app-routes' 
// import TokenManager from '../util/token/token-managenment' 
// import { API_BASE_URL } from "../store/app-config"; 
// import { Storage } from '@/util/local-storage' 
// import axios, { 
//     AxiosError, 
//     HttpStatusCode, 
//     type AxiosInstance, 
//     type AxiosRequestConfig, 
//     type AxiosResponse 
// } from 'axios' 
// import { useAuthStore } from '@/views/login/auth.store' 
 
// export interface Pagination { 
//     page: number, 
//     size: number, 
//     totalPage: number, 
//     totalSize: number, 
// } 
// export interface DataResponse<T> { 
//     status: number 
//     code: number 
//     message: string 
//     data: T 
//     pagination: Pagination 
//     error: string 
// } 
 
 
// /** 
//  * @class Http setup global axios configuration 
//  * @axiosSource https://axios-http.com/docs/req_config 
//  */ 
// class Http { 
//     // For identify while refreshing token  
//     isInRefreshingToken = false;  
//     // for store request while refreshing token  
//     apiRequestQueue:(() => void)[] = []; 
//     /** 
//      * setup instance when object member was called 
//      */ 
//     private get http(): AxiosInstance { 
//         const http = axios.create({ 
//             baseURL: API_BASE_URL 
//         }); 
//         /** 
//          * @axiosRequestInterceptor 
//          */ 
//         http.interceptors.request.use(async(config) => { 
 
//             let token = Storage.getAccessToken(); 
//             if(token) { 
//                 if(TokenManager.isExpired(token)) { 
//                     if(!this.isInRefreshingToken) {  
//                         this.isInRefreshingToken = true  
//                         token = await TokenManager.retrieveNewAccessToken();  
//                         this.isInRefreshingToken = false;  
//                         // set new token  
//                         config.headers.Authorization = Bearer ${token} 
//                         // resolve the request after refreshed token  
//                         this.apiRequestQueue.forEach((apiRequest) => {  
//                             apiRequest();  
//                         });  
//                         this.apiRequestQueue = [];  
//                     }else{  
//                         // store request while token is refreshing  
//                         await new Promise<void>((resolve) => {  
//                             this.apiRequestQueue.push(() => {  
//                                 // use Storage.getAccessToken() to refetch new token from localStorage after refresh token 
//                                 config.headers.Authorization = Bearer ${Storage.getAccessToken()}; 
//                                 resolve();  
//                             });  
//                         });  
//                     }  
//                 } 
//                 else config.headers.Authorization = Bearer ${token} 
//             } 
 
//             config.headers['Content-Type'] = config.data instanceof FormData ? 'multipart/form-data' : 'application/json'; 
 
//             return config; 
//             // refresh token 
//         }, (error) => Promise.reject(error)) 
 
//         /** 
//          * @axiosResponseInterceptor 
//          */ 
//         http.interceptors.response.use( 
//             (response) => { 
//                 return response; 
//             }, 
//             (error:AxiosError) => { 
//                 const url = error.config?.url 
//                 if(error.response?.status === HttpStatusCode.Unauthorized || error.response?.status === HttpStatusCode.Forbidden && url !== '/auth/login') { 
//                     // clear state  
//                     Storage.clearStorage() 
//                     const store = useAuthStore() 
//                     store.setUser(null); 
//                     router.replace("/login"); 
//                 } 
//                 return Promise.reject(error); 
//             } 
//         ) 
//         return http 
//     } 
 
//     /** 
//      * @axiosRequest 
//      * @param config 
//      * @returns 
//      * using sample: 
//      * http.request({ 
//      *    method: 'GET', 
//      *    url: '/sample', 
//      *    ... 
//      * }) 
//      */ 
//     public request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> { 
//         return this.http.request<T, R>(config)
//     /** 
//      * @axiosGetMethod 
//      * @param url 
//      * @param config optional paramenter 
//      * @returns 
//      * using sample: 
//      * http.get('/sample', config) 
//      */ 
//     public get<T = any, R = AxiosResponse<DataResponse<T>>>(url: string, config?: AxiosRequestConfig): Promise<R> { 
//         return this.http.get<T, R>(url, config) 
//     } 
 
//     /** 
//      *  
//      * @param url  
//      * @param config  
//      * @returns  
//      * @function for file only 
//      */ 
//     public getFile<T = any, R = AxiosResponse<BlobPart>>(url: string, config?: AxiosRequestConfig): Promise<R> { 
//         return this.http.get<T, R>(url, config) 
//     } 
     
//     /** 
//      * @axiosPostMethod 
//      * @param url 
//      * @param data 
//      * @param config optional paramenter 
//      * @returns 
//      * using sample: 
//      * http.post('/sample', data, config) 
//      */ 
//     public post<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>( 
//         url: string, 
//         data?: T, 
//         config?: AxiosRequestConfig 
//     ): Promise<R> { 
//         return this.http.post<T, R>(url, data, config) 
//     } 
 
//     /** 
//      * @axiosPutMethos 
//      * @param url 
//      * @param data 
//      * @param config optional paramenter 
//      * @returns 
//      * using sample: 
//      * http.put('/sample', data, config) 
//      */ 
//     public put<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>( 
//         url: string, 
//         data?: T, 
//         config?: AxiosRequestConfig 
//     ): Promise<R> { 
//         return this.http.put<T, R>(url, data, config) 
//     } 
 
//     /** 
//      * @axiosDeleteMethod 
//      * @param url 
//      * @param config optional parameter 
//      * @returns 
//      * using sample: 
//      * http.delete('/sample', config) 
//      */ 
//     public delete<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>(url: string, config?: AxiosRequestConfig): Promise<R> { 
//         return this.http.delete<T, R>(url, config) 
//     } 
//     /**  
//      * @axiosPatchMethos  
//      * @param url  
//      * @param data  
//      * @param config optional paramenter  
//      * @returns  
//      * using sample:  
//      * http.patch('/sample', data, config)  
//      */  
//     public patch<T = any, V = any,  R = AxiosResponse<DataResponse<V>>>(  
//         url: string,  
//         data?: T,  
//         config?: AxiosRequestConfig  
//     ): Promise<R> {  
//         return this.http.patch<T, R>(url, data, config)  
//     } 
 
// } 
 
 
// export const http = new Http()     