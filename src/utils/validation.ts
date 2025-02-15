export const isEmailValid = (email: string) => {
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return regex.test(email)
}

export const isPasswordValid = (password: string) => password.length >= 8

interface AuthorFormProp {
    name?: string
    country?: string
}
export const authorFormValidation = (formData: AuthorFormProp) => {
    let errors: AuthorFormProp = {}

    if (formData.name?.trim() === '') {
        errors.name = "Name is required";
    }
    if (formData.country?.trim() === '') {
        errors.country = "Country is required"
    }

    return errors
}

interface BookFormProp {
    authorName: string
    title: string
    publishedYear?: string
}
export const bookFormValidation = (formData: BookFormProp) => {
    let errors: Partial<BookFormProp> = {}

    if(formData.authorName?.trim() === ''){
        errors.authorName = "Author name is required"
    }
    if(formData.title?.trim() === ''){
        errors.title = "Title is required"
    }
    if(formData.publishedYear && isNaN(Number(formData.publishedYear))){
        errors.publishedYear = "Year should be a number"
    }

    return errors
}

interface BorrowFormProp {
    title: string
    borrower: string
    borrowDate: string
    returnDate?: string
}
export const borrowFormValidation = (formData: BorrowFormProp) => {
    let errors: Partial<BorrowFormProp> = {}

    if(formData.title?.trim() === ''){
        errors.title = "Title is required"
    }
    if(formData.borrower?.trim() === ''){
        errors.borrower = "User is required"
    }
    if(formData.borrowDate?.trim() === ''){
        errors.borrowDate = "Borrow date is required"
    }
    if(formData.returnDate && (new Date(formData.borrowDate) >= new Date(formData.returnDate))){
        errors.returnDate = "Return date should not be earlier than borrow date"
    }

    return errors
}

interface CommonFormProp {
    email: string
    password: string
    role?: string
}
export const commonFormValidation = (formData: CommonFormProp, type: string, isEdit: boolean = false) => {
    let errors: Partial<CommonFormProp> = {}

    if(formData.email?.trim() === ''){
        errors.email = "Email is required"
    }
    if(!isEdit && formData.password?.trim() === ''){
        errors.password = "Password is required"
    }
    if((type === 'signup' || (type === 'user' && !isEdit)) && formData.password.length < 8){
        errors.password = "Password should be at least 8 characters long"
    }
    if((type === 'signup' || type === 'user') && !isEmailValid(formData.email)){
        errors.email = "Enter a valid email example@example.com"
    }
    if((type === 'user') && !formData.role){
        errors.role = "Role is required"
    }

    return errors
}