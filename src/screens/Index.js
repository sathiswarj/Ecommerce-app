import { View, Text, TouchableOpacity, StatusBar, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ShoppingBag, ArrowRight, Sparkles, TrendingUp, Shield } from 'lucide-react-native';

const Index = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <View className="flex-1 bg-black">
                 <View className="absolute inset-0 opacity-20">
                    <View className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl" />
                    <View className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
                </View>

                <View className="flex-1 justify-between px-6 py-12">
                     <Animated.View 
                        style={{ 
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }}
                        className="flex-1 justify-center items-center"
                    >
                         <View className="bg-white rounded-3xl p-6 mb-8 shadow-lg">
                            <ShoppingBag size={64} color="#000" strokeWidth={2} />
                        </View>

                         <Text className="text-white text-5xl font-bold text-center mb-4">
                            E-Buy
                        </Text>
                        <Text className="text-gray-400 text-lg text-center mb-12 px-4">
                            Your ultimate shopping destination for the latest trends
                        </Text>

                      
                    </Animated.View>

                     <Animated.View 
                        style={{ 
                            opacity: fadeAnim,
                        }}
                        className="space-y-4"
                    >
                        <TouchableOpacity
                            className="bg-white rounded-2xl py-4 flex-row items-center justify-center shadow-lg"
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text className="text-black text-lg font-bold">
                                Get Started
                            </Text>
                            <ArrowRight size={20} color="#000" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-gray-900 rounded-2xl py-4 flex-row items-center justify-center border border-gray-800"
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            <Text className="text-white text-lg font-bold">
                                Create Account
                            </Text>
                        </TouchableOpacity>

                        <Text className="text-gray-500 text-xs text-center mt-4">
                            By continuing, you agree to our Terms & Privacy Policy
                        </Text>
                    </Animated.View>
                </View>
            </View>
        </>
    );
};

export default Index;