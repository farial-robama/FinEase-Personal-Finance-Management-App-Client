import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
    
    const [loading, setLoading] =useState(false)

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("auth_user")
        return storedUser ? JSON.parse(storedUser) : null;
    })


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    const signOutUser = () => {
        setLoading(true)
        localStorage.removeItem("auth_user")
        setUser(null)
        return signOut(auth)
        .finally(() => setLoading(false))
    }

    const getIdToken = async () => {
        if(!user) return null;
        return await auth.currentUser.getIdToken();
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            localStorage.setItem("auth_user", JSON.stringify(currentUser))
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    },[])

    const authInfo = {
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading,
        getIdToken
    }

    return(
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;