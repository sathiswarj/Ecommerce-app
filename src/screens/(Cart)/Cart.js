import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ApiRequestGet } from '../../../data/service/ApiGetRequest'
import { Delete, Minus, Plus, Trash2 } from 'lucide-react-native'
import { ApiPostRequest } from '../../../data/service/ApiPostRequest'

export default function CartCard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const handleFetch = async () => {
      try {
        setLoading(true)
        const response = await ApiRequestGet.getAllCart();
        console.log('Cart response:', response.cartItems)
        setProducts(response.cartItems || [])
        setTotalAmount(response.totalAmount || 0)
        setTotalItems(response.totalItems || 0)
        setError(null)
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load cart items')
      } finally {
        setLoading(false)
      }
    }
    handleFetch();
  }, [])

const handleUpdateCart = async (productId, action, currentQuantity) => {
  try {
    if (action === 'increase') {
      await ApiPostRequest.addToCart({ productId })
    } else {
      const newQuantity = currentQuantity - 1
      if (newQuantity <= 0) {
        await ApiPostRequest.updateCart({ productId, val: 0 })
      } else {
        await ApiPostRequest.updateCart({ productId, val: newQuantity })
      }
    }
    // Refresh cart data after update
    const response = await ApiRequestGet.getAllCart();
    setProducts(response.cartItems || [])
    setTotalAmount(response.totalAmount || 0)
    setTotalItems(response.totalItems || 0)
  } catch (error) {
    console.error('Error updating cart:', error);
  }
}


const handleClearCart = () => {
  Alert.alert(
    'Clear Cart',
    'Are you sure you want to remove all items from your cart?',
    [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Clear Cart',
        style: 'destructive',
        onPress: async () => {
          try {
            console.log('🟢 Clearing cart...');
            
            const response = await ApiPostRequest.clearCart();
            
            console.log('🟢 Response:', response);
            
            if (response && response.success) {
              // Refresh from server
              const cartResponse = await ApiRequestGet.getAllCart();
              console.log('🟢 Cart after refresh:', cartResponse);
              
              setProducts(cartResponse.cartItems || []);
              setTotalAmount(cartResponse.totalAmount || 0);
              setTotalItems(cartResponse.totalItems || 0);
            }
          } catch (error) {
            console.error('🔴 Cart error:', error);
            Alert.alert('Error', 'Failed to clear cart. Please try again.');
          }
        }
      }
    ]
  );
};
  const renderItem = ({ item }) => {
    return (
      <View className='bg-white rounded-2xl p-4 mb-4 shadow-sm'>
        <View className='flex-row'>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              className="w-28 h-28 rounded-xl"
              resizeMode='cover'
            />
          ) : (
            <View className="w-28 h-28 rounded-xl bg-gray-100 items-center justify-center">
              <Text className="text-gray-400 text-xs font-medium">No Image</Text>
            </View>
          )}

          <View className='flex-1 ml-4 justify-between'>
            <View>
              <Text className='text-base font-semibold text-gray-900 mb-1' numberOfLines={2}>
                {item.name}
              </Text>
              <Text className='text-lg font-bold text-gray-900'>
                ${parseFloat(item.price).toFixed(2)}
              </Text>
            </View>

            <View className='flex-row justify-between items-center mt-2'>
              <View className='flex-row items-center bg-gray-100 rounded-lg px-1 py-1'>
                <TouchableOpacity
                  className='p-2'
                  onPress={() => handleUpdateCart(item.productId, 'decrease', item.quantity)}
                >
                  <Minus height={18} width={18} color="#374151" strokeWidth={2.5} />
                </TouchableOpacity>
                <Text className='text-base font-semibold text-gray-900 mx-3 min-w-[24px] text-center'>
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  className='p-2'
                  onPress={() => handleUpdateCart(item.productId, 'increase', item.quantity)}
                >
                  <Plus height={18} width={18} color="#374151" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>
              
              <Text className='text-lg font-bold text-blue-600'>
                ${parseFloat(item.itemTotal).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  if (loading) {
    return (
      <View className='flex-1 bg-gray-50 justify-center items-center'>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className='mt-4 text-gray-600 font-medium'>Loading cart...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View className='flex-1 bg-gray-50 justify-center items-center px-4'>
        <Text className='text-red-600 text-center text-base font-medium'>{error}</Text>
      </View>
    )
  }

  if (products.length === 0) {
    return (
      <View className='flex-1 bg-gray-50 justify-center items-center px-4'>
        <Text className='text-xl font-semibold text-gray-900 mb-2'>Your cart is empty</Text>
        <Text className='text-gray-500 text-center'>Add some items to get started</Text>
      </View>
    )
  }

  return (
    <View className='flex-1 bg-gray-50'>
      <View className='px-5 pt-6 pb-4 bg-white'>
        <Text className='text-3xl font-bold text-gray-900'>Shopping Cart</Text>
        <Text className='text-base text-gray-500 mt-1'>{totalItems} {totalItems === 1 ? 'item' : 'items'}</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.cartKey}
        showsVerticalScrollIndicator={false}
        contentContainerClassName='px-5 py-4 pb-32'
      />

      <View className='absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-5 py-5 shadow-2xl'>
 
        <View className='flex-row justify-between items-center mb-4'>
          <TouchableOpacity className='bg-red-500 py-3 px-6 rounded-lg' activeOpacity={0.8} onPress={handleClearCart}>
    <Text className='text-white font-semibold text-base text-center'><Trash2 /></Text>
  </TouchableOpacity>
          <View>
            <Text className='text-sm text-gray-500 mb-1'>Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})</Text>
            <Text className='text-2xl font-bold text-gray-900'>${parseFloat(totalAmount).toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity className='bg-blue-600 py-4 rounded-xl items-center shadow-sm' activeOpacity={0.8}>
          <Text className='text-white font-bold text-base'>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}