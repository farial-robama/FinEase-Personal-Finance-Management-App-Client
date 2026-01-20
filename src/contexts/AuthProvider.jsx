import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("auth_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // const signInWithGoogle = () => {
  //     setLoading(true)
  //     return signInWithPopup(auth, googleProvider)
  // }

  const signInWithGoogle = () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  //  const signInWithGoogle = () => {
  //   setLoading(true);
  //   const googleProvider = new GoogleAuthProvider();

  //   return signInWithPopup(auth, googleProvider)
  //     .then(result => {
  //       console.log("✅ Google Sign-In SUCCESS:", result);
  //       setLoading(false);
  //       return result;
  //     })
  //     .catch(error => {
  //       console.error("❌ Google Sign-In ERROR:");
  //       console.error("Error code:", error.code);
  //       console.error("Error message:", error.message);
  //       setLoading(false);
  //       throw error;
  //     });
  // };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const signOutUser = async () => {
    setLoading(true);
    localStorage.removeItem("auth_user");
    setUser(null);

    try {
      await signOut(auth);
    } catch (error) {
      toast.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIdToken = async () => {
    if (!user) return null;
    return await auth.currentUser.getIdToken();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      localStorage.setItem("auth_user", JSON.stringify(currentUser));
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    createUser,
    updateUserProfile,
    signInUser,
    signInWithGoogle,
    signOutUser,
    user,
    setUser,
    loading,
    getIdToken,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
