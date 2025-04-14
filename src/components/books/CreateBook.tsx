import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { Loader } from '../common/loader/Loader';
import { bookFields } from '../../constants/formFields';
import { useBook } from '../../hooks/useBook';
import { useAuthor } from '../../hooks/useAuthor';
import { useBookHandlers } from '../../hooks/useBookHandlers';

const CreateBook: React.FC = () => {
    const {
        formData,
        errors,
        isLoading,
        isEdit
    } = useBook()

    const { 
        handleOptionChange,
        handleFormSearch,
        handleClose,
        handleInputChange,
        handleSubmit
    } = useBookHandlers()
    
    const { options } = useAuthor()

    const formFields = bookFields({ formData, options, onOptionChange: handleOptionChange, onInputChange: handleFormSearch, errors })

    return (
        <>
            {isLoading && <Loader />}
            <ModalLayout
                height={70}
                title="Book Info"
                close={handleClose}
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        buttonText={isEdit? 'Edit Book' : 'Create Book'}
                    />
                }
            />
        </>
    )
}

export default CreateBook