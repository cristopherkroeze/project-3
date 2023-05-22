import { useState, useEffect, useContext } from "react";
import { AuthContext, AuthProvider } from "../context/auth.context";
import UserCard from "../components/UserCard"


import { get, post } from "../services/authService";

function UserProfilePage () {
    
    const { user, setUser } = useContext(AuthContext)
    const {authenticateUser} = useContext(AuthContext)

   
    // useEffect(() => {
    //     console.log("USER IN PROFILE", user)
    //     authenticateUser();
    //     const userId = user._id
    //     get(`/auth/${userId}`)
    //       .then((response) => {
    //         const oneUser = response.data;
    //         setUser(oneUser)
    //       })
    //       .catch((error) => console.log(error));
    //   }, []);
      
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