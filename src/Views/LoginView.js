import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableHighlight } from 'react-native';
import App from './App';
import { AppFont } from '../Common/Fonts';
import { Color } from '../Common/Colors';
import { Logo } from '../Common/Assets';
import Routes from '../Navigations/Routes';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class LoginView extends Component {
    static navigationOptions = {
        header: null
    }


    initUser(token) {
        fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.props.navigation.navigate(Routes.Home, { info: json });
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderTopView()}
                {this.renderMiddleView()}
            </SafeAreaView>
        );
    }

    renderTopView() {
        return (
            <View style={styles.topView}>
                <Text style={styles.headerTextStyle}>{"SUNTIST"}</Text>
            </View>
        )
    }

    renderMiddleView() {
        return (
            <View style={styles.middleView}>
                <LoginButton
                    readPermissions={["public_profile", 'email']}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {

                                AccessToken.getCurrentAccessToken().then((data) => {
                                    const { accessToken } = data
                                    this.initUser(accessToken)
                                })
                                console.log(result)
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")}
                    style={styles.loginButtonStyle}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topView: {
        height: 75,
        justifyContent: "center",
        backgroundColor: Color.themeDark
    },
    middleView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerTextStyle: {
        textAlign: 'center',
        fontSize: 45,
        fontFamily: AppFont.titleBold.name,
        fontWeight: AppFont.titleBold.weight,
        letterSpacing: 2,
        color: Color.themeBackground,
    },
    facebookImage: {
        paddingHorizontal: 10,
        height: 40
    },
    loginButtonStyle: {
        height: 40,
        width: 250
    }
});
