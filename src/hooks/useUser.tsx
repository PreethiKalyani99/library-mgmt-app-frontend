import { useContext, createContext, useState, useMemo } from "react";
import { ProviderProp, UserForm, UserFormProp } from "../types";

interface UserProviderProp {
    activeTab: string
    setActiveTab: (activeTab: string) => void
    count: number
    setCount: (count: number) => void
    currentPage: number
    setCurrentPage: (page: number) => void
    rowsPerPage: number
    setRowsPerPage: (page: number) => void
    query: string
    setQuery: (str: string) => void
    userData: UserForm[]
    setUserData: (value: UserForm[]) => void
    formData: UserFormProp
    setFormData: (value: React.SetStateAction<UserFormProp>) => void
    errors: UserFormProp
    setErrors: (value: UserFormProp) => void
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    roleData: string[]
    setRoleData: (value: string[]) => void
    showModal: boolean
    setShowModal: (visible: boolean) => void
    isEdit: boolean
    setIsEdit: (visible: boolean) => void
    rowId: number
    setRowId: (value: number) => void
    isLoading: boolean
    setIsLoading: (val: boolean) => void
    showRole: boolean
    setShowRole: (val: boolean) => void
    userInfo: string
    setUserInfo: (val: string) => void
}

export const UserContext = createContext<UserProviderProp>({
    activeTab: '',
    setActiveTab: () => null,
    count: 0,
    setCount: () => null,
    currentPage: 1,
    setCurrentPage: () => null,
    rowsPerPage: 10,
    setRowsPerPage: () => null,
    query: '',
    setQuery: () => null,
    userData: [],
    setUserData: () => null,
    formData: {email: '', password: '', role: ''},
    setFormData: () => null,
    errors: {email: '', password: '', role: ''},
    setErrors: () => null,
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    roleData: [],
    setRoleData: () => null,
    isEdit: false,
    setIsEdit: () => null,
    showModal: false,
    setShowModal: () => null,
    rowId: 0,
    setRowId: () => null,
    isLoading: false,
    setIsLoading: () => null,
    showRole: false,
    setShowRole: () => null,
    userInfo: '',
    setUserInfo: () => null,
})

export const UserProvider = ({ children }: ProviderProp) => {
    const [showRole, setShowRole] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [rowId, setRowId] = useState(0)
    const [activeTab, setActiveTab] = useState('')
    const [roleData, setRoleData] = useState<string[]>([])
    const [userData, setUserData] = useState<UserForm[]>([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [query, setQuery] = useState('')
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [userInfo, setUserInfo] = useState('')
    const [formData, setFormData] = useState({
        email: '', password: '', role: ''
    })
    const [errors, setErrors] = useState({
        email: '', password: '', role: ''
    })
    
    const value = useMemo(() => {
        return{
            activeTab,
            setActiveTab,
            count,
            setCount,
            currentPage,
            setCurrentPage,
            rowsPerPage,
            setRowsPerPage,
            query,
            setQuery,
            userData,
            setUserData,
            formData,
            setFormData,
            isAlertVisible,
            setIsAlertVisible,
            roleData,
            setRoleData,
            errors,
            setErrors,
            showModal,
           setShowModal,
           isEdit,
           setIsEdit,
           rowId,
           setRowId,
           isLoading,
           setIsLoading,
           showRole,
           setShowRole,
           userInfo,
           setUserInfo,
        }
    }, [
        activeTab,
        count,
        currentPage,
        rowsPerPage,
        query,
        userData,
        formData,
        isAlertVisible,
        roleData,
        showRole,
        errors,
        showModal,
        isEdit,
        rowId,
        isLoading,
        userInfo,
    ])
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)