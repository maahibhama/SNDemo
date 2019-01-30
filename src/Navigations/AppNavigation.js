import {
    Platform,
} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Routes from './Routes';
import LoginView from '../Views/LoginView';
import HomeView from '../Views/HomeView';

const AppNavigator = createStackNavigator(
    {
        [Routes.Login]: { screen: LoginView },
        [Routes.Home]: { screen: HomeView }
    },
    {
        navigationOptions: ({ navigation }) => ({
            gesturesEnabled: false
        }),
        initialRouteName: Routes.LoginView,
    }
);


export default createAppContainer(AppNavigator);