import { useUser } from "./useUser"
import { useUserAPI } from "./useUserAPI"
import { commonFormValidation } from "../utils/validation"
import { UserFormProp } from "../types"
import Actions from "../components/actions/Actions"

export const useUserHandlers = () => {
    const { 
        setShowModal, 
        showModal,
        setIsEdit,
        setRowId,
        userData,
        setFormData,
        setQuery,
        query,
        rowId,
        isEdit,
        formData,
        setIsLoading,
        setErrors,
        showRole,
        setShowRole,
    } = useUser()
    
    const { getUser, updateUser, addUser } = useUserAPI()
    
    const toggleModal = () => {
        setShowModal(!showModal) 
    }

    const toggleRoleModal = () => {
        setShowRole(!showRole)
    }

    const handleEdit = (id: number) => {
        toggleModal()
        setIsEdit(true)
        setRowId(id)

        const user = userData.find(user => user.user_id === id)
        if(!user){
            console.log("user not found")
            return 
        }

        setFormData((prev) => ({
            ...prev,
            email: user.email,
            role: user?.role?.role ?? '-',
        }))
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        if(value === ''){
            await getUser({})
        }
    }

    const handleSearch = async () => {
        if(query.length >= 3 && /^[a-zA-Z0-9@.]+$/.test(query)){
            await getUser({ search: query})
        }
    }

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter'){
            handleSearch()
        }
    }

    const rowData = userData?.map(user => {
        return {
            id: user.user_id,
            cells: [
                {
                    cellData: user.email
                },
                {
                    cellData: user?.role?.role ?? '-'
                },
                {
                    cellData: (<Actions onEdit={() => handleEdit(user.user_id)}/>)
                },
            ]
        }
    })

    const formValidationErrors = commonFormValidation(formData, 'user', isEdit)
    
    const handleOptionChange = (selected: any) => {
        setFormData({...formData, role: selected[0] || ''})
    } 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevState: UserFormProp) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleFormEdit = async () => {
        const user = {
            role: formData.role,
            id: rowId
        }
        await updateUser(user)
        setIsEdit(false)
    }

    const resetForm = () => {
        if(formData.email || formData.password || formData.role){
            setFormData({ email: '', password: '', role: '' })
        }
        setErrors({ email: '', password: '', role: '' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (Object.keys(formValidationErrors).length > 0) {
            setErrors({ 
                email: formValidationErrors.email || '', 
                password: formValidationErrors.password || '',
                role: formValidationErrors.role || '',
            })
            return
        }

        try {
            await (isEdit ? handleFormEdit() : addUser(formData))
            handleClose()
        } 
        catch (error) {
            console.log(error)
        } 
        finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setIsEdit(false)
        resetForm()
        setShowModal(false)
    }

    return {
        toggleModal,
        toggleRoleModal,
        handleEdit,
        handleChange,
        handleSearch,
        onKeyDown,
        rowData,
        formValidationErrors,
        handleOptionChange,
        handleInputChange,
        handleSubmit,
        handleClose,
    }
}