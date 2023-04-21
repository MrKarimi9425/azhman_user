import { LayoutAnimation, Modal, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Black, Blue, Green, White, WhiteSmoke } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider_Question from './Slider_Question';
import { Formik } from 'formik';
import { Context } from '../../../Storage/Context';
import { Button, Input, isSet, UnDoneWork, useFetch, UserManual } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator } from 'react-native-paper';

const Content_Questions = (props) => {
  const { alertConfig, openAlert, GET_KEY } = useContext(Context);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [idQuestion, setIdQuestion] = useState(0);
  const { type, idItem } = props.route.params;
  const [radioSelected, setRadioSelected] = useState(0);
  const { replace } = useNavigation();
  const [checkbox] = useState([]);
  const [sendData] = useState({
    idItem: 0,
    questionAnswer: {},
    sendData: 1
  })
  const [selectedItem, setSelectedItem] = useState({});
  const [answer, setAnswer] = useState([]);
  const [open, setOpen] = useState(false);
  const [valuee, setValuee] = useState(null);
  const { data } = useFetch('question/add', false, 'POST', {
    idItem: idItem,
  });

  const { work } = UnDoneWork();
  const { manual } = UserManual();

  useEffect(() => {
    // دریافت سوالات از سرور
    console.log(data)

    if (isSet(data) && isSet(data["data"])) {
      // اضافه کردن آیدی آیتم به دیتای ارسال
      if (data["data"]["item"]) {
        sendData["idItem"] = data["data"]["item"]["id"];
      }
      // دریافت تعداد سوالات
      setQuestionIndex(data["data"]["question"].length)
      data["data"]["question"].forEach(item => {
        // دریافت اطلاعات دراپ دان
        // console.log(item.typeInput)
        // const find = dropDownItems.find(value => value)
        // if (find != 0) {
        //   if (item.typeInput == 'dropdown') {
        //     item['answer'].forEach(value => {
        //       dropDownItems.push({ 'label': value.title, 'value': value.id });
        //     })
        //   }
        // }
      })
    }
  }, [data])

  const { data: submit, doFetch, loading } = useFetch('question/add', true);
  useEffect(() => {
    // ارسال اطلاعات به سرور
    if (isSet(submit)) {
      if (isSet(submit["data"])) {
        if (submit.res == 0) {
          // فرستادن کاربر به کلاس کارهای انجام نشده
          work({
            type: submit["type"],
            id: submit["data"],
            navigation: props.navigation,
            msg: submit["msg"]
          })
        } else {
          type == "registering" ?
            // فرستادن کاربر به کلاس هدایت کاربر
            manual({
              id: submit["data"],
              navigation: props.navigation,
            }) :
            replace('user', { screen: 'Nutrition' })
        }
      }
    }

  }, [submit])

  const { data: del, doFetch: doFetchDel } = useFetch('activation/delete_buy_course', true);

  useEffect(() => {
    if (isSet(del)) {
      if (del.res != 0) {
        replace('user', { screen: 'Main' })
      }
    }
  }, [del])

  // چک میکنم که آیا آیدی آیتم انتخاب شده داخل 
  // آرایه وجود دارد یا خیر اگر بود پاک شود در غیر اینصورت اصافه شود
  function selectCheckBox(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let item = checkbox.filter(item => item == id)
    if (!item.length == 0) {
      const index = checkbox.indexOf(id)
      if (index > -1) {
        checkbox.splice(index, 1)
        setSelectedItem({ ...selectedItem, [id]: false })
      }
    } else {
      checkbox.push(id)
      setSelectedItem({ ...selectedItem, [id]: true })
    }
  }

  // چک میکنم که سوالات اجباری جواب داده شده باشند 
  // رفتن به سوال بعد یا اگر سوال آخر بود ارسال آن ها به سرور
  async function nextQuestion(id, value, requirement) {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleY,
      },
    });

    if (typeof value === 'undefined' || value == null || value == "" || value == 0 || value.length == 0) {
      if (requirement == 'not') {
        sendData['questionAnswer'][id] = value;
        if (questionIndex != idQuestion + 1) {
          setIdQuestion(idQuestion + 1)
        } else {
          doFetch(sendData)
        }
      } else {
        ToastAndroid.showWithGravity(
          'اجباری است',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        )
      }
    } else {
      sendData['questionAnswer'][id] = value;
      if (questionIndex != idQuestion + 1) {
        setIdQuestion(idQuestion + 1)
      } else {
        doFetch(sendData)
      }
    }
  }

  // type => text
  const textInput = (props) => {
    const [text, setText] = useState("");
    console.log({
      props: props,
    })

    const { title,
      answer,
      id,
      type,
      requirement } = props;
    return (
      <View style={styles.container}>
        <Text style={styles.radio.title}>{`${idQuestion + 1} . ${title}`}</Text>
        <Formik initialValues={{ [id]: '' }} onSubmit={(values, { setSubmitting }) => {
          nextQuestion(id, values[id], requirement);
          setSubmitting(false)
        }}>
          {
            ({
              handleBlur,
              handleChange,
              values,
              handleSubmit
            }) => <>

                <Input
                  handleBlur={handleBlur([id])}
                  handleChange={handleChange([id])}
                  placeholder={'اینجا تایپ کنید'}
                  values={values[id]}
                  style={{ width: '100%' }}
                />
                <Button onPress={handleSubmit}
                  title={questionIndex != idQuestion + 1 ? 'سوال بعدی' : 'اتمام سوالات'} />
                <Button onPress={() => {
                  doFetchDel({
                    idCourse: data["data"]["item"]["idCourse"]
                  })
                }}
                  type={'danger'} title={'حذف و بازگشت'} />
              </>
          }
        </Formik>
      </View>
    )
  }

  // type => checkBox
  const checkBox = (...props) => {
    return (
      <>
        {
          isSet(props) && props.map((value, index) => {
            return (
              <View key={index} style={styles.container}>
                <Text style={styles.radio.title}>{`${idQuestion + 1} . ${value["title"]}`}</Text>
                {
                  isSet(value["answer"]) && value["answer"].map((value2, index2) => {
                    return (
                      <Pressable key={index2} onPress={() => {
                        selectCheckBox(value2.id)
                      }}
                        style={[styles.radio.answer, selectedItem[value2.id] ? {
                          justifyContent: 'center',
                          backgroundColor: 'rgba(249, 249, 249, 1)',
                          elevation: 5,
                        } : null]}>
                        {
                          radioSelected == value2.id &&
                          <Entypo name='check' size={RFValue(12)} style={styles.radio.icon} />
                        }

                        <Text style={styles.radio.answerText}>{value2["title"]}</Text>

                      </Pressable>
                    )
                  })
                }

                <Button onPress={() => {
                  nextQuestion(value.id, checkbox, value.requirement);
                }}
                  title={questionIndex != idQuestion + 1 ? 'سوال بعدی' : 'اتمام سوالات'} />
                <Button onPress={() => {
                  doFetchDel({
                    idCourse: data["data"]["item"]["idCourse"]
                  })
                }}
                  type={'danger'} title={'حذف و بازگشت'} />
              </View>
            )
          })

        }
      </>
    )
  }

  // type => dropDown
  const dropdown = (...props) => {
    return (
      <>
        {
          isSet(props) && props.map((value, index) => {
            return (
              <View key={index} style={styles.container}>
                <Text style={styles.radio.title}>{`${idQuestion + 1} . ${value["title"]}`}</Text>
                <Picker
                  selectedValue={valuee}
                  onValueChange={setValuee}>
                  <Picker.Item
                    label={'انتخاب کنید'}
                    value={''}
                    enabled={false}
                  />
                  {
                    value.answer && value.answer.map((answer, index2) => <Picker.Item key={index2} label={answer.title} value={answer.id} />)
                  }
                </Picker>
                {/* <DropDownPicker
                  open={open}
                  placeholder={'انتخاب کنید'}
                  placeholderStyle={{ textAlign: 'center', fontFamily: 'BYekan' }}
                  textStyle={{ textAlign: 'center', fontFamily: 'BYekan' }}
                  style={{ borderWidth: 0, borderRadius: 15 }}
                  dropDownContainerStyle={{ borderWidth: 0, borderRadius: 15 }}
                  zIndex={999}
                  value={valuee}
                  items={answer}
                  setOpen={setOpen}
                  setValue={setValuee}
                /> */}
                <Button onPress={() => {
                  nextQuestion(value.id, valuee, value.requirement);
                }}
                  title={questionIndex != idQuestion + 1 ? 'سوال بعدی' : 'اتمام سوالات'} />
                <Button onPress={() => {
                  doFetchDel({
                    idCourse: data["data"]["item"]["idCourse"]
                  })
                }}
                  type={'danger'} title={'حذف و بازگشت'} />
              </View>
            )
          })

        }
      </>
    )
  }

  // type => radio
  const radio = (...props) => {
    return (
      <>
        {
          isSet(props) && props.map((value, index) => {
            return (
              <View key={index} style={styles.container}>
                <Text style={styles.radio.title}>{`${idQuestion + 1} . ${value["title"]}`}</Text>
                {
                  isSet(value["answer"]) && value["answer"].map((value2, index2) => {
                    return (
                      <Pressable key={index2} onPress={() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                        setRadioSelected(value2.id)
                      }}
                        style={[styles.radio.answer, radioSelected == value2.id ? {
                          justifyContent: 'space-between',
                          backgroundColor: 'rgba(249, 249, 249, 1)',
                          elevation: 5,
                          bottom: 2
                        } : null]}>
                        {
                          radioSelected == value2.id &&
                          <Entypo name='check' size={RFValue(12)} style={styles.radio.icon} />
                        }

                        <Text style={styles.radio.answerText}>{value2["title"]}</Text>

                      </Pressable>
                    )
                  })
                }

                <Button onPress={() => {
                  nextQuestion(value.id, radioSelected, value.requirement);
                }}
                  title={questionIndex != idQuestion + 1 ? 'سوال بعدی' : 'اتمام سوالات'} />
                <Button onPress={() => {
                  doFetchDel({
                    idCourse: data["data"]["item"]["idCourse"]
                  })
                }}
                  type={'danger'} title={'حذف و بازگشت'} />
              </View>
            )
          })

        }
      </>
    )
  }

  return (
    <>
      {
        loading &&
        <View style={styles.loading}>
          <ActivityIndicator size={"small"} color={Blue} />
        </View>
      }
      <Slider_Question count={questionIndex} idQuestion={idQuestion + 1} />
      {
        isSet(data.data) ?
          isSet(data["data"]["question"]) && data["data"]["question"].map((value, index) => {
            console.log('value',value)
            let config = {
              title: value.title,
              answer: value.answer,
              id: value.id,
              type: value.typeInput,
              requirement: value.requirement
            }
            if (idQuestion == index) {
              switch (value.typeInput) {
                case "dropdown":
                  return dropdown(config);
                  break;
                case "radio":
                  return radio(config);
                  break;
                case "checkBox":
                  return checkBox(config);
                  break;
                case "text":
                  return textInput(config);
                  break;
                default:
                  break;
              }
            }
          })
          : null
      }
    </>
  )
}

export default React.memo(Content_Questions);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(249, 249, 249, 1)',
    margin: 30,
    padding: 30,
    borderRadius: 20
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%', zIndex: 999,
    backgroundColor: White, width: 50, height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
    marginLeft: -25
  },
  radio: {
    answer: {
      marginTop: 10,
      paddingHorizontal: 10,
      padding: 5,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    title: {
      fontFamily: 'BYekan',
      fontSize: RFValue(14),
      color: Black
    },
    answerText: {
      fontFamily: 'BYekan',
      fontSize: RFValue(12),
      color: Black,
    },
    icon: {
      color: Green
    }
  }
})