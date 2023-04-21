import { ToastAndroid } from "react-native";

export const ErrorMassages = (item = []) => {
    let errors = [];
    for (let i = 0; i < item.length; i++) {
        errors.push(
            {
                msg: item[i]
            }
        )
    }
    errors.forEach(value => {
        ToastAndroid.showWithGravity(
            value.msg,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        )
    })
}