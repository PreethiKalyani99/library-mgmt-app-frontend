import { useState } from "react";
import { useUserAPI } from "../../hooks/useUserAPI";
import { roleField } from "../../constants/formFields";
import { ModalLayout } from "../common/modal/Modal";
import { CustomForm } from "../common/form/Form";

interface CreateRoleProp {
    setShowRole: (value: boolean) => void
}

export default function CreateRole({ setShowRole }: CreateRoleProp) {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState('')
    const [error, setError] = useState('')

    const formField = roleField({ formData, error })

    const { createRole } = useUserAPI()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(formData.trim() === ''){
            setError('Role should not be empty')
            return
        }
        try {
            setIsLoading(true)
            await createRole(formData)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setShowRole(false)
            setFormData('')
        }
    }

    return (
        <ModalLayout
            height={70}
            title="User's Info"
            close={() => setShowRole(false)}
            body={
                <CustomForm
                    fields={formField}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    buttonText='Create Role'
                />
            }
        />
    )
}