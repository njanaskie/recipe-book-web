import React, { useContext } from 'react';
import FirebaseContext from '../../context/firebase-context'
import useAdmin from '../hooks/useAdmin'

const Admin = () => {
    const isAdmin = useAdmin()

    return (
        <div>
            {isAdmin && <p>Admin User</p>}
        </div>
    )
}

export default Admin;