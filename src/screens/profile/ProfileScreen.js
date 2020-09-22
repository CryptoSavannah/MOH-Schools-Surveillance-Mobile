import React from 'react';
import {
    ImageBackground,
    Image,
    Text,
    View,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import appStyles from '../../styles/app-style';
import styles from './style';


const MENU = [
    {
        id: 1, key: 'Verify phone', title: 'Verify phone',
    },
    {
        id: 2, key: 'Verifyemail', title: 'Verify email',
    },
    {
        id: 3, key: '2FA', title: '2FA',
    },
    {
        id: 3, key: 'Wallets', title: 'Wallets',
    },

];

class PersonalScreen extends React.Component {
    state = {
        loading: true,
        showLoginForm: false,
        isSaving: false,
    };


    render() {

            return (
                <View style={appStyles.container}>
                    <ImageBackground
                        source={require('../../assets/images/backgrounds/currency-bg.jpg')}
                        style={[appStyles.col_container, {flex: 2}]}>
                        <View style={[appStyles.col_container, {flex: 2}]}>
                            <TouchableOpacity
                                style={styles.edit_button}
                                onPress={() => alert('Edit profile')}
                            >
                                <Image
                                    source={require('../../assets/images/icons/pencil.png')}
                                    style={styles.edit_icon}
                                />
                            </TouchableOpacity>
                            <View style={{flex: 1}}>
                                <Image style={styles.avatar}
                                       source={require('../../assets/images/avatars/icons8-user-100.png')}
                                />
                            </View>

                        </View>
                        <View style={[appStyles.col_container, {flex: 1}]}>
                            <View style={appStyles.col_container}>
                                <Text style={[appStyles.white, appStyles.font_md]}>Christian</Text>
                                <Text style={[appStyles.white, appStyles.font_lg]}>xtianm4@gmail.com</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={[appStyles.col_container, {flex: 3}]}>
                        <SafeAreaView style={[appStyles.w_100, {flex: 1}]}>
                            <View>
                                <View style={{paddingLeft: 10}}>
                                    <TouchableOpacity
                                        style={{width: 110}}
                                    >
                                        <Text
                                            style={[appStyles.gray, appStyles.font_md, {
                                                paddingLeft: 10,
                                                paddingTop: 10,
                                            }]}>MY MENU</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <FlatList
                                        style={{marginTop: 15, marginBottom: 15}}
                                        data={MENU}
                                        ItemSeparatorComponent={() => {
                                            return (
                                                <View><View style={styles.separator}/></View>
                                            );
                                        }}
                                        renderItem={({item, index, separators}) => (
                                            <TouchableOpacity
                                                style={[appStyles.row_container, appStyles.w_100, styles.profile_item]}
                                            >
                                                <Text
                                                    style={[appStyles.font_lg, {color: Colors.blackMarlinColor}]}
                                                >{item.title}</Text>
                                                <Image
                                                    source={require('../../assets/images/icons/right-arrow.png')}
                                                    style={styles.right_arrow}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </View>
                        </SafeAreaView>
                    </View>
                </View>
            );
    }

}

export default PersonalScreen;
