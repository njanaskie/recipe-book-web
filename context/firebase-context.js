import React, { useEffect, useState, useContext, useReducer } from 'react';
import database, { firebase, googleAuthProvider } from '../src/firebase/firebase';
import { history } from '../src/routers/AppRouter';
import authReducer from '../src/reducers/auth'
import LoadingPage from '../src/components/LoadingPage'

const FirebaseContext = React.createContext()

export const useFirebaseContext = () => useContext(FirebaseContext)

const FirebaseProvider = ({ children }) => {
    const [auth, authDispatch] = useReducer(authReducer, [])
    // const authDispatch = useDispatch()
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState()
    const [isGuest, setIsGuest] = useState()
    const email = process.env.GUEST_EMAIL
    const password = process.env.GUEST_PASSWORD

    const login = () => {
        firebase.auth().signInWithPopup(googleAuthProvider).then(() => {
            authDispatch({ type: 'LOGIN' })
        })
    }

    const loginAsGuest = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            authDispatch({ type: 'LOGIN_AS_GUEST' })
        })
    }

    const logout = () => {
        firebase.auth().signOut().then(() => {
            authDispatch({ type: 'LOGOUT' })
        });
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
            setIsAdmin()
            setIsGuest()
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
                    } else if (userData.isGuest === true) {
                        const isGuest = userData.isGuest
                        setIsGuest(isGuest)
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
        <FirebaseContext.Provider value={{ user, isAdmin, isGuest, login, loginAsGuest, logout }}>
            {children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseProvider, FirebaseContext as default }