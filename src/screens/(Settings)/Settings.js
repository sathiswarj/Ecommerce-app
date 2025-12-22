import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { User, Mail, Phone, Calendar, MapPin, Save } from 'lucide-react-native'

export default function Settings() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        dob: '',
        street: '',
        city: '',
        state: '',
        country: ''
    })

    const handleSave = () => {
        console.log('Saving settings:', formData)
    }

    return (
        <View className='flex-1 bg-gray-50'>
             <View className='bg-blue-500 pt-12 pb-6 px-4'>
                <Text className='text-2xl font-bold text-white'>Settings</Text>
                <Text className='text-blue-100 mt-1'>Manage your account information</Text>
            </View>

            <ScrollView 
                className='flex-1' 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                 <View className='bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm'>
                    <View className='flex-row items-center mb-4'>
                        <User size={20} color='#3b82f6' />
                        <Text className='text-lg font-bold text-gray-800 ml-2'>Personal Information</Text>
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Username</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='Enter your username'
                            placeholderTextColor='#9ca3af'
                            value={formData.username}
                            onChangeText={(text) => setFormData({...formData, username: text})}
                        />
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Email</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='Enter your email'
                            placeholderTextColor='#9ca3af'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            value={formData.email}
                            onChangeText={(text) => setFormData({...formData, email: text})}
                        />
                    </View>
                </View>

                 <View className='bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm'>
                    <View className='flex-row items-center mb-4'>
                        <Phone size={20} color='#3b82f6' />
                        <Text className='text-lg font-bold text-gray-800 ml-2'>Contact Information</Text>
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Phone Number</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='Enter your phone number'
                            placeholderTextColor='#9ca3af'
                            keyboardType='phone-pad'
                            value={formData.phone}
                            onChangeText={(text) => setFormData({...formData, phone: text})}
                        />
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Date of Birth</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='DD/MM/YYYY'
                            placeholderTextColor='#9ca3af'
                            value={formData.dob}
                            onChangeText={(text) => setFormData({...formData, dob: text})}
                        />
                    </View>
                </View>

                 <View className='bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm'>
                    <View className='flex-row items-center mb-4'>
                        <MapPin size={20} color='#3b82f6' />
                        <Text className='text-lg font-bold text-gray-800 ml-2'>Shipping Address</Text>
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Street Address</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='Enter street address'
                            placeholderTextColor='#9ca3af'
                            value={formData.street}
                            onChangeText={(text) => setFormData({...formData, street: text})}
                        />
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>City</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='Enter city'
                            placeholderTextColor='#9ca3af'
                            value={formData.city}
                            onChangeText={(text) => setFormData({...formData, city: text})}
                        />
                    </View>

                    <View className='flex-row justify-between mb-4'>
                        <View className='flex-1 mr-2'>
                            <Text className='text-sm font-semibold text-gray-700 mb-2'>State</Text>
                            <TextInput
                                className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                                placeholder='State'
                                placeholderTextColor='#9ca3af'
                                value={formData.state}
                                onChangeText={(text) => setFormData({...formData, state: text})}
                            />
                        </View>

                        <View className='flex-1 ml-2'>
                            <Text className='text-sm font-semibold text-gray-700 mb-2'>Country</Text>
                            <TextInput
                                className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                                placeholder='Country'
                                placeholderTextColor='#9ca3af'
                                value={formData.country}
                                onChangeText={(text) => setFormData({...formData, country: text})}
                            />
                        </View>
                    </View>
                </View>

                  <View className='mx-4 mt-6 mb-8'>
                    <TouchableOpacity 
                        onPress={handleSave}
                        className='bg-blue-500 p-4 rounded-xl flex-row items-center justify-center shadow-lg'
                        activeOpacity={0.8}
                    >
                        <Save size={20} color='white' />
                        <Text className='text-white font-bold text-lg ml-2'>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}