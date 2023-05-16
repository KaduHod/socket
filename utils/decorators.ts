export type defaultFunction = (...args:any) => any

export let tryCatch = (fn:defaultFunction) => {
    return (...args:any) => {
        try {
            return fn(...args)
       } catch (error) {
           throw error
       }    
    }
}

export let logArgs = (fn:defaultFunction) => {
    return (...args:any) => {
        console.log(fn, {args})
        return fn(...args)
    }
}