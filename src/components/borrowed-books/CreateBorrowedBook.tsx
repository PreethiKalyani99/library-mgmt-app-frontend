import { useBorrow } from "../../hooks/useBorrow"
import { useBorrowHandlers } from "../../hooks/useBorrowHandlers"
import { borrowFields } from "../../constants/formFields"
import { CustomForm } from "../common/form/Form"
import { ModalLayout } from "../common/modal/Modal"
import { Loader } from "../common/loader/Loader"

const CreateBorrowedBook: React.FC = () => {
    const {
        formData,
        bookOptions,
        userOptions,
        errors,
        isEdit,
        isLoading,
    } = useBorrow()

    const { 
        handleBookSearch, 
        handleUserChange, 
        handleUserSearch, 
        handleBookChange,
        handleClose,
        handleInputChange,
        handleSubmit
    } = useBorrowHandlers()


    const formFields = borrowFields({
        formData,
        bookOptions,
        userOptions,
        bookInputChange: handleBookSearch,
        userInputChange: handleUserSearch,
        onBookChange: handleBookChange,
        onUserChange: handleUserChange,
        isEdit,
        errors,
    })

    return (
        <>
            {isLoading && <Loader />}
            <ModalLayout
                height={70}
                title="Borrower Info"
                close={handleClose}
                body={
                    <CustomForm
                        fields={formFields}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                        buttonText={isEdit ? 'Edit Borrower' : 'Create Borrower'}
                    />
                }
            />
        </>
    )
}

export default CreateBorrowedBook