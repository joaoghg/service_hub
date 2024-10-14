import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import Router from './src/routes/Router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function App() {

    return (
        <SafeAreaProvider>
            <PaperProvider>
                <StatusBar style='auto' />
                <Router />
            </PaperProvider>
        </SafeAreaProvider>
    );

}
