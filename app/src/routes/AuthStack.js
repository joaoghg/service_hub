import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createStackNavigator()

export default function AuthStack(){

    const screenOptions = {
        headerShown: false
    }

    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}