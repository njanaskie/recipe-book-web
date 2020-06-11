import React, { useContext } from 'react';
import FirebaseContext from '../../context/firebase-context'
import useAdmin from '../hooks/useAdmin'

const Admin = () => {
    const { isAdmin } = useContext(FirebaseContext)
    // const isAdmin = useAdmin()

    console.log(isAdmin)
    return (
        <div>
            {isAdmin && <p>Admin User</p>}
        </div>
    )
}

export default Admin;