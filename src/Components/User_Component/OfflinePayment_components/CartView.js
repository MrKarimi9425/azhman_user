import { Image, ImageBackground, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

const CartView = () => {
    const { width } = useWindowDimensions();
    return (
        <View style={{...styles.card,height:width / 3}}>
            <Image resizeMode='contain' style={{width:width/3}} source={require('../../../assets/images/CARDDEBIT.jpg')}/>
        </View>
    )
}

export default React.memo(CartView)

const styles = StyleSheet.create({
    card:{
        justifyContent:'center',
        alignItems:'center',
    }
})