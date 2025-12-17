import { View, Text, TextInput } from 'react-native'
import React from 'react'

export default function Products() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <>
    <View className='p-4'>
      <View className='bg-white p-6 rounded-lg shadow-lg'>
          <TextInput 
            className='border border-gray-300 rounded-lg p-3 mb-4'
            placeholder='Search products...'
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            placeholderTextColor={"#6B7280"}

          />
          <View className='space-y-4'>
            <View className='p-4 bg-gray-100 rounded-lg'> 
              
            </View>
          
            </View>
        </View>
    </View>
    </>
  )
}