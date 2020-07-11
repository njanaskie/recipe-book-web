import React, { useContext } from 'react';
import { useFirebaseContext } from '../../context/firebase-context'

export const Admin = () => {
    const { user, isAdmin } = useFirebaseContext()

    return (
        <div>
            {isAdmin && <p>Admin User</p>}
        </div>
    )
}

export default Admin;