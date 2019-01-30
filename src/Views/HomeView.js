import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableHighlight, FlatList, Keyboard } from 'react-native';
import PropTypes from "prop-types";

import { Color } from '../Common/Colors';
import { AppFont } from '../Common/Fonts';

export default class HomeView extends Component {
    static navigationOptions = {
        header: null
    }

    static contextTypes = {
        presentActivityIndicator: PropTypes.func.isRequired,
        dismissActivityIndicator: PropTypes.func.isRequired,
        showAlert: PropTypes.func.isRequired
    };

    state = {
        name: "",
        phoneNumber: "",
        selectedGender: "Male",
        listData: [],
        userInfo: this.props.navigation.state.params.info
    }

    submitButtonAction() {
        Keyboard.dismiss()

        var messageString = ''
        if (this.state.name.length == 0) {
            messageString = "Please enter name"
        }
        else if (this.state.phoneNumber.length !== 10) {
            messageString = "Invalid telephone Number."
        }

        if (messageString.length > 0) {
            this.context.showAlert({ title: messageString })
            return
        }

        const info = {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.selectedGender
        }

        this.setState({
            listData: [...this.state.listData, ...[info]],
            name: "",
            phoneNumber: "",
            gender: "Male"
        })

    }

    selectGenderButton({ title }) {
        this.setState({ selectedGender: title })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.renderTopView()}
                {this.renderMiddleView()}
                {this.renderBottomView()}
            </SafeAreaView>
        );
    }

    renderTopView() {
        return (
            <View style={styles.topView}>
                <Text style={styles.headerTextStyle}>{"SUNTIST"}</Text>
                <Text style={styles.headerTextStyle}>{this.state.userInfo.name}</Text>
                <Text style={styles.headerTextStyle}>{this.state.userInfo.email}</Text>
            </View>
        )
    }

    renderMiddleView() {
        return (
            <View style={styles.middleView}>
                <TextInput
                    underlineColorAndroid={'transparent'}
                    ref={'nameTextField'}
                    placeholder={"Enter your name"}
                    placeholderTextColor={Color.placeholderText}
                    keyboardType={'default'}
                    autoCapitalize={'none'}
                    returnKeyType={'next'}
                    autoCorrect={false}
                    style={styles.inputViewStyle}
                    onChangeText={(text) => this.setState({ name: text })}
                    onSubmitEditing={(event) => { this.refs.phoneTextField.focus() }}
                    value={this.state.name}
                />
                <View style={styles.lineView} />
                <TextInput
                    underlineColorAndroid={'transparent'}
                    ref={'phoneTextField'}
                    placeholder={"Enter your telephone number"}
                    placeholderTextColor={Color.placeholderText}
                    keyboardType={'phone-pad'}
                    autoCapitalize={'none'}
                    returnKeyType={'done'}
                    autoCorrect={false}
                    style={styles.inputViewStyle}
                    onChangeText={(text) => this.setState({ phoneNumber: text })}
                    onSubmitEditing={(event) => { /*this.submitButtonAction()*/ }}
                    value={this.state.phoneNumber}
                />
                <View style={styles.lineView} />
                {this.renderGenderButtonsView()}
                <TouchableHighlight onPress={() => { this.submitButtonAction() }}
                    underlayColor={Color.themeBackground} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>{"Submit"}</Text>
                </TouchableHighlight>
            </View>
        )
    }

    renderGenderButtonsView() {
        return (
            <View style={styles.genderButtonView}>
                {this.renderGenderButton({ title: "Male" })}
                {this.renderGenderButton({ title: "Female" })}
            </View>
        )
    }

    renderGenderButton({ title }) {
        const buttonStyle = this.state.selectedGender === title ? { backgroundColor: Color.lightBorder } : {}
        const buttonTextStyle = this.state.selectedGender === title ? { color: Color.themeBackground } : {}
        return (
            <TouchableHighlight onPress={() => { this.selectGenderButton({ title: title }) }}
                underlayColor={Color.themeBackground} style={[styles.genderButton, buttonStyle]}>
                <Text style={[styles.genderButtonText, buttonTextStyle]}>{title}</Text>
            </TouchableHighlight>
        )
    }

    renderBottomView() {
        return (
            <View style={styles.bottomView}>
                <FlatList
                    extraData={this.state}
                    data={this.state.listData}
                    renderItem={this.renderItem}
                    ListHeaderComponent={this.renderListHeaderComponent}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.tableView}
                />
            </View>
        )
    }

    renderItem({ item }) {
        return (
            <View style={styles.renderItem}>
                <Text style={styles.headerNameText}>{item.name}</Text>
                <Text style={styles.headerText}>{item.phoneNumber}</Text>
                <Text style={styles.headerText}>{item.gender}</Text>
            </View>
        )
    }

    renderListHeaderComponent() {
        return (
            <View style={styles.listHeaderView}>
                <Text style={styles.headerNameText}>{"Name"}</Text>
                <Text style={styles.headerText}>{"Tel"}</Text>
                <Text style={styles.headerText}>{"Sex"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView: {
        padding: 10,
        paddingHorizontal: 20,
        height: 75,
        justifyContent: "center",
        backgroundColor: Color.themeDark
    },
    middleView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    headerTextStyle: {
        fontSize: AppFont.titleBold.size,
        fontFamily: AppFont.titleBold.name,
        fontWeight: AppFont.titleBold.weight,
        color: Color.themeBackground
    },
    inputViewStyle: {
        height: 40,
        width: 250,
        fontSize: AppFont.titleSmallMedium.size,
        fontFamily: AppFont.titleSmallMedium.name,
        fontWeight: AppFont.titleSmallMedium.weight,
        color: Color.themeDark
    },
    lineView: {
        height: 2,
        width: 250,
        backgroundColor: Color.lightBorder,
        marginBottom: 20
    },
    submitButton: {
        height: 50,
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: Color.placeholderText,
    },
    submitButtonText: {
        fontSize: AppFont.titleSmallMedium.size,
        fontFamily: AppFont.titleSmallMedium.name,
        fontWeight: AppFont.titleSmallMedium.weight,
        color: Color.themeBackground
    },
    genderButtonView: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "center"
    },
    genderButton: {
        height: 40,
        width: 100,
        marginLeft: 20,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Color.lightBorder
    },
    genderButtonText: {
        fontSize: AppFont.titleSmallMedium.size,
        fontFamily: AppFont.titleSmallMedium.name,
        fontWeight: AppFont.titleSmallMedium.weight,
        color: Color.placeholderText
    },
    tableView: {
        width: 250,
        height: 150,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Color.placeholderText
    },
    listHeaderView: {
        flexDirection: "row",
        height: 25,
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Color.placeholderText
    },
    headerNameText: {
        fontSize: AppFont.titleExtraSmallBold.size,
        fontFamily: AppFont.titleExtraSmallBold.name,
        fontWeight: AppFont.titleExtraSmallBold.weight,
        color: Color.themeDark,
        flex: 2,
        textAlign: "center"
    },
    headerText: {
        fontSize: AppFont.titleExtraSmallBold.size,
        fontFamily: AppFont.titleExtraSmallBold.name,
        fontWeight: AppFont.titleExtraSmallBold.weight,
        color: Color.themeDark,
        flex: 1,
        textAlign: "center"
    },
    renderItem: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: Color.placeholderText
    }
});
