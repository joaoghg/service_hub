import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import Router from './src/routes/Router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {

    return (
        <AuthProvider>
            <SafeAreaProvider>
                <PaperProvider>
                    <StatusBar style='auto' />
                    <Router />
                </PaperProvider>
            </SafeAreaProvider>
        </AuthProvider>
    );

}
