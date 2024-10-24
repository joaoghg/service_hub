import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import RegisterType from "../screens/RegisterType";
import VerifyEmail from "../screens/VerifyEmail";

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
            <Stack.Screen name="RegisterType" component={RegisterType} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        </Stack.Navigator>
    )
}