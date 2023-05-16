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

export function TryCatch(target:any, method: string, descriptor: PropertyDescriptor) {
    return {
        ...descriptor,
        value: function (...args:any[]){
            try {
                return descriptor.value.apply(this, args)
            } catch (error) {
                throw error
            }
        }
    }
}

export function LogArgs(target:any, method: string, descriptor: PropertyDescriptor) {
    return {
        ...descriptor,
        value: function(...args:any[]) {
            console.log(`Logging arguments ${target.constructor.name}` ,{args})
            return descriptor.value.apply(this, args)
        }
    }
}