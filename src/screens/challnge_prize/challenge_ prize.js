

import React, {Fragment} from 'react';
import Topbar from './topbar';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

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
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';

import {connect} from 'react-redux';
class ChallengePrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Rank', 'Cash Prize', 'Awarding(%)', 'Flip','Wand','Charge'],
      widthArr: [60, 100, 100, 70, 75, 80],
      tableData: [
        ['1', '300', '100%', '0','0','0','0'],
        ['2', '15', '5%', '0','0','0','0'],
        ['3', '9', '3%', '0','0','0','0'],
        ['4', '6', '2%', '0','0','0','0'],     
        ['5', '3', '1%', '0','0','0','0'],     
        ['6~10', '0', '0', '3','3','3','0'],     
        ['11~50', '0', '0', '2','2','2','0'],     
        ['51~100', '0', '0', '1','1','1','0'],     
       ],
    };
  }
  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
    return (
      <View style={styles.conatainer}>
        {/* <View style={styles.topbar_view}>
          <Topbar />
        </View> */}

        <View style={styles.spons_section}>
          <View style={styles.Tex_sec}>
            <Text style={{fontSize: wp('6%'), fontWeight: '500'}}>
              {' '}
              Contest Winners{' '}
            </Text>
          </View>
          <View
            style={{
              width: wp('43%'),
              height: wp('0.3'),
              backgroundColor: '#29ABE2',
              marginTop: wp('2%'),
            }}/>
        </View>

        <View style={styles.table_view}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.texts}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  this.state.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topbar_view: {
      
    height: hp('10%'),
    width: wp('100%'),
  },
  spons_section: {
    flexDirection: 'column',
    marginTop: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tex_sec: {
    alignItems: 'center',
  },
  table_view: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: 'bold' },
  texts: { textAlign: 'center', fontWeight: 'bold',color:'#ffffff' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});
export default connect(null,null) (ChallengePrice);