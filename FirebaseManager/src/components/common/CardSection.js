import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
    const {style, children} = props;
    return (
        <View style={[styles.containerStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        margin: 5,
        padding: 5,
        backgroundColor: '#fff0',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export {CardSection};
