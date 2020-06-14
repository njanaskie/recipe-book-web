import React, { useContext } from 'react';
import FirebaseContext from '../../context/firebase-context'

const Admin = () => {
    const { user, isAdmin } = useContext(FirebaseContext)

    return (
        <div>
            {isAdmin && <p>Admin User</p>}
        </div>
    )
}

export default Admin;