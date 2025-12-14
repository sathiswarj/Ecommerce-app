import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from "../../../context/AuthContext"
import { ApiPostRequest } from '../../../data/service/ApiPostRequest';
import { useNavigation } from '@react-navigation/native';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react-native';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Required Fields", "Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Invalid Password", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiPostRequest.login(email, password);
 
      if (response && response.success === true) {
        await login(response.token, {
          userId: response.userId,
          email: email,
          ...response.user
        });

        Alert.alert("Welcome Back!", "Login successful!");
      } else {
        Alert.alert("Login Failed", response?.message || "Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error details:", error);
      
      let errorMessage = "Failed to login. Please try again.";
      
      if (error.message) {
        if (error.message.includes('Network request failed')) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if (error.message.includes('timeout')) {
          errorMessage = "Request timed out. Please try again.";
        } else if (error.message.includes('401')) {
          errorMessage = "Invalid email or password.";
        } else if (error.message.includes('404')) {
          errorMessage = "Server endpoint not found. Please contact support.";
        } else if (error.message.includes('500')) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = error.message;
        }
      }
      
      Alert.alert("Login Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-black"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-12">
            {/* Header */}
            <View className="mb-10">
              <Text className="text-white text-4xl font-bold mb-3">
                Welcome Back
              </Text>
              <Text className="text-gray-400 text-base">
                Sign in to continue your journey
              </Text>
            </View>

             <View className="space-y-4">
               <View className="mb-4">
                <Text className="text-gray-300 text-sm font-medium mb-2 ml-1">
                  Email Address
                </Text>
                <View className="flex-row items-center bg-gray-900 rounded-2xl px-4 py-1 border border-gray-800">
                  <Mail size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 h-14 px-3 text-white text-base"
                    placeholder='you@example.com'
                    placeholderTextColor="#6B7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    editable={!loading}
                  />
                </View>
              </View>

               <View className="mb-2">
                <Text className="text-gray-300 text-sm font-medium mb-2 ml-1">
                  Password
                </Text>
                <View className="flex-row items-center bg-gray-900 rounded-2xl px-4 py-1 border border-gray-800">
                  <Lock size={20} color="#9CA3AF" />
                  <TextInput
                    secureTextEntry={!showPassword}
                    className="flex-1 h-14 px-3 text-white text-base"
                    placeholder='Enter your password'
                    placeholderTextColor="#6B7280"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
                  />
                  <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-2"
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#9CA3AF" />
                    ) : (
                      <Eye size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
 
               <TouchableOpacity
                className={`flex-row items-center justify-center rounded-2xl py-4 ${
                  loading ? 'bg-gray-700' : 'bg-white'
                }`}
                onPress={handleLogin}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text className={`text-lg font-bold ${loading ? 'text-gray-400' : 'text-black'}`}>
                  {loading ? "Signing In..." : "Login"}
                </Text>
                {!loading && <ArrowRight size={20} color="#000" style={{ marginLeft: 8 }} />}
              </TouchableOpacity>


 
            </View>

             <View className="mt-8">
              <View className="flex-row justify-center items-center">
                <Text className="text-gray-400 text-base">
                  Don't have an account? 
                </Text>
                <TouchableOpacity onPress={handleSignup} className="ml-1" disabled={loading}>
                  <Text className="text-white text-base font-bold">
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;