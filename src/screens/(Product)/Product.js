import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react-native';
import { ApiRequestGet } from '../../../data/service/ApiGetRequest';
const { width } = Dimensions.get('window');

export default function ProductDetail({ route, navigation }) {
  const { productId } = route.params;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    console.log('Adding to cart:', { productId, quantity });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await ApiRequestGet.getOneProduct(productId);
        setProduct(response.data);
        console.log('Product data:', response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return (
      <View className="flex-1 bg-gray-100">
        <View className="flex-row items-center justify-between px-5 pt-12 pb-4 bg-white">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Product Details</Text>
          <View className="w-10 h-10" />
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 bg-gray-100">
        <View className="flex-row items-center justify-between px-5 pt-12 pb-4 bg-white">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
          >
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Product Details</Text>
          <View className="w-10 h-10" />
        </View>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">Product not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-between px-5 pt-12 pb-4 bg-white">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
        >
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Product Details</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-gray-100">
          <Heart size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full h-96 bg-gray-100 items-center justify-center'>
          {product.images && product.images.length > 0 ? (
            <Image
              source={{ uri: product.images[selectedImage] }}
              className="w-full h-96"
              resizeMode="contain"
            />
          ) : (
            <View className='w-full h-96 bg-gray-200 items-center justify-center'>
              <Text className='text-gray-500'>No Image Available</Text>
            </View>
          )}
        </View>

        {product.images && product.images.length > 1 && (
          <View className='flex-row px-4 py-2'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {product.images.map((imgUrl, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImage(index)}>
                  <Image
                    source={{ uri: imgUrl }}
                    className={`w-20 h-20 rounded-lg mr-3 ${selectedImage === index ? 'border-2 border-blue-600' : 'border border-gray-300'}`}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        <View className="px-4 py-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {product.name ? product.name.charAt(0).toUpperCase() + product.name.slice(1) : 'Product'}
          </Text>

          <Text className="text-3xl font-bold text-blue-600 mb-4">
            ${product.price || '0.00'}
          </Text>

          <View className="flex-row items-center mb-6">
            <Text className="text-base font-semibold text-gray-900 mr-4">Quantity:</Text>
            <View className="flex-row items-center bg-gray-100 rounded-lg">
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 items-center justify-center"
              >
                <Text className="text-xl font-bold text-gray-700">-</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold text-gray-900 px-6">
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                className="w-10 h-10 items-center justify-center"
              >
                <Text className="text-xl font-bold text-gray-700">+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {product.description && (
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </Text>
              <Text className="text-base text-gray-600 leading-6">
                {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
              </Text>
            </View>
          )}

          {product.category && (
            <View className="mb-4">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Category
              </Text>
              <Text className="text-base text-gray-600">{product.category}</Text>
            </View>
          )}

          {product.stock !== undefined && (
            <View className="mb-6">
              <Text className="text-lg font-semibold text-gray-900 mb-2">
                Availability
              </Text>
              <Text className={`text-base font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="px-4 py-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          onPress={handleAddToCart}
          className="bg-blue-600 rounded-xl py-4 flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <ShoppingCart size={24} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-2">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}