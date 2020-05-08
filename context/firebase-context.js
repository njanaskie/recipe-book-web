import React, { useEffect, useState } from 'react';
import { firebase } from '../src/firebase/firebase';
import { history } from '../src/routers/AppRouter';
import LoadingPage from '../src/components/LoadingPage'

const FirebaseContext = React.createContext()

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <LoadingPage />
    }
    // if (user) {
    //     if (history.location.pathname === '/') {
    //         history.push('/dashboard')
    //     }
    // } else {
    //     history.push('/');
    // }


    return (
        <FirebaseContext.Provider value={{ user }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, FirebaseContext as default }