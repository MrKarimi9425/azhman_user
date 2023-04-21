import { useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect } from "react";
import { Context } from "../../Storage/Context";
import { UserManual } from "./UserManual";

const UnDoneWork = (flag = false) => {
    const { openAlert } = useContext(Context);
    const { replace } = useNavigation();
    useEffect(() => {
        if (flag) work
    }, [])

    const work = useCallback((props) => {
        switch (props["type"]) {
            case "null":
                // ادامه دهد نمایش پیام نارنجی
                openAlert('warning', 'اخطار', props["msg"])
                break;
            case "error":
                // نمایش پیام قرمز
                openAlert('error', 'خطا', props["msg"])
                break;
            case "action":
                replace('user', { screen: 'Alarm' });
                break;
            case "success":
                // ادامه دهد و نمایش پیام سبز
                openAlert('success', 'عملیات موفق', props["msg"])
                break;
            default:
                break;
        }
    }, [])
    return { work }
}
export { UnDoneWork }