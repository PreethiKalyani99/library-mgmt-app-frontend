import { authorFields } from '../../constants/formFields';
import { CustomForm } from '../common/form/Form';
import { ModalLayout } from '../common/modal/Modal';
import { Loader } from '../common/loader/Loader';
import { useAuthor } from '../../hooks/useAuthor';
import { useAuthorHandlers } from '../../hooks/useAuthorHandlers';

const CreateAuthor: React.FC = () => {
    const {
        formData,
        errors,
        isEdit,
        isLoading,
    } = useAuthor()

    const { 
        handleClose,
        handleInputChange,
        handleSubmit,
    } = useAuthorHandlers()

    const formFields = authorFields({ formData, errors })

    return (
        <div className='form-container'>
            {isLoading && <Loader />}
            <ModalLayout
                height={70}
                title="Author's Info"
                close={handleClose}
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        buttonText={isEdit ? 'Edit Author' : 'Create Author'}
                    />
                }
            />
        </div>
    )
}

export default CreateAuthor