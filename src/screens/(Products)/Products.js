import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ApiRequestGet } from '../../../data/service/ApiGetRequest';
import { Menu, Search } from 'lucide-react-native';

export default function Products() {
  const navigation = useNavigation();  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }

  useEffect(() => {
    const handleFetchProducts = async () => {
      try {
        const response = await ApiRequestGet.getAllProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    handleFetchProducts();
  }, []);

  const handleProductPress = (product) => {
     navigation.navigate('ProductDetail', { product });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow-sm p-4 mb-3 flex-row"
      activeOpacity={0.7}
      onPress={() => handleProductPress(item)}
    >
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: item.images[0] }}
          className="w-24 h-24 rounded-lg"
        />
      )}
      <View className="flex-1 ml-4 justify-center">
        <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={2}>
          {item.name || 'Product'}
        </Text>
        <Text className="text-sm text-gray-500" numberOfLines={2}>
          {item.description || 'No description'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white flex-row items-center">
        <View className="flex-1 relative">
          <TextInput 
            className="bg-gray-100 rounded-xl px-4 py-3 pr-12 text-gray-900"
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />
          <View className="absolute right-12 top-3 h-6 w-px bg-gray-300" />
          <TouchableOpacity
            className="absolute right-4 top-3"
            onPress={handleSearch}
            activeOpacity={0.7}
          >
            <Search size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
        <Menu />
      </View>
      
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.productId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  )
}