import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Video from 'react-native-video';
import { Header, isSet } from '../../../Components/Common';
import { baseUrl, imageUrl } from '../../../Components/Common/Address';
import { Blue_Header } from '../../../Components/Common/Blue_Header';
import { useFetch } from '../../../Components/Common/useFetch';
import { Black } from '../../../Components/InitialValue/Colors';

const { width } = Dimensions.get('screen');
const smallWidth = width / 3;

const modifyData = arr => {
    let finalData = [];
    let type1 = true;
    let type = 1;
    let add = true;

    for (let i = 0; i < arr.length; i += type1 ? 6 : 3) {
        let j = 0;
        let data = [];
        while (j < (type1 ? 3 : 6)) {
            arr[i + j] && data.push(arr[i + j]);
            j += 1;
        }
        finalData.push({
            id: '_' + Math.random().toString(36).substring(2, 9),
            data,
            type,
        });
        type1 = !type1;
        if (type == 1) {
            add = true;
        }
        if (type == 4) {
            add = false;
        }
        add ? type++ : type--;
    }
    return finalData;
};



function Explore(props) {
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const finalData = modifyData(data);
    const navigation = useNavigation();
    const { data: posts, doFetch } = useFetch('social/explore');


    const TypeOne = ({ item }) => {
        return (
            <View style={styles.row}>
                <View style={styles.flex}>
                    {
                        isSet(item.data[0]) &&
                        <View style={styles.item1}>
                            <CommonItempart data={item.data[0]} />
                        </View>
                    }
                    {
                        isSet(item.data[1]) &&
                        <View style={styles.item1}>
                            <CommonItempart data={item.data[1]} />
                        </View>
                    }

                </View>
                {
                    isSet(item.data[2]) &&
                    <View style={styles.item2}>
                        <CommonItempart data={item.data[2]} />
                    </View>
                }
            </View>
        );
    }

    const TypeTwo = ({ item }) => (
        <View style={[styles.row, styles.rowWrap]}>
            {item.data.map(x => (
                <View key={x} style={styles.item1}>
                    <CommonItempart data={x} />
                </View>
            ))}
        </View>
    );

    const TypeThree = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.item2}>
                <CommonItempart data={item.data[0]} />
            </View>
            <View style={styles.flex}>
                {
                    isSet(item.data[1]) &&
                    <View style={styles.item1}>
                        <CommonItempart data={item.data[1]} />
                    </View>
                }
                {
                    isSet(item.data[2]) && <View style={styles.item1}>
                        <CommonItempart data={item.data[2]} />
                    </View>
                }
            </View>
        </View>
    );

    const CommonItempart = ({ data }) => {
        const file = data["media"].split('.');
        const type = file[file.length - 1] == 'mp4' ? 'video' : 'image';
        return (
            <>
                {
                    data && <TouchableOpacity onPress={() => navigation.navigate('post', { data: data })} style={styles.item1Inner}>
                        {
                            type == 'video' ?
                                <>
                                    <Image
                                        source={{ uri: `${baseUrl}${imageUrl}social/${data["poster"]}` }}
                                        resizeMode='cover' style={{ ...styles.fill }} />

                                    <Image
                                        source={require('../../../assets/images/play.png')}
                                        resizeMode='cover' style={{ width: 30, height: 30, margin: 5, position: 'absolute' }} />

                                </> :

                                <Image
                                    source={{ uri: `${baseUrl}${imageUrl}social/${data["media"]}` }}
                                    resizeMode='cover' style={styles.fill} />
                        }

                    </TouchableOpacity>
                }
            </>
        )
    }

    useEffect(() => {
        setRefreshing(true)
        if (isSet(posts)) {
            setData(posts["data"])
            setRefreshing(false)
        }
    }, [posts, props.navigation])


    return (
        <>
            <Blue_Header {...props} />
            <FlatList
                refreshControl={<RefreshControl onRefresh={doFetch} refreshing={refreshing} />}
                data={finalData}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item }) => {
                    if (item.type == 1) return <TypeOne item={item} />;
                    if (item.type == 2) return <TypeTwo item={item} />;
                    if (item.type == 3) return <TypeThree item={item} />;
                    if (item.type == 4) return <TypeTwo item={item} />;
                }}             
            />

        </>
    )

}

export { Explore }

const styles = StyleSheet.create({
    row: { flexDirection: 'row', width: '100%' },
    rowWrap: { flexWrap: 'wrap' },
    flex: { flex: 1 },
    item1: { height: smallWidth, width: smallWidth, padding: 1 },
    item2: { height: smallWidth * 2, width: smallWidth * 2, padding: 1 },
    item1Inner: { flex: 1, backgroundColor: '#bbb' },
    index: { color: '#fff', fontSize: 20, position: 'absolute', bottom: 5, right: 5 },
    fill: { height: '100%', width: '100%' }
});

