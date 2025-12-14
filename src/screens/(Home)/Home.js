import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native';
import React from 'react';
import { useAuth } from '../../../context/AuthContext'
import exchange_img from '../../../assets/exchange_icon.png';
import hero_img from "../../../assets/hero_img.png";
import { Menu, ShoppingBag, ArrowRight } from 'lucide-react-native';

const Home = () => {
  const { logout, userData } = useAuth();

  const handleMenuPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  const handleShopNow = () => {
    console.log('Shop now pressed');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row justify-between items-center px-5 py-4 bg-white shadow-sm">
          <View className="flex-row items-center gap-2">
            <Image
              source={exchange_img}
              className='w-12 h-12'
              resizeMode="contain"
            />
            <View>
              <Text className="text-xs text-gray-500">Welcome back</Text>
              <Text className="text-sm font-bold text-gray-800">
                {userData?.name || 'Guest'}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity
            className='p-2.5 rounded-full bg-gray-100'
            activeOpacity={0.7}
            onPress={handleMenuPress}
          >
            <Menu size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          className="flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View className="bg-gradient-to-b from-gray-50 to-white">
            <View className="px-5 pt-8 pb-4">
              {/* Badge */}
              <View className="flex-row items-center gap-2 mb-4">
                <View className="w-10 h-0.5 bg-gray-800" />
                <Text className="text-xs font-semibold text-gray-600 tracking-widest">
                  OUR BEST SELLERS
                </Text>
              </View>
              
              {/* Heading */}
              <Text className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Latest{'\n'}Arrivals
              </Text>
              
              {/* Shop Now Button */}
              <TouchableOpacity 
                className="flex-row items-center gap-2 bg-gray-900 self-start px-6 py-3.5 rounded-full mt-2"
                activeOpacity={0.8}
                onPress={handleShopNow}
              >
                <ShoppingBag size={18} color="#fff" />
                <Text className="text-white font-semibold text-sm">
                  SHOP NOW
                </Text>
                <ArrowRight size={18} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Hero Image */}
            <View className="mt-4">
              <Image 
                source={hero_img}
                className="w-full h-96"
                resizeMode="cover"
              />
            </View>
          </View>

           <View className="px-5 py-8">
            <Text className="text-2xl font-bold text-gray-900 mb-6">
              Featured Categories
            </Text>
            
            <View className="flex-row flex-wrap gap-3">
              {['New Arrivals', 'Best Sellers', 'On Sale', 'Trending'].map((category, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-1 min-w-[45%] bg-gray-100 rounded-2xl p-5 items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-800 font-semibold text-base">
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

           <View className="px-5 pb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-6">
              Quick Actions
            </Text>
            
            <View className="gap-3">
              <TouchableOpacity 
                className="bg-blue-50 rounded-2xl p-5 flex-row items-center justify-between"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    Track Order
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Check your order status
                  </Text>
                </View>
                <ArrowRight size={24} color="#3b82f6" />
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-purple-50 rounded-2xl p-5 flex-row items-center justify-between"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    Wishlist
                  </Text>
                  <Text className="text-sm text-gray-600">
                    View saved items
                  </Text>
                </View>
                <ArrowRight size={24} color="#a855f7" />
              </TouchableOpacity>

              <TouchableOpacity 
                className="bg-green-50 rounded-2xl p-5 flex-row items-center justify-between"
                activeOpacity={0.7}
              >
                <View>
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    Special Offers
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Limited time deals
                  </Text>
                </View>
                <ArrowRight size={24} color="#22c55e" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;