import { userFields } from "../../constants/formFields";
import { CustomForm } from "../common/form/Form";
import { ModalLayout } from "../common/modal/Modal";
import { Loader } from '../common/loader/Loader';
import { useUser } from "../../hooks/useUser";
import { useUserHandlers } from "../../hooks/useUserHandlers";

const CreateUser: React.FC = () => {
    const {
        formData,
        roleData,
        errors,
        isEdit,
        isLoading,
    } = useUser()

    const {
        handleOptionChange,
        handleClose,
        handleInputChange,
        handleSubmit
    } = useUserHandlers()

    const formFields = userFields({ formData, isEdit, options: roleData, onChange: handleOptionChange, errors })

    return (
        <>
            {isLoading && <Loader />}
            <ModalLayout
                height={70}
                title="User's Info"
                close={handleClose}
                body={ 
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                        buttonText={isEdit ? 'Edit User' : 'Create User'}
                    />
                }
            />
        </>
    )
}

export default CreateUser