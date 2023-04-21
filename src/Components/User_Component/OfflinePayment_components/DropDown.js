import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize';
import { Black, Gray, White } from '../../InitialValue/Colors';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDown = ({ title, items, value, setValue, empty }) => {
    const [open, setOpen] = useState(false);
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>{title}</Text>
            <DropDownPicker
                open={open}
                arrowIconContainerStyle={styles.arrowIconContainerStyle}
                ListEmptyComponent={() => (
                    <View style={styles.listEmptyComponent}>
                        <Text style={styles.emptyText}>{empty}</Text>
                    </View>
                )}
                placeholder={'انتخاب کنید'}
                placeholderStyle={styles.placeholderStyle}
                textStyle={styles.textStyle}
                style={styles.style}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
            />
        </View>
    )
}

export default React.memo(DropDown)

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 15,
        width: '100%',
        alignSelf: 'center'
    },
    title: {
        fontFamily: 'BYekan',
        fontSize: RFValue(12),
        color: Black
    },
    listEmptyComponent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: White,
        padding: 25
    },
    emptyText: {
        fontSize: RFValue(12),
        fontFamily: 'BYekan',
        color: Gray
    },
    placeholderStyle: {
        textAlign: 'center',
        fontFamily: 'BYekan'
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: 'BYekan'
    },
    style: {
        borderWidth: 0,
        borderBottomWidth: 1.5
    },
    dropDownContainerStyle: {
        borderWidth: 0,
        elevation: 5,
    },
    arrowIconContainerStyle: {
        position: 'absolute'
    }
})