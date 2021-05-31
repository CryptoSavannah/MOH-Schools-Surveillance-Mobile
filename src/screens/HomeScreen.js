import React, { useRef, useState, useCallback, useEffect, Component, Fragment } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions, Image,
  SafeAreaView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Button as ButtonF, Icon as IconF, Text as TextF } from "@99xt/first-born";
import Block from "../components/Block";
import Card from "../components/Card";
import Icon from "../components/Icon";
import * as theme from '../constants/theme';
import {
  LineChart
} from "react-native-chart-kit";
import axios from "axios";
import { DASH_LABEL_KEY, GRAPH_KEY } from '../../env.json';
import AsyncStorage from "@react-native-community/async-storage";
import Swiper from 'react-native-swiper';
import MenuCard from '../components/MenuCard';
import SurveyCard from '../components/SurveyCard';
import * as Animatable from 'react-native-animatable';

const HomeScreen = ({ route, navigation }) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const { fromDate } = route.params ?? {};
  const { toDate } = route.params ?? {};
  const [userToken, setUserToken] = useState('');
  const [center_no, setCenter_no] = useState('');
  const [school_id, setSchool_id] = useState('');

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#F3F6F9",
    backgroundGradientToOpacity: 0.2,
    color: (opacity = 1) => `rgba(19, 19, 19, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.6,
    useShadowColorFromDataset: false // optional
  };

  const DATA = [
    {
      id: '1',
      title: 'Fever',
      number: 8
    },
    {
      id: '2',
      title: 'Abdominal pain',
      number: 3
    },
    {
      id: '3',
      title: 'Headache',
      number: 20
    },
    {
      id: '4',
      title: 'Cough',
      number: 1
    },
    {
      id: '5',
      title: 'Weakness',
      number: 1
    },
    {
      id: '6',
      title: 'Vomiting',
      number: 0
    },
  ];

  function Item({ title, number }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Pending')}
        style={[styles.item, { alignItems: 'center', justifyContent: 'center' }]}
      >
        {/* <View style={[styles.item, {alignItems: 'center', justifyContent: 'center'}]}> */}
        {/* <Text style={styles.title}>{title}</Text> */}
        <Icon distance />
        <Text h3 style={{ marginTop: 17 }}>{number}</Text>
        <Text paragraph color="gray">{title}</Text>
        {/* </View> */}
      </TouchableOpacity>
    );
  }

  useEffect(() => {
    console.log('...starting...: ');
    if (typeof fromDate !== 'undefined') {
      console.log("fromDate: " + fromDate)
    }

    if (typeof toDate !== 'undefined') {
      console.log("toDate: " + toDate)
    }
    AsyncStorage.getItem('user')
      .then(user => {
        if (user === null) {
          // this.setState({loading: false, showLoginForm: true});
        } else {
          let usr = JSON.parse(user);
          setUserToken(usr.token);
          setCenter_no(usr.center_no);
          setSchool_id(usr.school_id);
          // fetchData();
          console.log('fetching... ' + usr.school_id);
        }
      })
      .catch(err => console.log(err));


    if (userToken === '') {

    } else {
      // loadConditions();
      // loadCases();
    }
  }, [userToken, fromDate, toDate]);

  const chartData = {
    labels: ["25/06", "30/06"],
    datasets: [
      {
        data: [20, 5, 10, 18, 10, 8, 11, 15, 11, 22, 7, 9, 10, 8, 11, 15, 11, 22, 7, 9],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Cases"] // optional
  };

  const openMenu = (pageName) => {
    // opening survey screen
    // console.log('Navigating: '+pageName)
    navigation.navigate(pageName);
  };

  const slides = [
    { id: 1, title: 'Option 1', },
    { id: 2, title: 'Option 2', },
    { id: 3, title: 'Option 3', },
    { id: 4, title: 'Option 4', },
    { id: 5, title: 'Option 5', },
  ];
  const menulist = [
    { id: 1, title: 'Recent Cases', color: '#FF4500', page: 'CasesScreen', items: DATA.slice(0, 5) },
    { id: 2, title: 'Recent Patients', color: '#FF4500', page: 'PatientsScreen', items: DATA.slice(0, 4)},
  ];

  const [banners, setBanners] = useState(slides);
  const [data, setData] = useState(menulist);

  //   return (
  //     <SafeAreaView style={styles.overview}>

  //       <ScrollView contentContainerStyle={{ paddingVertical: 25 }}>
  //         <FlatList
  //           horizontal
  //           pagingEnabled={true}
  //           showsHorizontalScrollIndicator={false}
  //           legacyImplementation={false}
  //           data={DATA}
  //           renderItem={({ item }) => <Item title={item.title} number={item.number} />}
  //           keyExtractor={item => item.id}
  //           style={{ width: SCREEN_WIDTH + 5, height: '50%', marginHorizontal: 5, flex: 1 }}
  //         />

  //         <ScrollView horizontal={true}>
  //           <LineChart
  //             data={chartData}
  //             width={SCREEN_WIDTH + 50}
  //             height={220}
  //             chartConfig={chartConfig}
  //             style={{ flex: 1, marginVertical: 15 }}
  //           />
  //         </ScrollView>
  //       </ScrollView>
  //     </SafeAreaView>
  //   );
  // };

  return (
    <>
    <View style={styles.container}>
      <View style={styles.header}>
        {
          <Swiper
            autoplay
            showsPagination={false}
          // horizontal={false}
          >
            {/*<Text style={styles.title}>Our sponsors</Text>*/}
            {banners.map(banner => (
              <Image key={banner.id} source={banner.url} style={styles.banner} />
            ))}
          </Swiper>
        }
      </View>

      <View
        style={[styles.footer, {
          backgroundColor: '#ebebeb',
        }]}
      >
        <ScrollView>

          <FlatList
            // contentContainerStyle={styles.listContainer}
            data={data}
            // horizontal={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <MenuCard
                  menutab={item}
                  // image={item.image}
                  onOpen={() => openMenu(item.page)}
                  navigation={navigation}
                />
              );
            }} />

          {/* <FlatList
            contentContainerStyle={styles.listContainer}
            data={data}
            // horizontal={false}
            numColumns={1}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <MenuCard
                  menutab={item}
                  // image={item.image}
                  onOpen={() => openMenu(item.page)}
                />
              );
            }} /> */}

        </ScrollView>
      </View>
    </View>
    <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => { navigation.navigate('NewCase'); }}>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Icon name="plus" size={25} color={'#fff'} />
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 0,
  },
  activityIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptycontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banrarea: {
    // flex: 1,
    // flexDirection: 'row'
  },
  banner: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  description: {
    fontSize: 12,
    color: 'gray',
    padding: 5,
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 4,
    paddingTop: 5,
  },
  logo: {
    width: 80,
    height: 80,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
  startText: {
    color: 'white',
  },
  footer: {
    flex: 4,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 5,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  balanceTxt: {
    color: '#eec971',
    fontWeight: 'bold',
    textAlign: 'center',
    // fontSize: 10
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    color: '#01579B',
    borderColor: '#fff',
    // marginTop: 10
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btns: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  followButton: {
    marginTop: 5,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  followButtonText: {
    color: '#dcdcdc',
    fontSize: 15,
  },
  list: {
    paddingHorizontal: 5,
    // backgroundColor:"#fff",
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor: '#e2e2e2',
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
  title: {
    flex: 1,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  floatingActionButton: {
    backgroundColor: 'orange',
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: '25%',
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
});
