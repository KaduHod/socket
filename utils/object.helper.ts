/**
 * Função que copia um object sem passar a referencia de memoria dele
 */
 export const deepCopy = <T extends object>(obj: T):T => {
    const copy = Array.isArray(obj) ? [] : {};

    for(const key in obj) 
    {
        const value = typeof obj[key] === "object" 
            ? deepCopy(obj[key] as object)
            : obj[key];

        Array.isArray(copy)  
            ? copy.push(value)
            : Object.defineProperty(copy, key, { enumerable: true, writable:true, configurable: true, value })        
    }

    return copy as T;
}
