import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Save object/array as JSON
export const saveObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving object:', error);
    return false;
  }
};

// Get data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

// Get object/array from JSON
export const getObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting object:', error);
    return null;
  }
};

// Remove data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing data:', error);
    return false;
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Get user token
export const getUserToken = async () => {
  return await getData('userToken');
};

// Get user data
export const getUserData = async () => {
  return await getObject('userData');
};

// Check if user is logged in
export const isLoggedIn = async () => {
  const token = await getUserToken();
  return token !== null && token !== '';
};

// Logout function
export const logout = async (navigation) => {
  try {
    await AsyncStorage.multiRemove(['userToken', 'userId', 'userEmail', 'userData', 'loginResponse']);
    if (navigation) {
      navigation.navigate('Login');
    }
    return true;
  } catch (error) {
    console.error('Error during logout:', error);
    return false;
  }
};