import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './Navigators/StackNavigator';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './Redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <StackNavigation/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
