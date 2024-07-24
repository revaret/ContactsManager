/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContactListScreen from './src/screens/ContactListScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';
import {Provider} from 'react-redux';
import store from './src/state/store';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="ContactListScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="ContactListScreen"
            component={ContactListScreen}
          />
          <Stack.Screen
            name="ContactFormScreen"
            component={ContactFormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
