import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/(Home)/Home';
import Products from '../screens/(Products)/Products';
import Cart from '../screens/(Cart)/Cart';
import Account from '../screens/(Account)/Account';
import { House, Search, ShoppingCart, User2 } from 'lucide-react-native';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0000ff',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
           tabBarIcon: ({ color, size }) => (
            <House  size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProductsTab" 
        component={Products}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <Search  size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="CartTab" 
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
           tabBarIcon: ({ color, size }) => (
            <ShoppingCart  size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="AccountTab" 
        component={Account}
        options={{
          tabBarLabel: 'Account',
           tabBarIcon: ({ color, size }) => (
            <User2  size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;