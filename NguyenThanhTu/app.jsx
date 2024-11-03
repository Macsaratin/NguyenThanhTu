import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';

import Home from './app/(tabs)/home';
import Cart from './app/Cart';
import Login from './app/Login';
import Products from './app/Products';
import Register from './app/Register';

const Stack = createStackNavigator();

export default function App() {
    const [cart, setCart] = useState([]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home">
                    {props => <Home {...props} cart={cart} setCart={setCart} />}
                </Stack.Screen>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Products">
                    {props => <Products {...props} cart={cart} setCart={setCart} />}
                </Stack.Screen>
                <Stack.Screen name="Cart">
                    {props => <Cart {...props} cart={cart} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
