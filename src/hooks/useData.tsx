import { useContext, createContext, useState, useMemo } from "react";
import { ProviderProp } from "../types";

interface DataProviderProp {
    activeTab: string
    setActiveTab: (activeTab: string) => void
}

export const DataContext = createContext<DataProviderProp>({
    activeTab: '',
    setActiveTab: () => null,
})

export const DataProvider = ({ children }: ProviderProp) => {
    const [activeTab, setActiveTab] = useState('')
    
    const value = useMemo(() => {
        return{
            activeTab,
            setActiveTab,
        }
    }, [activeTab])
    
    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)