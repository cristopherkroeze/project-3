import { useState, useEffect, useContext } from "react";
import { AuthContext, AuthProvider } from "../context/auth.context";
import UserCard from "../components/UserCard"


import { get, post } from "../services/authService";

function UserProfilePage () {
    
    const { user } = useContext(AuthContext)
    const {authenticateUser} = useContext(AuthContext)

    useEffect(() => {
        authenticateUser();
      }, []);
      
    return (
        <div className="UserProfilePage">
            {
                user ?
                <>
                <UserCard {...user} />
                </>
                : <p>Loading...</p>
            }
            
              
        </div>
      );
}

export default UserProfilePage;