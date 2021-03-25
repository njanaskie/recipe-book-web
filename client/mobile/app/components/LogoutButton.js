import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Feather } from "@expo/vector-icons";
import { useFirebaseContext } from '../context/firebase-context'

export default function LogoutButton() {
    const { logout } = useFirebaseContext()
    
    return (
        <View>
            <TouchableOpacity
                style={{ padding: 20 }}
                onPress={logout()}
            >
                <Feather name="log-out" />
            </TouchableOpacity>
        </View>
    )

}