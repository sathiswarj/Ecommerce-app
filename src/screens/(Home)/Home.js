import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView, StatusBar, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import exchange_img from '../../../assets/exchange_icon.png';
import hero_img from "../../../assets/hero_img.png";
import { Menu, ShoppingBag, ArrowRight } from 'lucide-react-native';
import { ApiRequestGet } from '../../../data/service/ApiGetRequest';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const { logout, userData } = useAuth();
  const [allProducts, setAllProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]); 

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

  const fetchAllProducts = async () => {
    try {
      const response = await ApiRequestGet.getAllProducts();
       
      if (response?.success && response?.data) {
         const bestSellerProducts = response.data.filter(product => product.bestSeller);
        const regularProducts = response.data.filter(product => !product.bestSeller);
        
        setAllProducts(regularProducts);
        setBestSellers(bestSellerProducts);
 
      }
    } catch (error) {
      console.error('Error fetching products:', error); 
      Alert.alert('Error', 'Failed to load products. Please try again.');
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);  

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center px-5 py-4 bg-white shadow-sm">
          <View className="flex-row items-center gap-2">
            <Image
              source={exchange_img}
              className="w-12 h-12"
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
            className="p-2.5 rounded-full bg-gray-100"
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
          <View className="bg-gradient-to-b from-gray-50 to-white">

            <View className="flex flex-row gap-6 relative">
              <Image
                source={hero_img}
                className="absolute inset-0 w-full h-full"
                resizeMode="cover"
              />

              <View className="flex-1 justify-center z-10 px-6 py-8">
                <Text className="text-4xl font-bold text-black/70 mb-3 leading-tight">
                  Latest{'\n'}Arrivals
                </Text>

                <TouchableOpacity
                  className="flex-row items-center gap-2 bg-black self-start px-6 py-3.5 rounded-full mt-2"
                  activeOpacity={0.8}
                  onPress={handleShopNow}
                >
                  <ShoppingBag size={18} color="#fff" />
                  <Text className="text-white font-bold text-sm">
                    SHOP NOW
                  </Text>
                  <ArrowRight size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

           {bestSellers.length > 0 && (
            <View className="px-5 py-8 ">
              <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row items-center gap-2 ">
                 <Text className="text-sm font-semibold text-gray-600 tracking-widest">
                  OUR BEST SELLERS
                </Text>
              </View>
                <View className="bg-yellow-400 px-3 py-1 rounded-full">
                  <Text className="text-xs font-bold text-gray-800">
                    ⭐ TOP PICKS
                  </Text>
                </View>
              </View>
              <ProductCard data={bestSellers} setData={setBestSellers} />
            </View>
          )}

           {allProducts.length > 0 && (
            <View className="px-5 py-8 bg-white">
               <View className="flex-row items-center gap-2 ">
                 <Text className="text-sm font-semibold text-gray-600 tracking-widest">
                  LATERST COLLECTIONS
                </Text>
              </View>
              <ProductCard data={allProducts} setData={setAllProducts} />
            </View>
          )}

           {bestSellers.length === 0 && allProducts.length === 0 && (
            <View className="px-5 py-16 items-center justify-center">
              <Text className="text-gray-500 text-lg">No products available</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;