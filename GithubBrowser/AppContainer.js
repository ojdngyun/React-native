import React, {Component} from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TabBarIOS,
    Dimensions,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTab from './DefaultTab';
import Feed from './Feed';

const imageOctocat = require('./res/Octocat.png');
const imageSearch = require('./res/Search.png');
const imageInbox = require('./res/Inbox.png');

const {height, width} = Dimensions.get('window');

export default class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'feed',
        };

        this.onPress = this.onPress.bind(this);
    }

    onPress(value) {
        console.log(value);
    }

    getButtonView() {
        return (
            <View
                style={{width: 150, height: 100, backgroundColor: 'gray'}}
            >
                <Image
                    style={{height: 50, width: 50}}
                    source={imageOctocat}
                />
            </View>
        );
    }

    getTouchableView() {
        if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    tabLabel="Inbox"
                    onPress={this.onPress(0)}
                >
                    {this.getButtonView()}
                </TouchableHighlight>
            );
        } else if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback
                    tabLabel="Search"
                    background={TouchableNativeFeedback.SelectableBackground()}
                    onPress={this.onPress(0)}
                >
                    {this.getButtonView()}
                </TouchableNativeFeedback>
            );
        }
        return null;
    }

    getTabView() {
        return (
            <ScrollableTabView
                style={styles.container}
                renderTabBar={() => <DefaultTab />}
                ref={(tabView) => {
                    this.tabView = tabView;
                }}
            >

                <View
                    tabLabel="Feed"
                    style={{height, width}}
                >
                    <Feed style={{height: height - 55}}/>
                </View>

                {this.getTouchableView()}

            </ScrollableTabView>
        );
    }

    getIOSTabView() {
        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title="feed"
                    selected={this.state.selectedTab === 'feed'}
                    icon={imageInbox}
                    onPress={() => this.setState({selectedTab: 'feed'})}
                >
                    <Feed />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="search"
                    selected={this.state.selectedTab === 'search'}
                    icon={imageSearch}
                    onPress={() => this.setState({selectedTab: 'search'})}
                >
                    <Text style={styles.welcome}>Tab 2</Text>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    render() {
        return (
            ((Platform.OS === 'ios') ? this.getIOSTabView() : this.getTabView())
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        marginTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    page: {
        flex: 0.1,
        flexDirection: 'column',
        backgroundColor: 'red',
    },
    text: {
        flex: 1,
        fontSize: 25,
        color: 'red',
        backgroundColor: 'black',
    },
});
