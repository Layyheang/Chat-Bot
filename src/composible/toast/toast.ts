import type { AxiosError } from "axios"; 
 
import { useToast } from "primevue/usetoast"; 
 
type Summary = 'SUCCESS' | 'ERROR' | 'NOTY' 
 
export const useToastMessage = () => { 
    function testString(testData: string, lookup: string){ 
        return testData?.toLowerCase()?.indexOf(lookup) === -1; 
    } 
    const toast = useToast(); 
    const toastSummary = Object.freeze({ 
        ERROR: 'Message Fail', 
        SUCCESS: 'Message Success', 
        NOTY: 'Notice' 
    }) 
    const toastMessage = (config: { 
        severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined, 
        summary: Summary, 
        detail: AxiosError | any, 
        life?: number, 
        group?: string, 
        message: string,
        data: {
            error: string
        }
    }) => { 
        if(config.detail?.code === '"ERR_NETWORK"') { 
            return toast.add({ 
                ...config, 
                summary: toastSummary[config.summary], 
                detail: "Something when wrong, please try again later.", 
                life: config.life, 
            }); 
        } 
        const message = () => { 
            if (testString(config.detail?.response?.data?.message as string, ':')){ 
                return config.detail?.response?.data.message 
            } else if((config.detail?.response?.data?.message as string)?.split(':').length === 3) { 
                const str = config.detail?.response?.data?.message as string; 
                const result = str.split(':')[2].trim(); 
                return result 
            }  
            else if(config.detail?.response?.data) { 
                let mss = '' 
                if(config.detail?.response?.data?.error) { 
                    for(const key in config.detail?.response?.data?.error) { 
                        mss = (config.detail?.response?.data?.error[key] as string).replace('This', key) 
                    } 
                    return mss 
                } else { 
                    const message = (config.detail?.response?.data?.message as string).split(':') 
                    mss = message.length > 1 ? message[1] : message[0] 
                } 
                return mss 
            }  
            else { 
                return config.detail 
            } 
        } 
        toast.add({ 
            ...config, 
            summary: toastSummary[config.summary], 
            detail: message(), 
            life: config.life, 
        }); 
    } 
 
    return { 
        toastMessage 
    } 
}
