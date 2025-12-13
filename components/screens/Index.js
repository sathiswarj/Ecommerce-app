import { View, Text, TouchableHighlight } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
    const navigation = useNavigation();
    
    return (
        <View className="flex-1 bg-black justify-center items-center p-2">
            <View className="w-full px-4">
                <Text className="text-white text-xl font-bold text-center mb-8">
                    Welcome To E-Buy!
                </Text>
                <TouchableHighlight
                    className="bg-white w-full p-4 rounded-full"
                    underlayColor="#DDDDDD"
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text className="text-black text-xl text-center">
                        Click
                    </Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

export default Index;