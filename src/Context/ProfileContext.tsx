import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserDTO } from "../types/AuthTypes";

interface ProfileContextType {
    profile: UserDTO | null;
    setProfile: (profile: UserDTO | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        console.error("useProfile must be used within a ProfileProvider");
        return { profile: null, setProfile: () => {} };
    }
    return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<UserDTO | null>(null);
    console.log("ProfileProvider mounted");

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};