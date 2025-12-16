import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { useAuth } from './context/AuthContext';
import Index from './src/screens/Index';
import Login from './src/screens/(Login)/Login';
import Signup from './src/screens/(Signup)/Signup';
import TabNavigator from './src/(tabs)/index';
import './global.css';

enableScreens();

const Stack = createNativeStackNavigator();

const App = () => {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName={userToken ? "MainTabs" : "Index"}
        screenOptions={{ headerShown: false }}
      >
        {userToken ? (
          <Stack.Screen name="MainTabs" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;