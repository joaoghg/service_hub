import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import Router from './src/routes/Router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

    return (
        <SafeAreaProvider>
            <StatusBar style='auto' />
            <Router />
        </SafeAreaProvider>
    );

}
