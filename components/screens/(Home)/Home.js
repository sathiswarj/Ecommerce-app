import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Logo from '../../../assets/image.png';
import { Menu } from 'lucide-react-native';

const Home = () => {
  return (
    <View className="px-2">
      <View>
        <Image source={Logo} className="w-24" style={{ resizeMode: 'contain' }} />
        <TouchableOpacity>
          <Menu />
          <Text>Hi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;