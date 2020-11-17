import { useState, useEffect } from 'react'
import database from '../firebase/firebase'
import { useFirebaseContext } from '../../context/firebase-context'

const useCustomTags = () => {
    const [customTags, setCustomTags] = useState()
    const { user } = useFirebaseContext()

    useEffect(() => {
        const unsubscribe = database.collection('users').doc(user.uid).collection('recipes')
        .onSnapshot((snapshot) => {
            const customTags = snapshot.docs.map((doc) => ({
                customTags: doc.customTags,
                // ...doc.data()
            }))

            // const customTags = docs.map(doc => doc.customTags)

            setCustomTags(customTags)
        });

        return () => unsubscribe()
        
    }, [])

    return customTags
}

export default useCustomTags