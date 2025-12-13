import { View, Text, TouchableHighlight, TextInput, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ApiPostRequest } from '../../../data/service/ApiPostRequest';
import { saveData, saveObject } from '../../../utils/storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiPostRequest.login(email, password);
      console.log("Login successful:", response);

      if (response.success === true) {
        await saveData('userToken', response.token || '');
        await saveData('userId', response.userId?.toString() || '');
        await saveData('userEmail', email);

        if (response.user) {
          await saveObject('userData', response.user);
        }
        await saveObject('loginResponse', response);

        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", response.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Error", error.message || "Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View className="flex-1 bg-black justify-center items-center p-2">
      <Text className="text-white text-2xl font-bold mb-8">
        Login into your account
      </Text>

      <View className="w-full px-4">
        <TextInput
          className="w-full h-12 p-4 mt-4 bg-white rounded-lg border border-gray-300 text-base text-center text-black"
          placeholder='Enter your email Id'
          placeholderTextColor="#666"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
        />
        <TextInput
          secureTextEntry={true}
          className="w-full h-12 p-4 mt-4 bg-white rounded-lg border border-gray-300 text-base text-center text-black"
          placeholder='Enter your password'
          placeholderTextColor="#666"
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />
        <TouchableHighlight
          className={`bg-white mt-6 w-full p-4 rounded-full ${loading ? 'opacity-60' : ''}`}
          underlayColor="#DDDDDD"
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text className="text-black text-lg font-semibold text-center">
              Login
            </Text>
          )}
        </TouchableHighlight>
      </View>

      <View className="flex-row mt-2.5 items-center">
        <Text className="text-white text-sm">Don't have an account? </Text>
        <TouchableHighlight onPress={handleSignup} disabled={loading}>
          <Text className="text-white text-sm font-bold underline">
            Sign up
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Login;