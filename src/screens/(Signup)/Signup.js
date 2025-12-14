import { View, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../../context/AuthContext"
import { ApiPostRequest } from '../../../data/service/ApiPostRequest';
import { Mail, Lock, User, Shield, ArrowRight, CheckCircle } from 'lucide-react-native';

const Signup = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Required Fields", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak Password", "Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiPostRequest.register(name, email, password);
      console.log("Signup successful:", response);
      if (response.success === true) {
        setOtpSent(true);
        Alert.alert("Success", "OTP sent to your email!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", error.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Required", "Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiPostRequest.verifyOTP(otp);
      if (response.success === true) {
        if (response.token) {
          await login(response.token, {
            name,
            email,
            ...response.user
          });
          Alert.alert("Welcome!", "Account verified successfully!");
        } else {
          Alert.alert("Success", "Account verified! Please login.");
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      console.error("OTP error:", error);
      Alert.alert("Error", error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
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
             <View className="mb-10">
              <Text className="text-white text-4xl font-bold mb-3">
                {otpSent ? 'Verify Email' : 'Create Account'}
              </Text>
              <Text className="text-gray-400 text-base">
                {otpSent 
                  ? 'Enter the 6-digit code sent to your email'
                  : 'Sign up to get started with your journey'
                }
              </Text>
            </View>

             <View className="space-y-4">
              {!otpSent ? (
                <>
                   <View className="mb-4">
                    <Text className="text-gray-300 text-sm font-medium mb-2 ml-1">
                      Full Name
                    </Text>
                    <View className="flex-row items-center bg-gray-900 rounded-2xl px-4 py-1 border border-gray-800">
                      <User size={20} color="#9CA3AF" />
                      <TextInput
                        className="flex-1 h-14 px-3 text-white text-base"
                        placeholder='John Doe'
                        placeholderTextColor="#6B7280"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                        editable={!loading}
                      />
                    </View>
                  </View>

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

                   <View className="mb-6">
                    <Text className="text-gray-300 text-sm font-medium mb-2 ml-1">
                      Password
                    </Text>
                    <View className="flex-row items-center bg-gray-900 rounded-2xl px-4 py-1 border border-gray-800">
                      <Lock size={20} color="#9CA3AF" />
                      <TextInput
                        secureTextEntry={true}
                        className="flex-1 h-14 px-3 text-white text-base"
                        placeholder='Min. 6 characters'
                        placeholderTextColor="#6B7280"
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        editable={!loading}
                      />
                    </View>
                  </View>

                   <TouchableOpacity
                    className={`flex-row items-center justify-center rounded-2xl py-4 ${
                      loading ? 'bg-gray-700' : 'bg-white'
                    }`}
                    onPress={handleSignup}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text className={`text-lg font-bold ${loading ? 'text-gray-400' : 'text-black'}`}>
                      {loading ? "Creating Account..." : "Sign Up"}
                    </Text>
                    {!loading && <ArrowRight size={20} color="#000" style={{ marginLeft: 8 }} />}
                  </TouchableOpacity>
                </>
              ) : (
                <>
                

                   <View className="mb-6">
                    <Text className="text-gray-300 text-sm font-medium mb-2 ml-1">
                      Code sent to {email}
                    </Text>
                    <View className="flex-row items-center bg-gray-900 rounded-2xl px-4 py-1 border border-gray-800">
                      <Shield size={20} color="#9CA3AF" />
                      <TextInput
                        className="flex-1 h-14 px-3 text-white text-base text-center tracking-widest"
                        placeholder='000000'
                        placeholderTextColor="#6B7280"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={setOtp}
                        editable={!loading}
                        maxLength={6}
                      />
                    </View>
                  </View>

                   <TouchableOpacity
                    className={`flex-row items-center justify-center rounded-2xl py-4 ${
                      loading ? 'bg-gray-700' : 'bg-white'
                    }`}
                    onPress={handleVerifyOtp}
                    disabled={loading}
                    activeOpacity={0.8}
                  >
                    <Text className={`text-lg font-bold ${loading ? 'text-gray-400' : 'text-black'}`}>
                      {loading ? "Verifying..." : "Verify & Continue"}
                    </Text>
                    {!loading && <ArrowRight size={20} color="#000" style={{ marginLeft: 8 }} />}
                  </TouchableOpacity>

                   <TouchableOpacity 
                    className="mt-4"
                    onPress={handleSignup}
                    disabled={loading}
                  >
                    <Text className="text-gray-400 text-center text-sm">
                      Didn't receive code? <Text className="text-white font-semibold">Resend</Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

             <View className="mt-8">
              <View className="flex-row justify-center items-center">
                <Text className="text-gray-400 text-base">
                  Already have an account? 
                </Text>
                <TouchableOpacity onPress={handleLogin} className="ml-1">
                  <Text className="text-white text-base font-bold">
                    Login
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

export default Signup