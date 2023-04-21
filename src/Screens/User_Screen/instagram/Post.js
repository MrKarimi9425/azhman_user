import moment from 'jalali-moment';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  FlatList,
  Pressable,
  Modal,
  ToastAndroid
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Button, isSet, useFetch } from '../../../Components/Common';
import { baseUrl, imageUrl } from '../../../Components/Common/Address';
import { Blue_Header } from '../../../Components/Common/Blue_Header';
import { Black, Blue, Gray, White } from '../../../Components/InitialValue/Colors';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { BallIndicator } from 'react-native-indicators';
import { RFValue } from 'react-native-responsive-fontsize';
import { RadioButton } from 'react-native-paper';

function Post(props) {
  const [state, setState] = useState({
    like: false,
    likes: 0,
    indicator: false,
  })
  const [report, setReport] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [type, setType] = useState('')
  const { doFetch } = useFetch('social/reaction', true);

  const { coach, media, poster, likes, caption, date, id } = props.route.params.data;
  const { data } = useFetch('social/like', false, 'POST', {
    post_id: id
  });
  const navigation = useNavigation();

  const setLike = () => {
    setState(prov => ({ ...prov, like: !prov.like, likes: !prov.like ? prov.likes + 1 : prov.likes - 1 }))
    doFetch({ post_id: id })
  }

  useEffect(() => {
    if (isSet(likes)) {
      setState(prov => ({ ...prov, likes: likes.length, like: data["data"] }))
    }
  }, [props.navigation, likes, data])

  useEffect(() => {
    let file = media.split('.');
    setType(file[file.length - 1] == 'mp4' ? 'video' : 'image')
  }, [media])



  const onLoadStart = () => {
    setState(pro => ({
      ...pro,
      indicator: true,
    }));
  }

  const onLoad = () => {
    setState(pro => ({
      ...pro,
      indicator: false,
    }));
  }

  const onBuffer = ({ isBuffering }) => {
    setState(pro => ({
      ...pro,
      indicator: isBuffering ? 1 : 0
    }));
  }

  const doRepeat = () => {
    setState(prov => ({ ...prov, indicator: true }))
  }

  const dontRepeat = () => {
    setState(prov => ({ ...prov, indicator: false }))
  }

  return (
    <View style={styles.container}>
      <Blue_Header {...props} />
      <View style={styles.postHeader}>
        <Text style={styles.postUsernameText}>{coach["userName"]}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('profile', { id: coach["idUser"] })}>
          <Image
            style={styles.postUserImage}
            source={{
              uri: `${baseUrl}${imageUrl}profile/${coach["img"]}`,
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={[styles.post, { marginTop: 0 }]}>
          <View style={styles.postContent}>
            {
              type == 'video' ?
                <>
                  <Video style={styles.postImage}
                    poster={`${baseUrl}${imageUrl}social/${poster}`}
                    repeat={true}
                    onBuffer={onBuffer}
                    onLoadStart={onLoadStart}
                    onLoad={onLoad}
                    onError={() => doRepeat()}
                    onPlaybackStalled={() => {
                      doRepeat()
                    }}
                    onPlaybackResume={() => {
                      dontRepeat();
                    }}

                    onEnd={() => {
                      doRepeat()
                    }}
                    resizeMode={'contain'} source={{ uri: `${baseUrl}${imageUrl}social/${media}` }} />
                  {
                    state.indicator &&
                    <BallIndicator
                      size={30}
                      style={{ position: 'absolute', margin: 20 }}
                      color={Blue}
                    />
                  }
                </>
                :
                <Image
                  style={styles.postImage}
                  source={{
                    uri:
                      `${baseUrl}${imageUrl}social/${media}`,
                  }}
                />
            }
          </View>
          <View style={styles.postActions}>
            <View style={styles.postActionsLeftView}>
              <TouchableOpacity onPress={setLike}
                style={[styles.postActionIcon, { paddingLeft: 0 }]}
              >
                <FontAwesome name='heart' color={state.like ? 'red' : '#ccc'} size={30} />
              </TouchableOpacity>
            </View>
            <Text>{state.likes} نفر پسندیده اند</Text>
          </View>
          <View style={styles.postDescView}>
            <Text style={styles.postDescUsernameText}>
              {coach["userName"]}
            </Text>
            <Text style={styles.postDescText}>
              {'\n'}{caption}
            </Text>
            <Text>{moment.utc(moment.unix(date).format('YYYY/MM/DD hh:mm:ss')).locale('fa').startOf('seconds').fromNow()}</Text>
          </View>
        </View>
        <Pressable onPress={() => setReportModal(true)} style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
          borderBottomWidth: 0.3,
        }}>
          <MaterialIcons name='keyboard-arrow-left' style={{ fontSize: RFValue(35), color: Black }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ marginRight: 15, fontFamily: 'BYekan', color: Black, fontSize: RFValue(14) }}>ثبت تخلفات و محتوای نامناسب</Text>
            <MaterialIcons name="report" style={{ fontSize: RFValue(30), color: "red" }} />
          </View>
        </Pressable>
      </ScrollView>
      <Modal visible={reportModal}>
        <View style={{ flex: 0.7, justifyContent: 'center', padding: 30 }}>
          <Text style={styles.reportQuestion}>مشکل در کدام قسمت پست است؟</Text>
          <View style={{ marginVertical: 25 }}>
            <RadioButton.Group onValueChange={setReport} value={report}>
              <View style={styles.reportItem}>
                <Text style={styles.reportItemText}>کلاهبرداری، نقص قوانین یا وقوع جرم</Text>
                <RadioButton value="1" />
              </View>
              <View style={styles.reportItem}>
                <Text style={styles.reportItemText}>محتوای نا مناسب</Text>
                <RadioButton value="2" />
              </View>
              <View style={styles.reportItem}>
                <Text style={styles.reportItemText}>سایر</Text>
                <RadioButton value="3" />
              </View>
            </RadioButton.Group>
          </View>
          <Button title="ثبت گزارش" onPress={() => {
            setReportModal(false);
            ToastAndroid.showWithGravity(
              "گزارش شما با موفقیت ثبت شد",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          }} backgroundColor={Blue} />
          <Button title="انصراف" onPress={() => {
            setReportModal(false);
          }} backgroundColor={Gray} />
        </View>
      </Modal>
    </View>
  );
}

export { Post }

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: White },
  contentView: {
    marginTop: 4,
  },
  post: {
    // borderWidth: 1,
    borderColor: '#f1f3f6',
  },
  postHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#dfe4ea',
    borderTopColor: '#dfe4ea',
    backgroundColor: '#fff',
  },
  postUserImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Blue
  },
  postUsernameText: {
    flex: 1,
    marginRight: 10,
    fontFamily: 'BYekan'
  },
  postContent: {
    backgroundColor: '#fafafa',
  },
  postImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  },
  postActions: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#dfe4ea',
    paddingVertical: 10,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postActionsLeftView: {
    display: 'flex',
    flexDirection: 'row',
  },
  postActionIcon: {
    paddingHorizontal: 6,
  },
  postDescView: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  postDescText: {
    fontSize: RFValue(14),
    fontFamily: 'BYekan',
    color: Black,
    marginBottom: 10,
    lineHeight: 25
  },
  postDescUsernameText: {
    fontFamily: 'BYekan',
    marginTop: 5,
    fontSize: RFValue(16),
    color: Black
  },
  reportItem: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  reportItemText: {
    fontSize: RFValue(14),
    fontFamily: 'BYekan',
    color: Black,
  },
  reportQuestion: {
    fontSize: RFValue(16),
    fontFamily: 'BYekan',
    color: Black,
  }
});