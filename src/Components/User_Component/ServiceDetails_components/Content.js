import {
  Image, LayoutAnimation, Platform,
  Pressable, StyleSheet, Text,
  UIManager, useWindowDimensions, View
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Black, Blue, Gray, Green, White, WhiteSmoke } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import Ripple from 'react-native-material-ripple';
import { CourseItem } from '../../InitialValue/CourseItem';
import Option from './Option';
import { ItemInfo } from '../../InitialValue/ItemInfo';
import { baseUrl, imageUrl } from '../../Common/Address';
import { Context } from '../../../Storage/Context';
import { Courses } from '../../Common/dataArray';
import { Button, isSet, JDate, UnDoneWork, useFetch, UserManual } from '../../Common';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

let image = [];

const Content = (props) => {
  const [items] = useState([]);
  const [optionShow, setOptionShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const { work } = UnDoneWork();
  const { manual } = UserManual();
  let cItem = new CourseItem();
  let iInfo = new ItemInfo();

  // دریافت اطلاعات
  const { data } = useFetch('course/show', false, 'POST', {
    idCourse: props.route.params.idCourse,
  });
  useEffect(() => {
    if (isSet(data)) {
      // فرستادن به فانکشن کارهای انجام نشده
      if (data.res != 1)
        work({
          type: data["type"],
          id: data.data.id,
          navigation: props.navigation,
          msg: data["msg"]
        })
      //دریافت عکس های دوره
      if (isSet(data["data"])) {
        data.data.image.forEach(item => {
          image.push(item.name)
        });

        //ساختن آبجکت برای انتخاب آیتم ها
        if (isSet(data["data"]) && isSet(data.data['item'])) {
          data.data['item'].forEach(value => {
            setSelectedItem({ ...selectedItem, [value.id]: false })
            if (value["display"] === "display") {
              if (value["withCourse"] === 'requirement') {
                items.push(value["id"])
              }
            } else {
              items.push(value["id"])
            }
          })
        }
      }
    }
  }, [data])


  // ارسال اطلاعات به سرور
  const { data: submit, doFetch } = useFetch('course/show', true);
  useEffect(() => {
    if (isSet(submit)) {
      if (isSet(submit["data"])) {
        if (submit.res == 0) {
          work({
            type: submit["type"],
            id: submit["data"]["id"],
            navigation: props.navigation,
          })
        } else {
          manual({
            id: submit["data"]["idCourse"],
            navigation: props.navigation,
          })
        }
      }
    }
  }, [submit])


  // نمایش بقیه جزییات و آیتم ها
  const showOptions = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOptionShow(!optionShow)
  }

  // انتخاب آیتم و قرار دادن آن در آرایه آیتم ها برای ارسال به سرور
  function selectItem(id) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let item = items.filter(item => item == id)
    if (!item.length == 0) {
      const index = items.indexOf(id)
      if (index > -1) {
        items.splice(index, 1)
        setSelectedItem({ ...selectedItem, [id]: false })
      }
    } else {
      items.push(id)
      setSelectedItem({ ...selectedItem, [id]: true })
    }
  }

  return (
    <View>
      {
        isSet(data["data"]) ?
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              {
                data.data.image.length !== 0 ?
                  <Image style={styles.image}
                    resizeMode={'cover'}
                    resizeMethod={'resize'}
                    source={{ uri: `${baseUrl}${imageUrl}course/${image[0]}` }} /> :
                  <View style={{
                    flex: 1,
                    backgroundColor: Blue
                  }} />
              }
            </View>
            <View style={styles.section1}>
              <Text style={styles.titleText}>{data.data.title}</Text>
            </View>
            <View style={styles.descriptoin}>
              <Text style={styles.text10}>
                {data["data"]["desShort"]}
              </Text>
            </View>

            <View style={styles.section2}>
              <Option image={require('../../../assets/images/date.png')}
                title={'مدت استفاده :'}
                text={`${data["data"]["fewDays"]} روز`}
              />
              <Option image={require('../../../assets/images/typeofcourse.png')}
                title={'نوع برگزاری دوره :'}
                text={cItem.typeCourse(data["data"]["typeCourse"])}
              />
              <Option image={require('../../../assets/images/Presentation.png')}
                title={'نحوه ارائه :'}
                text={cItem.isOnline(data["data"]["isOnline"])}
              />
              <Option image={require('../../../assets/images/typeofcourse.png')}
                title={'نوع دوره :'}
                text={cItem.type(data["data"]["type"])}
              />
              {
                optionShow &&
                <>
                  <Option image={require('../../../assets/images/calendar.png')}
                    title={'تاریخ شروع ثبت نام :'}
                    text={JDate(data["data"]["registrStart"])}
                  />
                  <Option image={require('../../../assets/images/calendar.png')}
                    title={'تاریخ اتمام ثبت نام :'}
                    text={JDate(data["data"]["registrEnd"])}
                  />
                  <Option image={require('../../../assets/images/calendar.png')}
                    title={'تاریخ شروع دوره :'}
                    text={JDate(data["data"]["dateStart"])}
                  />
                  <Option image={require('../../../assets/images/calendar.png')}
                    title={'تاریخ اتمام دوره :'}
                    text={JDate(data["data"]["dateEnd"])}
                  />
                  <Option image={require('../../../assets/images/cash.png')}
                    title={'قیمت :'}
                    text={`${data["data"]["price"]} تومان`}
                  />
                  <Option image={require('../../../assets/images/cash.png')}
                    title={'قیمت با تخفیف :'}
                    text={`${data["data"]["priceDiscounted"]} تومان`}
                  />

                  <View style={styles.descriptoin}>
                    <Text style={styles.text10}>
                      {data["data"]["des"]}
                    </Text>
                  </View>
                </>
              }
            </View>
            {
              optionShow &&
              isSet(data["data"]["item"]) && data["data"]["item"].map((value, index) => {
                return (
                  <>
                    {
                      value["display"] == "display" ?
                        value["withCourse"] == "unnecessary" ?
                          <Ripple rippleContainerBorderRadius={20} onPress={() => {
                            selectItem(value.id)
                          }} key={index}
                            style={[styles.items.container,
                            selectedItem[value.id] ? {
                              elevation: 10,
                              bottom: 2,
                              borderColor: Green,
                              borderWidth: 1.5,
                            } : null
                            ]}>
                            {
                              selectedItem[value.id] &&
                              <FontAwesome5 style={styles.items.icon} size={RFValue(18)} name='check-square' />
                            }
                            <Text style={{ fontSize: RFValue(14), fontFamily: 'BYekan', textAlign: 'center' }}>{value['title']}</Text>
                            {
                              !selectedItem[value.id] &&
                              <>
                                <View style={styles.descriptoin}>
                                  <Text style={styles.text10}>
                                    {value["desShort"]}
                                  </Text>
                                </View>

                                <View style={styles.section2}>
                                  <Option image={require('../../../assets/images/typeofcourse.png')}
                                    title={'نوع آپشن :'}
                                    text={iInfo.type(value["type"])}
                                  />
                                  <Option image={require('../../../assets/images/cash.png')}
                                    title={'قیمت :'}
                                    text={`${value["price"]} تومان`}
                                  />
                                </View>
                              </>
                            }
                          </Ripple>
                          : value["withCourse"] == "necessary" ? <View
                            style={[styles.items.container, {
                              elevation: 10,
                              bottom: 2,
                              borderColor: Green,
                              borderWidth: 1.5,
                            }
                            ]}>
                            <FontAwesome5 style={styles.items.icon} size={RFValue(18)} name='check-square' />
                            <Text style={{ fontSize: RFValue(14), fontFamily: 'BYekan', textAlign: 'center' }}>{value.title}</Text>
                          </View> : null
                        : null
                    }
                  </>


                )
              })
            }
            {
              optionShow ?
                <Button onPress={async () => {
                  doFetch({
                    idCourse: parseInt(data["data"]["id"]),
                    sendData: 1,
                    idItem: items
                  });
                }} title={'خرید و ادامه'}
                  type={'important'} /> :
                <Pressable onPress={() => showOptions()} style={styles.otherButton}>
                  <AntDesign style={styles.otherIcon} size={RFValue(14)} name='caretdown' />
                </Pressable>
            }
          </View>
          :
          Courses.map((value, index) => {
            return (
              <View style={styles.loadingCard} />
            )
          })
      }
    </View >
  )
}

