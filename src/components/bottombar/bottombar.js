import React, { Fragment, Back } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
    SafeAreaView,
    StyleSheet,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    TextInput,
    View,
    Image,
    Text,
    StatusBar,
} from 'react-native';
class BottomBar extends React.Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    render() {
        return (
            <View style={styles.conatainer}>
                <View style={styles.view_header}>

                    <View style={styles.view_parent}>
                        <TouchableOpacity style={styles.view_active}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Modal
                                animationType="none"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <View
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}>

                                    <View
                                        style={{
                                            // height: wp('22%'),
                                            position: 'absolute',
                                            paddingLeft: wp('0.2%'),
                                            bottom: wp('14.5%'),
                                            width: wp('35%'),
                                        }}>
                                        <View style={styles.view_model}>
                                            {/* <View style={styles.view_main}> */}
                                                <View style={styles.view_text_pro}>
                                                    <Text style={{ fontSize: wp('4%'), fontWeight: '700',
                                                    marginLeft:wp('8%')
                                                  }}>
                                                        Current
                                                        </Text>
                                                    <View style={styles.view_line}></View>
                                                    <Text style={{ fontSize: wp('4%'), fontWeight: '700' ,
                                                                            marginLeft:wp('8%')

                                                   }}>
                                                        Past
                                                        </Text>
                                                    <View style={styles.view_line}></View>

                                                </View>
                                            {/* </View> */}

                                        </View>
                                    </View>
                                </View>
                            </Modal>

                            <Text style={styles.text_area}>Active</Text>
                            <Icon name="keyboard-arrow-down" size={wp('7%')} color='#666666' />

                        </TouchableOpacity>
                        <View>
                            <Text style={styles.text_area}>Open</Text>
                        </View>

                        <View>
                            <Text style={styles.text_area}>Closed</Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conatainer: {
        height: hp('10%'),
        width: wp('100%'),
    },
    view_header: {
        alignSelf: 'auto',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#ffffff',
        width: wp('100%'),
        height: wp('18%'),
    },

    view_active: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    view_1: {
        flexDirection: 'row',
        alignContent: 'center',
    },

    text_area: {
        fontSize: wp('4%'),
        marginRight: wp('2%'),
        fontWeight: '700',
        color: '#666666'
    },
    view_parent:
    {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center', alignSelf: 'center',
        width: '80%',
        height: '100%',
    },
    view_model: {
        height:wp('22%'),
        // alignSelf: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
        width:wp('36%'),
        paddingTop: wp('3%'),
        
        borderTopRightRadius: wp('3%'),
        borderTopLeftRadius: wp('3%'),
       
        backgroundColor: 'white',
    },
    view_text_pro: {
        
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
    },
    view_line: {
        height: wp('0.1%'),
        width: '100%',
        marginTop: wp('3%'),
        marginBottom: wp('2.5%'),
        backgroundColor: ' rgba(153, 153, 153, 0.5)',
    },

});
export default BottomBar;

