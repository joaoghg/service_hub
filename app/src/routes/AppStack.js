import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../utils/Colors';

const Tab = createBottomTabNavigator();

export default function AppStack(){

    const defaultOptions = {
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarLabelStyle: {
            fontSize: 12
        }
    }

    return (
        <Tab.Navigator
            screenOptions={defaultOptions}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    tabBarLabel: 'Início', 
                    tabBarIcon: ({focused}) => <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={Colors.PRIMARY} /> 
                }} 
            />
            <Tab.Screen 
                name="Search" 
                component={Home} 
                options={{ 
                    tabBarLabel: 'Pesquisar',
                    tabBarIcon: ({focused}) => <Ionicons name={focused ? "search-sharp" : "search-outline"} size={24} color={Colors.PRIMARY} />  
                }} 
            />
            <Tab.Screen 
                name="Orders" 
                component={Home} 
                options={{ 
                    tabBarLabel: 'Pedidos',
                    tabBarIcon: ({focused}) => <Ionicons name={focused ? "bookmark-sharp" : "bookmark-outline"} size={24} color={Colors.PRIMARY} />  
                }} 
            />
            <Tab.Screen 
                name="Chat" 
                component={Home} 
                options={{ 
                    tabBarLabel: 'Mensagens',
                    tabBarIcon: ({focused}) => <Ionicons name={focused ? "chatbubble-ellipses-sharp" : "chatbubble-ellipses-outline"} size={24} color={Colors.PRIMARY} />   
                }} 
            />
            <Tab.Screen 
                name="Profile" 
                component={Home} 
                options={{ 
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({focused}) => <Ionicons name={focused ? "person-sharp" : "person-outline"} size={24} color={Colors.PRIMARY} />   
                }} 
            />
        </Tab.Navigator>
    )
}