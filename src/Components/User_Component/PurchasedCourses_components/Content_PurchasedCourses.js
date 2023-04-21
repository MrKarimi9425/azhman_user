import React, { useContext, useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Black, Blue, Gray, White, WhiteSmoke } from '../../InitialValue/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { Context } from '../../../Storage/Context';
import Option_PurchasedCourses from './Option_PurchasedCourses';
import { useNavigation } from '@react-navigation/native';
import { Button, EmptyPage, isSet, JDate, useFetch } from '../../Common';

const Content_PurchasedCourses = (props) => {
  const { openAlert, alertConfig, GET_KEY } = useContext(Context);

  const { riplace } = useNavigation();
  const [myData, setMyData] = useState([]);
  const [item] = useState([]);
  const [count, setCount] = useState(1);
  const { replace } = useNavigation();

  const { data: del, doFetch } = useFetch('activation/delete_buy_course', true);

  useEffect(() => {
    if (isSet(del)) {
      if (del.res != 0) {
        replace('user', {
          screen: 'Main'
        })
      }
    }
  }, [del])

  // دریافت اطلاعات از سرور
  const { data } = useFetch('course/show_course', false, 'POST', {
    idCourse: props.route.params.id,
  });
  let i = 1;
  useEffect(() => {
    if (isSet(data) && typeof isSet(data["data"])) {
      // ساختن آرایه ای از آیتم ها
      while (i < data["data"].length) {
        item.push(data["data"][i]["item"])
        i++
      }
      setMyData({
        avtivation: {
          dateStart: data["data"][0]["dateStart"],
          dateEnd: data["data"][0]["dateEnd"],
          price: data["data"][0]["price"],
        },
        course: data["data"][0]['course'],
        coach: data["data"][0]['coach'],
        item: item
      })
      // ساختن یک آرایه از اطلاعات دریافت شده از سرور

    }
  }, [data])


  return (
    <>
      {
        isSet(myData) ?
          isSet(myData) ?
            <>
              <Text style={{ ...styles.title, color: Black }}>جزئیات خرید شما</Text>
              <View style={styles.buttonContaienr}>
                <Button
                  onPress={() => {
                    doFetch({
                      idCourse: myData["course"]["id"]
                    })
                  }}
                  type={'danger'}
                  title={'حذف خرید'} />
                <Button
                  onPress={() => {
                    replace('user', {
                      screen: 'Factor',
                      params: { id: myData["course"]["id"] }
                    })
                  }}
                  title={'ادامه'} />

              </View>
              <View style={styles.cart}>
                <Text style={styles.title}>{myData["course"]["title"]}</Text>
                <View style={styles.des}>
                  <Text style={styles.text10}>{myData["course"]["des"]}</Text>
                </View>
                <View style={styles.items}>

                  <Option_PurchasedCourses image={require('../../../assets/images/calendar.png')}
                    title={'تاریخ اتمام دوره :'}
                    text={JDate(myData["avtivation"]["dateEnd"])}
                  />
                  <Option_PurchasedCourses image={require('../../../assets/images/calendar.png')}
                    title={'تاریخ شروع دوره :'}
                    text={JDate(myData["avtivation"]["dateStart"])}
                  />

                  <Option_PurchasedCourses image={require('../../../assets/images/date.png')}
                    title={'مدت استفاده :'}
                    text={`${myData["course"]["fewDays"]} روز`}
                  />
                </View>

                {
                  isSet(myData["item"]) &&
                  myData["item"].map((value, index) => {
                    return (
                      <View index={index} style={styles.item.container}>
                        <Text style={styles.item.title}>{value["title"]}</Text>
                        <View style={styles.des}>
                          <Text style={styles.text10}>{value["desShort"]}</Text>
                        </View>
                        {
                          <>
                            <View style={styles.items}>
                              <Option_PurchasedCourses image={require('../../../assets/images/calendar.png')}
                                title={'تاریخ شروع دوره :'}
                                text={JDate(value["dateStart"])}
                              />
                              <Option_PurchasedCourses image={require('../../../assets/images/calendar.png')}
                                title={'تاریخ اتمام دوره :'}
                                text={JDate(value["dateEnd"])}
                              />
                              <Option_PurchasedCourses image={require('../../../assets/images/cash.png')}
                                title={'قیمت :'}
                                text={`${value["price"]} تومان`}
                              />
                            </View>
                          </>
                        }
                      </View>
                    )
                  })

                }


              </View>

            </>
            : <EmptyPage text={data["msg"]} />
          : <View style={styles.loadingCard} />

      }
    </>
  )
}

export default React.memo(Content_PurchasedCourses);

const styles = StyleSheet.create({
  cart: {
    backgroundColor: White,
    elevation: 5,
    alignItems: 'center',
    padding: 15,
    // marginTop: 20,
    marginHorizontal: 15,
    marginVertical: 20,
    borderRadius: 25
  },
  loadingCard: {
    backgroundColor: 'rgba(238,238,238,0.78)',
    borderRadius: 25,
    flex: 1,
    margin: 10,
  },
  buttonContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  image: {
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 25,
    overflow: "hidden"
  },
  title: {
    fontFamily: 'BYekan',
    fontSize: RFValue(16),
    color: Blue,
    margin: 15,
    alignSelf: 'center'
  },
  text10: {
    fontFamily: 'BYekan',
    fontSize: RFValue(12),
    color: Gray,
    lineHeight:25,
    textAlign:'right'
  },
  text_white: {
    fontFamily: 'BYekan',
    fontSize: RFValue(12),
    color: White
  },
  des: {
    width: '100%',
    backgroundColor: WhiteSmoke,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 5,
    padding:5,

  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
  },
  item: {
    container: {
      width: '100%',
      marginTop: 15,
      backgroundColor: White,
      padding: 10,
      borderRadius: 20,
      elevation: 5
    },
    title: {
      fontSize: RFValue(14),
      fontFamily: 'BYekan',
      textAlign: 'center'
    }
  }
})