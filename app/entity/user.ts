export type user = {
    userName: string
    id: string
}

export const userFactory = (args:user) => {
    return {...args}
}
