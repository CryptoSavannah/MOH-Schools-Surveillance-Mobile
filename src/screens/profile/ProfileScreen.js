import React, { useEffect, useState } from 'react'
import { Card } from 'native-base'
import {
    ImageBackground,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import Icon from 'react-native-ionicons'
import Icon from 'react-native-vector-icons/Ionicons';
import logo from '../../assets/logo.png';
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from '../../components/context';

const PersonalScreen = ({ navigation }) => {

    const { signOut } = React.useContext(AuthContext);

    const initialRegion = {
        latitude: 0.347947,
        longitude: 32.662294,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };


    // const [region, setRegion] = useState(initialRegion);

    const [station, setStation] = useState({
        center_no: '',
        location: ''
    });

    useEffect(() => {
        // AsyncStorage.getItem('user')
        //   .then(user => {
        //     if (user === null) {
        //       // this.setState({loading: false, showLoginForm: true});
        //     } else {
        //       let usr = JSON.parse(user);
        //       setUserToken(usr.token);
        //       console.log(JSON.stringify(usr));
        //       // fetchData();
        //     }
        //   })
        //   .catch(err => console.log(err));
    }, []);

    const renderHeader = () => {

        return (

            <SafeAreaView style={styles.mapContainer}>
                {/* <MapView initialRegion={initialRegion} style={styles.container}>
                    <Marker
                        title={station.center_no}
                        description={station.location}
                        coordinate={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude
                        }}
                    />
                </MapView> */}
                <Image
                    source={logo}
                    style={styles.imageStyle}
                />
            </SafeAreaView>
        )
    };

    // ********** @xtian, what are these methods about ********************
    const _pressCall = () => {
        const url = 'tel:+256794545069'
        Linking.openURL(url)
    }

    const _sendWhatApp = () => {
        Linking.openURL('whatsapp://send?text=hello&phone=+256794545069')
    };

    //******************************************************************* */

    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                {renderHeader()}

                <Card>
                    <View style={{ padding: 10 }}>
                        {/*contact us*/}

                        <TouchableOpacity>
                            <View style={[telStyles.container]}>
                                <View style={telStyles.iconRow}>
                                    <Icon name="ios-call" style={{ color: "#3a3838", }} size={26} />
                                </View>
                                <TouchableOpacity
                                    style={telStyles.telRow}>
                                    <View style={telStyles.telNumberColumn}>
                                        <Text style={telStyles.telNumberText}>Phone</Text>
                                    </View>
                                    <View style={telStyles.telNameColumn}>
                                        {/* <Text style={telStyles.telNameText}>256 787 344 529</Text> */}
                                        <Text style={telStyles.telNameText}></Text>

                                    </View>
                                </TouchableOpacity>
                                <View style={telStyles.smsRow}>
                                    <Icon
                                        ios="logo-whatsapp"
                                        android="logo-whatsapp"
                                        style={{ color: "#3a3838", }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*contact us*/}
                        <TouchableOpacity>
                            <View style={[telStyles.container]}>
                                <View style={telStyles.iconRow}>
                                    <Icon name="ios-home" style={{ color: "#3a3838", }} size={26} />
                                </View>
                                {/* <TouchableOpacity
                                    style={telStyles.telRow}>
                                    <View style={telStyles.telNumberColumn}>
                                        <Text style={telStyles.telNumberText}>Name</Text>
                                    </View>
                                    <View style={telStyles.telNameColumn}>
                                        <Text style={telStyles.telNameText}>Savannah High School</Text>
                                    </View>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    style={telStyles.telRow}>
                                    <View style={telStyles.telNumberColumn}>
                                        <Text style={telStyles.telNumberText}>Center</Text>
                                    </View>
                                    <View style={telStyles.telNameColumn}>
                                        <Text style={telStyles.telNameText}>U004</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={telStyles.smsRow}>
                                    <Icon
                                        ios="logo-whatsapp"
                                        android="logo-whatsapp"
                                        style={{ color: "#3a3838", }} />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/*Seperator line*/}
                        <View style={sepStyles.container}>
                            <View style={sepStyles.separatorOffset} />
                            <View style={sepStyles.separator} />
                        </View>

                        <TouchableOpacity>
                            <View style={[mailStyles.container]}>
                                <View style={mailStyles.iconRow}>
                                    {/*<Icon*/}
                                    {/*    name="ios-mail"*/}
                                    {/*    style={{color: "#3a3838",}}/>*/}
                                    <Icon name="ios-mail" style={{ color: "#3a3838", }} size={26} />
                                </View>
                                <TouchableOpacity
                                    style={mailStyles.emailRow}>
                                    <View style={mailStyles.emailColumn}>
                                        <Text style={mailStyles.emailText}>Email</Text>
                                    </View>
                                    <View style={mailStyles.emailNameColumn}>
                                        {/* <Text style={mailStyles.emailNameText}>info@gmail.com</Text> */}
                                        <Text style={mailStyles.emailNameText}></Text>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                        {/*Seperator line*/}
                        <View style={sepStyles.container}>
                            <View style={sepStyles.separatorOffset} />
                            <View style={sepStyles.separator} />
                        </View>

                        <TouchableOpacity>
                            <View style={[mailStyles.container]}>
                                <View style={mailStyles.iconRow}>
                                    <Icon
                                        name="md-globe"
                                        style={{ color: "#3a3838", }}
                                        size={26}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={mailStyles.emailRow}>
                                    <View style={mailStyles.emailColumn}>
                                        <Text style={mailStyles.emailText}>Website</Text>
                                    </View>
                                    <View style={mailStyles.emailNameColumn}>
                                        {/* <Text style={mailStyles.emailNameText}>www.savannahhigh.com</Text> */}
                                        <Text style={mailStyles.emailNameText}></Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>

                        {/*Seperator line*/}
                        <View style={sepStyles.container}>
                            <View style={sepStyles.separatorOffset} />
                            <View style={sepStyles.separator} />
                        </View>

                        {/*Location view*/}
                        <TouchableOpacity>
                            <View style={[mailStyles.container]}>
                                <View style={mailStyles.iconRow}>
                                    <Icon
                                        name="ios-pin"
                                        style={{ color: "#3a3838", }}
                                        size={26}
                                    />
                                </View>
                                <View style={mailStyles.emailRow}>
                                    <View style={mailStyles.emailColumn}>
                                        <Text style={mailStyles.emailText}>Location</Text>
                                    </View>
                                    <View style={mailStyles.emailNameColumn}>
                                        {/* <Text style={mailStyles.emailNameText}>
                                            P.O Box 25603, Kampala – Uganda,
                                            Bweyogerere
                                        </Text> */}
                                        <Text style={mailStyles.emailNameText}>Wakiso</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    {/* signout action */}
                    <TouchableOpacity onPress={() => { signOut() }}
                        style={{
                            elevation: 2, backgroundColor: '#F3F6F9',
                            shadowOpacity: 0.5, borderColor: '#F3F6F9', paddingTop: 25
                        }}>
                        <View style={[mailStyles.container]}>
                            <View style={mailStyles.emailRow}>
                                <View style={[mailStyles.emailColumn, { justifyContent: "space-around" }]}>
                                    <Text>Signout</Text>
                                    <Icon
                                        name="ios-exit"
                                        style={{ color: "#3a3838", }}
                                        size={26}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        // backgroundColor: '#FFF',
        // borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
    },
    mapContainer: {
        width: '100%',
        height: 270,
    },
    container: {
        flex: 1,
    },
    emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
    },
    headerColumn: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        height: 170,
    },
    placeIcon: {
        color: 'white',
        fontSize: 26,
    },
    scroll: {
        backgroundColor: '#FFF',
    },
    telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        // paddingTop: 30,
    },
    userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    userCityRow: {
        backgroundColor: 'transparent',
    },
    userCityText: {
        color: '#A5A5A5',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
    userImage: {
        borderColor: '#3a3838',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        // marginBottom: 15,
        width: 170,
    },
    userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingTop: 90,
        textAlign: 'center',
    },
    imageStyle:
    {
        resizeMode: 'center',
        width: '88%',
        height: '80%',
        position: 'absolute',
        top: '5%',
        // right: 10,
        alignSelf: 'center',
        // elevation: 10,
        borderRadius: 5
        // backgroundColor: 'yellow',
    },
});
const mailStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    emailColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        color: '#3a3838',
        fontSize: 30,
    },
    emailNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 16,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
    poweredBy: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20,
    },
    powerText: {
        fontSize: 16,
        textAlign: 'center'
    },
    powerColumn: {
        textAlign: 'center',
    },
    powerNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
        textAlign: 'center'
    },
});

const sepStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    separatorOffset: {
        flex: 2,
        flexDirection: 'row',
    },
    separator: {
        flex: 8,
        flexDirection: 'row',
        borderColor: '#EDEDED',
        borderWidth: 0.8,
    },
});

const telStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
    smsIcon: {
        color: 'gray',
        fontSize: 30,
    },
    smsRow: {
        flex: 2,
        justifyContent: 'flex-start',
    },
    telIcon: {
        color: '#3a3838',
        fontSize: 30,
    },
    telNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    telNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    telNumberColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    telNumberText: {
        fontSize: 16,
    },
    telRow: {
        flex: 6,
        flexDirection: 'column',
        // justifyContent: 'center',
    },
    powerColumn: {}
});

export default PersonalScreen
