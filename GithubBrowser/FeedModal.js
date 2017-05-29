import React, {Component, PropTypes} from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';

import Button from './Button';

const imageOctocat = require('./res/Octocat.png');

export default class FeedModal extends Component {

    constructor(props) {
        super(props);

        this.onDimiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.props.onRequestClose();
        // this.props.bind(this.props.onRequestClose());
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                animationType={this.props.animationType}
                onShow={this.props.onShow}
                transparent={this.props.transparent}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.container}>
                    <View style={styles.modal}>

                        <TouchableOpacity>
                            <Text>asdfasdf</Text>
                        </TouchableOpacity>

                        <Button
                            style={styles.button}
                            key={this.props.name}
                            accessible
                            accessibilityLabel={this.props.name}
                            accessibilityTraits="button"
                            onPress={() => this.onDismiss()}
                        >
                            <View style={styles.tab}>
                                <Image
                                    style={{height: 20, width: 20, marginTop: 5}}
                                    source={imageOctocat}
                                />
                                <Text style={{flex: 1}}>
                                    {this.props.name}
                                </Text>
                            </View>
                        </Button>
                    </View>

                </View>
            </Modal>
        );
    }
}

FeedModal.defaultProps = {
    animationType: 'none',
    transparent: false,
    name: 'Dismiss'
};

FeedModal.propTypes = {
    animationType: PropTypes.oneOf(['none', 'slide', 'fade']),
    onShow: PropTypes.func,
    onRequestClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    transparent: PropTypes.bool,
    name: PropTypes.string,
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#0006',
    },
    modal: {
        flex: 1,
        marginTop: 20,
        margin: 15,
        borderRadius: 5,
        backgroundColor: '#F0F0F0',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    button: {
        height: 20,
        width: 100,
        backgroundColor: 'red',
        borderRadius: 5
    }
};

