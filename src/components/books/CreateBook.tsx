import { CustomForm } from '../common/form/Form';
import { Layout } from '../common/layout/Layout';
import { bookFields } from '../../constants/formFields';
import { useBook } from '../../hooks/useBook';

const CreateBook: React.FC = () => {
        const {
            formData,
            setFormData,
            isAlertVisible,
            setIsAlertVisible,
        } = useBook()
    const formFields = bookFields({ formData })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = () => {
        console.log("submit")
    }
    return (
        <>
            <Layout
                title="Book Info"
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        buttonText='Create Book'
                    />
                }
            />
        </>
    )
}