import { View, Text, TouchableHighlight, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ApiPostRequest } from '../../../data/service/ApiPostRequest';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiPostRequest.register(name, email, password);
      console.log("Signup successful:", response);
      if (response.success === true) {
        setOtpSent(true);
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
      Alert.alert("Error", "Please enter otp");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const response = await ApiPostRequest.verifyOTP(otp);
      if (response.success === true) {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Otp error:", error);
      Alert.alert("Error", error.message || "Failed to verify otp. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 bg-black justify-center items-center p-2">
      <Text className="text-white text-2xl font-bold mb-8">
        Create your account
      </Text>

      <View className="w-full px-4">
        {!otpSent ? (
          <>
            <TextInput
              className="w-full h-12 p-4 mt-4 bg-white rounded-lg border border-gray-300 text-base text-black text-center"
              placeholder='Enter your username'
              placeholderTextColor="#666"
              keyboardType="default"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />
            <TextInput
              className="w-full h-12 p-4 mt-4 bg-white rounded-lg border border-gray-300 text-base text-black text-center"
              placeholder='Enter your email'
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
            <TextInput
              secureTextEntry={true}
              className="w-full h-12 p-4 mt-4 bg-white rounded-lg border border-gray-300 text-base text-black text-center"
              placeholder='Enter your password'
              placeholderTextColor="#666"
              keyboardType="default"
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <TouchableHighlight
              className={`mt-6 w-full p-4 rounded-lg ${loading ? 'bg-gray-400' : 'bg-white'}`}
              underlayColor="#DDDDDD"
              onPress={handleSignup}
              disabled={loading}
            >
              <Text className="text-black text-lg font-semibold text-center">
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableHighlight>
          </>
        ) : (
          <>
            <TextInput
              className="w-full h-12 p-4 mt-4 bg-white rounded-lg border border-gray-300 text-base text-black text-center"
              placeholder='Enter OTP'
              placeholderTextColor="#666"
              keyboardType="number-pad"
              autoCapitalize="none"
              value={otp}
              onChangeText={setOtp}
              editable={!loading}
              maxLength={6}
            />
            <TouchableHighlight
              className={`mt-6 w-full p-4 rounded-lg ${loading ? 'bg-gray-400' : 'bg-white'}`}
              underlayColor="#DDDDDD"
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              <Text className="text-black text-lg font-semibold text-center">
                {loading ? "Verifying..." : "Verify OTP"}
              </Text>
            </TouchableHighlight>
          </>
        )}
      </View>

      <View className="flex-row mt-5 items-center">
        <Text className="text-white text-sm">Already have an account? </Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text className="text-white text-sm font-bold underline">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;