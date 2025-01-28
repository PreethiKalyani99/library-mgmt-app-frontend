export const isEmailValid = (email: string) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return regex.test(email)
}

export const isPasswordValid = (password: string) => password.length >= 8