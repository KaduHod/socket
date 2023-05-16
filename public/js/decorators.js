export let tryCatch = (fn) => {
    return (...args) => {
        try {
            return fn(...args)
        } catch (error) {
            throw error
        }
    }
}

export let logArgs = (fn) => {
    return (...args) => {
        console.log(fn,{args})
        return fn(...args)
    }
}