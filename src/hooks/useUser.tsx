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
    isAlertVisible: boolean
    setIsAlertVisible: (visible: boolean) => void
    roleData: string[]
    setRoleData: (value: string[]) => void
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
    isAlertVisible: false,
    setIsAlertVisible: () => null,
    roleData: [],
    setRoleData: () => null
})

export const UserProvider = ({ children }: ProviderProp) => {
    const [activeTab, setActiveTab] = useState('')
    const [roleData, setRoleData] = useState<string[]>([])
    const [userData, setUserData] = useState<UserForm[]>([])
    const [count, setCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [query, setQuery] = useState('')
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const [formData, setFormData] = useState({
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
    ])
    
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)