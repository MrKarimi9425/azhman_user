import AsyncStorage from '@react-native-async-storage/async-storage';

const getStore = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value != null) {
            return data = {
                isLogin: true,
                auth_key: value
            }
        } else {
            return data = {
                isLogin: false,
                auth_key: null
            }
        }
    } catch (e) {
        console.log('get async storage error is :', e)
    }
}
const setStore = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log('set async storage error is :', e)
    }
}

const removeStore = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error("error ", error);
    }
}

export { getStore, setStore, removeStore }