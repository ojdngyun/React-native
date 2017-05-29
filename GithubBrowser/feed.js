import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import FeedModal from './FeedModal';

const moment = require('moment');

const {height, width} = Dimensions.get('window');

export default class Feed extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            showModal: false,
            showProgress: true
        };
        this.onPress = this.onPress.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.onRequestClose = this.onRequestClose.bind(this);
    }

    componentDidMount() {
        this.fetchFeed();
    }

    onPress() {
        this.setState({showModal: true});
    }

    onRequestClose() {
        this.setState({showModal: false});
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
            <TouchableOpacity
                underlayColor="#ddd"
                onPress={() => {
                    this.onPress();
                }}
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
            </TouchableOpacity>
        );
    }

    render() {
        if (!this.state.showModal) {
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
        } else {
            return (
                <FeedModal
                    onRequestClose={() => {
                        this.onRequestClose();
                    }}
                    animationType="slide"
                    transparent
                    visible={this.state.showModal}
                />
            );
        }
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
