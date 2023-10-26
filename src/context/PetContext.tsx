// PetContext.tsx

import React, { createContext, useState, useContext } from 'react';

type ContextProps = {
    children: React.ReactNode; // 👈️ define children prop
};

interface PetContextType {
    petId: string | null;
    setPetId: React.Dispatch<React.SetStateAction<string | null>>;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

const PetProvider = (props: ContextProps) => {
    const [petId, setPetId] = useState<string | null>(null);

    return (
        <PetContext.Provider value={{ petId, setPetId }}>
            {props.children}
        </PetContext.Provider>
    );
};

const usePetContext = (): PetContextType => {
    const context = useContext(PetContext);
    if (context === undefined) {
        throw new Error('usePetContext must be used within a PetProvider');
    }
    return context;
};

export { PetProvider, usePetContext };
