// import {useAuthStore} from "@/views/login/auth.store"  
// import { Storage } from "../local-storage";  
// import api, { HttpStatusCode }  from "axios";  
// import { API_URI } from "@/app/app.config";  
  
// interface TokenDecode {  
//     exp : number   
//     iat : number  
//     jti : string   
// }  
  
// type SampleResponse<T> = {  
//     status : number,  
//     message : string,  
//     data : T  
// }  

// export default class TokenManager {  
  
//     static isExpired(token:string){  
//         return this.decode(token).exp < (Date.now() / 1000) ; // 888 = 14.8m for testing refresh token 
//     }  
//     static getTimeExpired(token:string){  
//         return new Date(this.decode(token).exp * 1000).toLocaleTimeString()  
//     }  
//     static async retrieveNewAccessToken(){  
//         const refreshToken = Storage.getRefreshToken();  
//         if(!refreshToken) return null;  
//         const store = useAuthStore()  
      
//         const response = await api.get<SampleResponse<{accessToken:string,refreshToken:string}>>(API_URI + "/auth/refresh-token?refreshToken="+refreshToken,{  
//         });  
//         if(response.status === HttpStatusCode.Ok) {  
//             const accessToken = response.data.data.accessToken  
//             const refreshToken = response.data.data.refreshToken  
//             Storage.setAccessToken(accessToken);  
//             Storage.setRefreshToken(refreshToken);  
//             return accessToken;  
//         }  
//         store.setUser(null)  
//         return null;  
//     } 
//     static decode<T=TokenDecode>(token:string):T {  
//         if(token) return JSON.parse(atob(token.split('.')[1]));  
//         else throw Error("Invalid token provided!.");  
//     }  
// }
