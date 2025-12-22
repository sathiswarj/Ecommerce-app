import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ApiRequestGet } from '../../../data/service/ApiGetRequest';
import { Menu, Search } from 'lucide-react-native';

export default function Products() {
  const navigation = useNavigation();  
  const [searchQuery, setSearchQuery] = React.useState('');
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }

  useEffect(() => {
    const handleFetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ApiRequestGet.getAllProducts();
        setProducts(response.data);
        setFilteredProducts(response.data);
        console.log('Products fetched:', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    handleFetchProducts();
  }, []);

  const handleProductPress = (productId) => {
     navigation.navigate('ProductDetail', { productId });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      className="bg-white rounded-xl shadow-sm p-4 mb-3 flex-row"
      activeOpacity={0.7}
      onPress={() => handleProductPress(item.productId)}
    >
      {item.images && item.images.length > 0 ? (
        <Image
          source={{ uri: item.images[0] }}
          className="w-24 h-24 rounded-lg bg-gray-200"
          resizeMode="cover"
        />
      ) : (
        <View className="w-24 h-24 rounded-lg bg-gray-200 items-center justify-center">
          <Text className="text-gray-400 text-xs">No Image</Text>
        </View>
      )}
      <View className="flex-1 ml-4 justify-center">
        <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={2}>
          {item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : 'Product'}
        </Text>
        <Text className="text-sm text-gray-500 mb-2" numberOfLines={2}>
          {item.description ? item.description.charAt(0).toUpperCase() + item.description.slice(1) : 'No description'}
        </Text>
        {item.price && (
          <Text className="text-lg font-bold text-blue-600">
            ${item.price}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => (
    <View className="flex-1 items-center justify-center py-20">
      <Text className="text-gray-500 text-base">
        {searchQuery ? 'No products found' : 'No products available'}
      </Text>
    </View>
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
        <TouchableOpacity className="ml-3" activeOpacity={0.7}>
          <Menu size={24} color="#374151" />
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.productId?.toString() || Math.random().toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16 }}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
  )
}