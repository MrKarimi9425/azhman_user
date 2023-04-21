import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useContext } from 'react';
import { Context } from '../../Storage/Context';
import { baseUrl, url } from './Address';
import { isSet } from './index'
const UserManual = (flag = false) => {
    const { GET_KEY, openAlert } = useContext(Context)
    const { replace } = useNavigation();
    useEffect(() => {
        if (flag) {
            manual();
        }
    }, []);

    const manual = useCallback(async (props) => {
        await fetch(`${baseUrl}${url}activation/access_check`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${GET_KEY}`
            },
            body: JSON.stringify({
                idCourse: props.id
            })
        }).then(response => response.json())
            .then(json => {
                if (isSet(json)) {
                    console.log({
                        class: 'manual',
                        type: json.type,
                    })
                    switch (json.type) {
                        case "error":
                            alert(json)
                            break;
                        case "requestNotLevel":
                            // پیام زمان ثبت نام به پایان رسیده است
                            replace('user', { screen: 'Main' })
                            break;
                        case "notDoing":
                            // صفحه فرم سوالات
                            replace('user',
                                {
                                    screen: 'Questions',
                                    params:
                                    {
                                        idItem: json["data"]["idItem"],
                                        type: 'registering'
                                    }
                                })
                            break;
                        case "doing":
                            // نمایش دوره های خریداری شده + پیام
                            replace('user',
                                {
                                    screen: 'PurchasedCourses',
                                    params:
                                        { id: json["data"]["idCourse"] }
                                })
                            openAlert('warning', 'تایید', json.msg)
                            break;
                        case "factorPaid":
                            // به صفحه اصلی و نمایش پیام ""
                            replace('user',
                                {
                                    screen: 'Main'
                                })
                            openAlert('success', 'تایید', json.msg)
                            break;
                        case "paymentOffline":
                            // نمایش پیام در انتظار کارشناس
                            replace('user',
                                {
                                    screen: 'Main'
                                })
                            openAlert('success', 'تایید', json.msg)
                            break;
                        case "factorIssued":
                            replace('user',

                                {
                                    screen: 'Factor',
                                    params:
                                    {
                                        id: json["data"]["idCourse"]
                                    }
                                });
                            // به صفحه فاکتور ها
                            break;
                        case "requestFullLevel":
                            replace('user',
                                {
                                    screen: 'ServiceDetails',
                                    params:
                                        { id: json["data"]["idCourse"] }
                                });
                            break;
                        default:
                            break;
                    }
                }
            }).catch(err => console.log(err))
    }, [])
    return { manual }
}

export { UserManual }