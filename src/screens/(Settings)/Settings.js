import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { User, Phone, MapPin, Save, ArrowLeft } from 'lucide-react-native'
import { ApiRequestGet } from '../../../data/service/ApiGetRequest'
import { ApiPostRequest } from '../../../data/service/ApiPostRequest'
import { useNavigation } from '@react-navigation/native'

export default function Settings() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const navigation = useNavigation()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    })

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true)
                const response = await ApiRequestGet.getOneUser()
                console.log('User data fetched:', response)
                
                if (response && response.user) {
                    const user = response.user
                    setFormData({
                        name: user.name || '',
                        email: user.email || '',
                        phone: user.phone || '',
                        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-GB') : '',
                        street: user.address?.street || '',
                        city: user.address?.city || '',
                        state: user.address?.state || '',
                        zipCode: user.address?.zipCode || '',
                        country: user.address?.country || 'India',
                    })
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
                Alert.alert('Error', 'Failed to load user data')
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [])

    const handleSave = async () => {
        if (!formData.name.trim()) {
            Alert.alert('Validation Error', 'Name is required')
            return
        }

        if (!formData.email.trim()) {
            Alert.alert('Validation Error', 'Email is required')
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address')
            return
        }

        if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)) {
            Alert.alert('Validation Error', 'Please enter a valid phone number (10-15 digits)')
            return
        }

        try {
            setSaving(true)
            
            const updateData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                dateOfBirth: formData.dateOfBirth,
                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                }
            }

            const response = await ApiPostRequest.updateUser(updateData)
            
            console.log('Update response:', response)
            Alert.alert('Success', 'Your information has been updated successfully')
        } catch (error) {
            console.error('Error updating user data:', error)
            Alert.alert('Error', 'Failed to update information. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <View className='flex-1 bg-gray-50 justify-center items-center'>
                <ActivityIndicator size='large' color='#3b82f6' />
                <Text className='text-gray-600 mt-4'>Loading your information...</Text>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-gray-50'>
            <View className='flex flex-row  gap-4 bg-blue-500 pt-12 pb-6 px-4'>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="w-8 h-8 items-center justify-center rounded-full bg-gray-100 mb-4"
                >
                    <ArrowLeft size={20} color="#000" />
                </TouchableOpacity>
                <View>
                    <Text className='text-2xl font-bold text-white'>Settings</Text>
                <Text className='text-blue-100 mt-1'>Manage your account information</Text>
                </View>
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
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Full Name *</Text>
                        <TextInput
                            className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                            placeholder='Enter your full name'
                            placeholderTextColor='#9ca3af'
                            value={formData.name}
                            onChangeText={(text) => setFormData({...formData, name: text})}
                        />
                    </View>

                    <View className='mb-4'>
                        <Text className='text-sm font-semibold text-gray-700 mb-2'>Email *</Text>
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
                            placeholder='Enter 10-15 digit phone number'
                            placeholderTextColor='#9ca3af'
                            keyboardType='phone-pad'
                            maxLength={15}
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
                            value={formData.dateOfBirth}
                            onChangeText={(text) => setFormData({...formData, dateOfBirth: text})}
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
                            <Text className='text-sm font-semibold text-gray-700 mb-2'>Zip Code</Text>
                            <TextInput
                                className='border border-gray-200 rounded-lg p-3 bg-gray-50 text-gray-800'
                                placeholder='Zip Code'
                                placeholderTextColor='#9ca3af'
                                keyboardType='numeric'
                                value={formData.zipCode}
                                onChangeText={(text) => setFormData({...formData, zipCode: text})}
                            />
                        </View>
                    </View>

                    <View className='mb-4'>
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

                <View className='mx-4 mt-6 mb-8'>
                    <TouchableOpacity 
                        onPress={handleSave}
                        disabled={saving}
                        className={`p-4 rounded-xl flex-row items-center justify-center shadow-lg ${
                            saving ? 'bg-blue-400' : 'bg-blue-500'
                        }`}
                        activeOpacity={0.8}
                    >
                        {saving ? (
                            <>
                                <ActivityIndicator color='white' size='small' />
                                <Text className='text-white font-bold text-lg ml-2'>Saving...</Text>
                            </>
                        ) : (
                            <>
                                <Save size={20} color='white' />
                                <Text className='text-white font-bold text-lg ml-2'>Save Changes</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}