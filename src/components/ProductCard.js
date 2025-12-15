import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ProductCard({ data, setData }) {
  if (!data || data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <Text className="text-gray-500">No products available</Text>
      </View>
    );
  }

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg shadow-md p-4 mr-4 w-40"
      activeOpacity={0.7}
    >
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0] }}
          className="w-full h-32 rounded-lg mb-3"
          resizeMode="cover"
        />
      )}
      <Text className="text-base font-bold text-gray-800 mb-1" numberOfLines={2}>
        {item.name || 'Product'}
      </Text>
      <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
        {item.description || 'No description'}
      </Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-gray-900">
          ₹{item.price || '0'}
        </Text>
        {item.bestSeller && (
          <View className="bg-yellow-400 px-2 py-1 rounded">
            <Text className="text-xs font-bold">Best</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderProduct}
      keyExtractor={(item, index) => item.productId }
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 8 }}
    />
  );
}