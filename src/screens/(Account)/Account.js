import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { FileEdit, User2, ChevronRight } from 'lucide-react-native'
import { useAuth } from '../../../context/AuthContext'
import { ApiRequestGet } from '../../../data/service/ApiGetRequest';
import { useNavigation } from '@react-navigation/native';

export default function Account() {
  const { logout } = useAuth();
  const [userData, setUserData] = React.useState(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ApiRequestGet.getOneUser()
        console.log('User data fetched:', response);
        setUserData(response.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
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

  const links = [
    { id: 1, title: 'My Orders', description: "View and manage your orders", icon: 'box', screen: 'Orders' },
    { id: 2, title: 'Wish List', description: "View your saved items", icon: 'heart', screen: 'WishList' },
    { id: 3, title: 'Payment Methods', description: "Manage your payment options", icon: 'credit-card', screen: 'Payments' },
    { id: 4, title: 'Account Settings', description: "Update your account settings", icon: 'settings', screen: 'Settings', navigation: 'Settings' },
  ]

  return (
    <View className='h-full'>
      <View className='p-4 bg-blue-500 pt-12'>
        <View className='flex flex-row justify-between bg-blue-500'>
          <Text className='text-2xl font-bold text-white'>Account</Text>
          <FileEdit color='#fff' />
        </View>
        <View className='flex-row items-center space-x-8 my-4'>
          <View className='w-24 h-24 bg-blue-400 rounded-full justify-center items-center'>
            <User2 size={50} color='#fff' />
          </View>
          <View className='ml-4'>
            <Text className='text-lg font-semibold text-white'>{userData?.name}</Text>
            <Text className='text-gray-600 text-white'>{userData?.email}</Text>
          </View>
        </View>
      </View>
      <View className='p-4 space-y-4'>
        <FlatList
          data={links}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity className='flex-row justify-between items-center p-4 bg-white rounded-lg shadow mb-2' onPress={() => {
              if (item.navigation) {
                navigation.navigate(item.navigation);
              }
            }}>
              <View>
                <Text className='text-lg font-semibold'>{item.title}</Text>
                <Text className='text-gray-500'>{item.description}</Text>
              </View>
              <ChevronRight color='#3b82f6' size={24} />
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View>
              <TouchableOpacity
                onPress={handleLogout}
                className='bg-red-500 p-4 rounded-lg items-center'
              >
                <Text className='text-white font-semibold'>Logout</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </View>
  )
}