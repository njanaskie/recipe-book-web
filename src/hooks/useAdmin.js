// import { useContext, useEffect, useState, useRef, useMemo } from 'react'
// import database from '../firebase/firebase'
// import FirebaseContext from '../../context/firebase-context'
// import { useIsMount } from './useIsMount'

// const useAdmin = () => {
//     const isCurrent = useRef(true)
//     const { user } = useContext(FirebaseContext)
//     const [isAdmin, setIsAdmin] = useState()
//     const isMount = useIsMount()

//     const uid = user.uid

//     // useEffect(() => {
//     //     return () => {
//     //         isCurrent.current = false
//     //     }
//     // }, [])

//     useEffect(() => {
//         database.collection('users').doc(uid).get()
//         .then((doc) => {
//             if (isMount) {
//                 const userData = doc.data()
//                 if (userData.isAdmin) {
//                     const isAdmin = userData.isAdmin
//                     setIsAdmin(isAdmin)
//                 }
//             }
//         })

//     }, [])
//     console.log(isAdmin)

//     return isAdmin
// }

// export default useAdmin