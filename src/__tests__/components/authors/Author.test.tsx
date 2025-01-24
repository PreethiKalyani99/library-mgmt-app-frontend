import { render, screen, fireEvent } from "@testing-library/react"
import { FormData } from "../../../types"
import Author from '../../../components/authors/Author'
import { AuthorContext } from "../../../hooks/useAuthor"
import { AuthorDataContext } from "../../../hooks/useAuthorAPI"

describe('Author component', () => {
    it('Should update setFormData when input changes', () => {
        const mockSetFormData = jest.fn()
        const mockFormData = { name: '', country: '' }

        render(
            <AuthorContext.Provider value={{ formData: mockFormData, setFormData: mockSetFormData }}>
                <Author />
            </AuthorContext.Provider>
        )
        const name = screen.getByPlaceholderText(/Enter name/i)
        const country = screen.getByPlaceholderText(/Enter country/i)

        fireEvent.change(name, { target: { name: 'name', value: 'Chetan Bhagat' } })
        fireEvent.change(country, { target: { name: 'country', value: 'India' } })

        expect(mockSetFormData).toHaveBeenCalledWith({ name: 'Chetan Bhagat', country: '' })
        expect(mockSetFormData).toHaveBeenCalledWith({ name: '', country: 'India' })
    })

    it('Should call addAuthor and reset form data', () => {
        const mockSetFormData = jest.fn()
        const mockFormData = { name: "Chetan Bhagat", country: "India" }
        const mockAddAuthor = jest.fn()
        const authorData: FormData[] = []

        render(
            <AuthorDataContext.Provider value={{ addAuthor: mockAddAuthor, authorData: authorData, setAuthorData: jest.fn() }}>
                <AuthorContext.Provider value={{ formData: mockFormData, setFormData: mockSetFormData }}>
                    <Author />
                </AuthorContext.Provider>
            </AuthorDataContext.Provider>
        )
        const submitButton = screen.getByText(/Submit/i)

        fireEvent.click(submitButton)
        
        expect(mockAddAuthor).toHaveBeenCalledWith(mockFormData)
        expect(mockSetFormData).toHaveBeenCalledWith({ name: '', country: '' })
    })
})