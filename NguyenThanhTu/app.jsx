import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Cart from './app/(tabs)/Cart';
import Home from './app/(tabs)/home';
import Login from './app/(tabs)/login';
import ProductDetail from './app/(tabs)/ProductDetail';
import Register from './app/(tabs)/register';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