export default React.memo(Content);

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: White,
    elevation: 5,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 15,
    borderRadius: 25,
    marginVertical: 30
  },
  loadingCard: {
    backgroundColor: 'rgba(238,238,238,0.78)',
    borderRadius: 15,
    width: '90%',
    height: 300,
    margin: 10,
    alignSelf: 'center'
  },
  section1: {
    alignItems: 'center',
  },
  section2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  button: {
    backgroundColor: '#1690FF',
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 25,
    overflow: "hidden"
  },
  titleText: {
    fontFamily: 'BYekan',
    fontSize: RFValue(16),
    color: Blue,
    margin: 15
  },
  descriptoin: {
    width: '100%',
    backgroundColor: WhiteSmoke,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    padding:5
  },
  text10: {
    fontFamily: 'BYekan',
    fontSize: RFValue(10),
    color: Gray,
    lineHeight:20,
    textAlign:'right'
  },
  otherText: {
    fontSize: RFValue(8),
    fontFamily: 'BYekan',
    color: Black
  },
  otherIcon: {
    color: Gray
  },
  otherButton: {
    backgroundColor: White,
    width: 40,
    position: 'absolute',
    height: 40,
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -20
  },
  items: {
    container: {
      width: '100%',
      marginTop: 15,
      backgroundColor: White,
      padding: 10,
      borderRadius: 20,
      elevation: 5
    },
    icon: {
      position: 'absolute',
      right: 10,
      top: 10,
      color: Green
    }
  }
})