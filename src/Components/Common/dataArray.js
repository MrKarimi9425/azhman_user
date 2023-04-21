import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'

const slider = [
    { id: 1, img: require('../../assets/images/rectangleButton.png') },
    { id: 2, img: require('../../assets/images/rectangleButton.png') },
    { id: 3, img: require('../../assets/images/rectangleButton.png') },
    { id: 4, img: require('../../assets/images/rectangleButton.png') },
    { id: 5, img: require('../../assets/images/rectangleButton.png') },
    { id: 6, img: require('../../assets/images/rectangleButton.png') },
]
const Online = [
    { id: 1, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 5 },
    { id: 2, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 3 },
    { id: 3, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 4 },
    { id: 4, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 1 },
    { id: 5, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 2 },
    { id: 8, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 3 },
    { id: 6, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 0 },
    { id: 7, name: 'مهساآنلاین', coachName: 'نام مربی', rate: 1 },
]

const Presence = [
    { id: 1, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 5 },
    { id: 2, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 3 },
    { id: 3, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 4 },
    { id: 4, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 1 },
    { id: 5, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 2 },
    { id: 6, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 0 },
    { id: 7, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 1 },
    { id: 8, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 3 },
    { id: 9, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 0 },
    { id: 10, name: 'مهساآنلاین', gym: 'باشگاه قدس', city: 'تهران', rate: 1 },
]

const Package = [
    { id: 1, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 2, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 3, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 4, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 5, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 6, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 7, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 8, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 9, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 10, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 11, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 12, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 13, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 14, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
    { id: 15, des: 'توضیحات', duration: 'دوره سه ماهه', count: 'تعداد دوره های همراه', price: 50000 },
]

const Courses = [
    { id: 1, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 2, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 3, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 4, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 5, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 6, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 7, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 8, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 9, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 10, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 11, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 12, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 13, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
    { id: 14, name: 'دوره سه ماهه', price: 'قیمت', count: 'تعداد روز', },
]

let InstagramImage = [
    { image: 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Lamborghini/Aventador/6721/Lamborghini-Aventador-SVJ/1621849426405/front-left-side-47.jpg?tr=w-880,h-495' },
    { image: 'https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o=' },
    { image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80' },
    { image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fyc3xlbnwwfHwwfHw%3D&w=1000&q=80' },
    { image: 'https://maserati.scene7.com/is/image/maserati/maserati/regional/us/hero-website-new-upload/221340M_1920x1080.jpg?$1920x2000$&fit=constrain' },
    { image: 'https://cdn.pixabay.com/photo/2012/04/12/23/48/car-30990__340.png' },
    { image: 'https://cdn.pixabay.com/photo/2012/04/12/23/48/car-30990__340.png' },
    { image: 'https://cdn.pixabay.com/photo/2012/04/12/23/48/car-30990__340.png' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
]

const Files = [
    { id: 1, name: 'فایل اول', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 2, name: 'فایل دوم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 3, name: 'فایل سوم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 4, name: 'فایل چهارم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 5, name: 'فایل پنجم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 6, name: 'فایل هفتم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 7, name: 'فایل هشتم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
    { id: 8, name: 'فایل نهم', image: 'https://im.rediff.com/300-300/money/2021/may/01bmw1.jpg' },
]
const Routes = [
    { id: 1, text: 'شنبه 1401/06/08' },
    { id: 2, text: 'شنبه 1401/06/08' },
    { id: 3, text: 'شنبه 1401/06/08' },
    { id: 4, text: 'شنبه 1401/06/08' },
    { id: 5, text: 'شنبه 1401/06/08' },
    { id: 6, text: 'شنبه 1401/06/08' },
    { id: 7, text: 'شنبه 1401/06/08' },
    { id: 8, text: 'شنبه 1401/06/08' },
]

const Answers = [
    { id: 1, text: 'امروز تمرین نداشتم' },
    { id: 2, text: 'قول میدم جلسات بعد پرقدرت کار کنم' },
    { id: 3, text: 'مهسا جون تمرینات رو انجام دادم' },
]


const CreateJob = [
    {
        id: 1, text: 'لاغری', children: [
            { id: 1, text: 'test' },
            { id: 2, text: 'test' },
            { id: 3, text: 'test' },
            { id: 4, text: 'test' },
        ]
    },
    {
        id: 2, text: 'تغذیه', children: [
            { id: 1, text: 'test' },
        ]
    },
    { id: 3, text: 'مشاوره' },
    { id: 4, text: 'روانشناسی' },
]

const firstMenu = [
    // {
    //     id: 1,
    //     text: 'لیست کلاس های ضبط شده کاربر',
    //     image: require('../../assets/images/Record.png'),
    //     screen: 'RecordedClasses'
    // },
    {
        id: 2,
        text: 'پخش زنده',
        image: require('../../assets/images/streming.png'),
        screen: 'LiveStreaming'
    },
    {
        id: 3,
        text: 'پیام رسان',
        image: require('../../assets/images/Topic.png'),
        screen: 'List_Ticket'
    },
    {
        id: 4,
        text: 'آنالیز بدن',
        image: require('../../assets/images/analytics.png'),
        screen: 'Show_Analysis'
    },
    {
        id: 5,
        text: 'اکسپلور',
        image: require('../../assets/images/explore.png'),
        screen: 'explore'
    },
]
const secondMunu = [
    {
        id: 1,
        text: 'برنامه غذایی',
        image: require('../../assets/images/program.png'),
        screen: 'Nutrition'
    },
    // {
    //     id: 2,
    //     text: 'برنامه غذایی',
    //     image: require('../../assets/images/consultation.png')
    // },
    // {
    //     id: 3,
    //     text: 'درباره آژمان',
    //     image: require('../../assets/images/doctor.png'),
    //     screen: 'AboutUs'
    // },
    // {
    //     id: 4,
    //     text: 'پزشک تغذیه',
    //     image: require('../../assets/images/doctor.png')
    // },
]
const drawerData = [
    {
        id: 1,
        text: 'صفحه اصلی',
        icon: () => <AntDesign name='home' size={RFValue(20)} style={{ width: 50, textAlign: 'center' }} />,
        screen: 'Main'
    },
    {
        id: 2,
        text: 'ویرایش پروفایل',
        icon: () => <FontAwesome5 name='user-edit' size={RFValue(20)} style={{ width: 50, textAlign: 'center' }} />,
        screen: 'EditProfile'
    },
    {
        id: 3,
        text: 'تیکت ها',
        icon: () => <MaterialCommunityIcons name='email-multiple' size={RFValue(20)} style={{ width: 50, textAlign: 'center' }} />,
        screen: 'List_Ticket'
    },
    {
        id: 4,
        text: 'کلاس های من',
        icon: () => <MaterialIcons name='class' size={RFValue(20)} style={{ width: 50, textAlign: 'center' }} />,
        screen: 'MyClasses'
    },
    {
        id: 5,
        text: 'تجزیه و تحلیل بدن',
        icon: () => <Ionicons name='body' size={RFValue(20)} style={{ width: 50, textAlign: 'center' }} />,
        screen: 'Show_Analysis'
    },
    {
        id: 6,
        text: 'اکسپلور',
        icon: () => <MaterialIcons name='explore' size={RFValue(20)} style={{ width: 50, textAlign: 'center' }} />,
        screen: 'explore'
    },
]


export {
    slider, Online, 
        firstMenu,
    secondMunu,
    Presence,
    Package,
    Courses,
    InstagramImage,
    Files,
    Routes, Answers, CreateJob,
    drawerData
}