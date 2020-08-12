import React, { useContext } from 'react';
import { useFirebaseContext } from '../../context/firebase-context'

export const Admin = () => {
    const { user, isAdmin } = useFirebaseContext()

    return (
        <div className="content-container">
            <div className="page-header__admin">
                {isAdmin && <span>You are logged in as an Admin</span>}
            </div>
        </div>
    )
}

export default Admin;