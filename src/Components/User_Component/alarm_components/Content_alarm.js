import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { Black } from '../../InitialValue/Colors';
import { Button, isSet, JDate, useFetch, UserManual } from '../../Common';
import { useNavigation } from '@react-navigation/native';

const Content_alarm = (props) => {
  const { manual } = UserManual();
  const { replace } = useNavigation();
  const { data } = useFetch('level/permission', false);

  useEffect(() => {
    if (isSet(data)) console.log('data ====>', data["data"])
  }, [data])

  const { data: del, doFetch } = useFetch('activation/delete_buy_course', true);
  useEffect(() => {
    if (isSet(del)) {
      if (del.res != 0) {
        replace('user', { screen: 'Main', params: { goBack: props.route.name } })
      }
    }
  }, [del])

  return (
    <>
      {
        isSet(data) &&
        <>
          {
            (isSet(data["data"]["analyze"]) && data["data"]["analyze"] == true) ?
              <View style={styles.container}>
                <Image source={require('../../../assets/images/blueCheck.png')} />
                <Text style={{ ...styles.title, color: 'green', fontSize: RFValue(18) }}>آنالیز بدن</Text>
                <Text style={styles.title}>شما اطلاعات خود را برای آنالیز بدن وارد نکردید</Text>
                <Text style={styles.title}>برای ثبت اطلاعات به صفحه آنالیز بدن مراجعه کنید</Text>
                <View style={styles.buttonContiner}>
                  <Button onPress={() => {
                    replace("user", { screen: 'Submit_Analysis' })
                  }} title={'آنالیز بدن'}
                    backgroundColor={'green'}
                  />
                </View>
              </View> :
              isSet(data.data["courseGroup"]) ?
                <FlatList data={data.data["courseGroup"]} renderItem={({item}) => {
                  return (
                    <View style={styles.container}>
                      <Image source={require('../../../assets/images/blueCheck.png')} />
                      <Text style={styles.title}>دوره{"\n"} <Text style={{ ...styles.title, color: 'green', fontSize: RFValue(18) }}>{item["title"]}</Text>{"\n"} با مربیگری {"\n"}<Text style={{ ...styles.title, color: 'green', fontSize: RFValue(18) }}>" {item["profile"]["name"]} {item["profile"]["lName"]} "</Text>{"\n"} برای شما ثبت شد</Text>
                      <Text style={styles.title}>لطفا مراحل ثبت نام را کامل کنید</Text>
                      <View style={styles.textContainer}>
                        <Text style={styles.text}>{`تاریخ شروع : ${JDate(item["dateStart"])}`}</Text>
                        <Text style={styles.text}>{`تاریخ پایان : ${JDate(item["dateEnd"])}`}</Text>
                      </View>
                      <View style={styles.buttonContiner}>
                        <Button onPress={() => {
                          manual({
                            id: item.id,
                            navigation: props.navigation,
                          })
                        }} title={'ادامه'} />
                        <Button
                          onPress={() => {
                            doFetch({
                              idCourse: item["id"]
                            })
                          }}
                          type={'danger'}
                          title={'حذف خرید'} />
                      </View>
                    </View>
                  )
                }} /> :
                isSet(data["data"]["profile"]) ?
                  <View style={styles.container}>
                    <Image source={require('../../../assets/images/blueCheck.png')} />
                    <Text style={{ ...styles.title, color: 'green', fontSize: RFValue(18) }}>پروفایل شما ناقص است</Text>
                    <Text style={styles.title}>لطفا اطلاعات پروفایل خود  را کامل کنید</Text>
                    <View style={styles.buttonContiner}>
                      <Button onPress={() => {
                        replace("user", { screen: 'EditProfile' })
                      }} title={'ویرایش پروفایل'}
                        backgroundColor={'green'}
                      />
                    </View>
                  </View>
                  :
                  null
          }
        </>
      }
    </>
  )
}

export default React.memo(Content_alarm)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    padding: 15,
    marginTop: 50,
    backgroundColor: 'rgba(242, 242, 242, 0.2)'
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: 'BYekan',
    margin: 20,
    color: Black,
    textAlign: 'center'
  },
  textContainer: {
    margin: 20,
  },
  text: {
    fontFamily: 'BYekan',
    fontSize: RFValue(14),
    alignSelf: 'flex-start',
    textAlign: 'right'
  },
  buttonContiner: {
    flexDirection: 'row',
    padding: 20,
    marginTop: 30
  }
})