import moment from "moment" 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 25-Jan-2024 
 */ 
export const sdbDateFormat = (date: string | Date) => { 
    return moment(new Date(date)).format('DD-MMM-YYYY') 
} 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 01:25:15 PM 
 */ 
export const sdbTimeFormat = (date: string | Date) => { 
    return moment(date).format('hh:mm:ss A') 
} 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 14-Apr-2024, 9:09:08 am 
 */ 
export const sdbDateFormatWithTime = (date: string | Date) => { 
    return moment(date).format('DD-MMM-YYYY, hh:mm:ss A') 
} 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 2024-03-20 
 */ 
export const getGlobleFormattedDate = (date: string | Date) => { 
    const today = new Date(date); 
    const year = today.getFullYear(); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`; 
} 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 2024-03-20 11:59:59 
 */ 
export const getGlobleFormattedDateTime = (date: string | Date) => { 
    const today = new Date(date); 
    const year = today.getFullYear(); 
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0'); 
    const hours = String(today.getHours()).padStart(2, '0'); 
    const minutes = String(today.getMinutes()).padStart(2, '0'); 
    const seconds = String(today.getSeconds()).padStart(2, '0'); 
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 
} 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 11:59:59 
 */ 
export const getGlobleFormattedTime = (time: string | Date) => { 
    const today = new Date(time); 
    const hours = String(today.getHours()).padStart(2, '0'); 
    const minutes = String(today.getMinutes()).padStart(2, '0'); 
    const seconds = String(today.getSeconds()).padStart(2, '0'); 
    return `${hours}:${minutes}:${seconds}`; 
} 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 1day 24h 30m 
 */ 
export const getGlobleFormattedDuration = (min : number) => { 
    let duration = ''; 
    let hours = 0; 
    let minutes = 0; 
    let days = 0; 
    if(min >= 1440){ 
        days = Math.floor(min/1440); 
        minutes = min-(days*1440); 
        hours = Math.floor(minutes/60); 
        minutes = minutes - (hours*60); 
        if(days > 0 && hours > 0) { 
            duration = `${days}days ${hours}h ${minutes}mn`; 
        }else if(days < 0 && hours > 0){ 
            duration = `${hours}h ${minutes}mn`; 
        } 
    }else if(min >= 60){ 
        hours = Math.floor(min/60); 
        minutes = Math.floor(min%60); 
        duration = `${hours}h ${minutes}mn`; 
    }else{ 
        duration = `${min}mn`; 
    } 
    return `${duration}` 
} 
 
 
export const loginTimeFormater = (d:string | undefined)=> d ? moment(d).format('MMM DD, YYYY | hh:mm A') : '...'; 
 
 
/** 
 *  
 * @param date input string of date or date 
 * @returns formatt 25/Jan/2024 
 */ 
export const dateFormat = (date: string | Date) => { 
    if (date === null) return null 
    return moment(new Date(date)).format('DD/MM/YYYY') 
}
