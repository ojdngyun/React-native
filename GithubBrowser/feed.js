import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableHighlight
} from 'react-native';

const moment = require('moment');

const {height, width} = Dimensions.get('window');

export default class Feed extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            showProgress: true
        };

        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        this.fetchFeed();
    }

    onPress(value) {
        console.log('adfasdfasd');
    }

    fetchFeed() {
        require('./AuthService').getAuthInfo((err, authInfo) => {
            console.log(err);
            const url = 'https://api.github.com/users/'
                + authInfo.user.login
                + '/received_events';

            fetch(url, {
                headers: authInfo.header
            })
                .then(response => response.json())
                .then((responseData) => {
                    const feedItems = responseData.filter(ev => ev.type === 'PushEvent');
                    console.log(feedItems);
                    this.setState({
                        data: feedItems,
                        showProgress: false
                    });
                }).catch((error) => {
                console.log(error);
            });
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => {
                    this.onPress(0);
                }}
                underlayColor="#ddd"
            >
                <View style={styles.listItem}>
                    <Image
                        source={{uri: rowData.item.actor.avatar_url}}
                        style={styles.listItemImage}
                    />
                    <View style={styles.listItemTextContainer}>
                        <Text style={styles.listItemText}>{moment(rowData.item.created_at).fromNow()}</Text>
                        <Text style={styles.listItemText}>
                            <Text style={{fontWeight: '600'}}>{rowData.item.actor.login}</Text> pushed to</Text>
                        <Text style={styles.listItemText}>{rowData.item.payload.ref.replace('refs/heads/', '')}</Text>
                        <Text style={styles.listItemText}>
                            at <Text style={{fontWeight: '600'}}>{rowData.item.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <FlatList
                    data={this.state.data}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.created_at}
                    refreshing={this.state.showProgress}
                    onRefresh={() => {
                        this.setState({showProgress: true});
                        this.fetchFeed();
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        justifyContent: 'flex-start',
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    listItemImage: {
        height: 36,
        width: 36,
        borderRadius: 18
    },
    listItemTextContainer: {
        paddingLeft: 20
    },
    listItemText: {
        backgroundColor: '#fff'
    },
    row: {
        color: '#333',
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
});
