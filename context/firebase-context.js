import React, { useEffect, useState, useMemo } from 'react';
import { firebase } from '../src/firebase/firebase';
import { history } from '../src/routers/AppRouter';
import LoadingPage from '../src/components/LoadingPage'
import database from '../src/firebase/firebase'

const FirebaseContext = React.createContext()

const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState()

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
            setIsAdmin()
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (user) {
            database.collection('users').doc(user.uid).get()
            .then((doc) => {
                const userData = doc.data()
                if (userData) {
                    if (userData.isAdmin === true) {
                        const isAdmin = userData.isAdmin
                        setIsAdmin(isAdmin)
                        console.log('setting isAdmin: ', isAdmin)
                    }
                }
            })
        }
    }, [user])

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
        <FirebaseContext.Provider value={{ user, isAdmin }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, FirebaseContext as default }