import React, {PropTypes} from 'react';
import {Text, View, Modal} from 'react-native';
import {CardSection} from './CardSection';
import {Button} from './Button';
import {Card} from './Card';

const Confirm = ({children, visible, onAccept, onDecline}) => {
    const {
        containerStyle,
        textStyle,
        cardSectionStyle,
        cardStyle
    } = styles;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={() => {
            }}
        >
            <View style={containerStyle}>
                <Card style={cardStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Text style={textStyle}>
                            {children}
                        </Text>
                    </CardSection>

                    <CardSection style={{borderBottomWidth: 0}}>
                        <Button onPress={onAccept}>Yes</Button>
                        <Button onPress={onDecline}>No</Button>
                    </CardSection>
                </Card>
            </View>
        </Modal>
    );
};

Confirm.propTypes = {
    children: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    },
    cardStyle: {
        backgroundColor: '#fffc',
        marginLeft: 20,
        marginRight: 20
    }
};

export {Confirm};
