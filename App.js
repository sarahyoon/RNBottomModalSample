

import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import {Radio} from 'native-base';
import { SearchBar } from 'react-native-elements';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const groupData = [
  {
    groupName:'a',
    groupNo:'1111',
  },
  {
    groupName:'b',
    groupNo:'2222',
  },
  {
    groupName:'c',
    groupNo:'3333',
  },
  {
    groupName:'d',
    groupNo:'4444',
  },
  {
    groupName:'e',
    groupNo:'5555',
  },
  {
    groupName:'f',
    groupNo:'6666',
  },
  {
    groupName:'g',
    groupNo:'7777',
  }

];


const Item = (itemProps) => {

  return(
    <>
    <View style={styles.buttonContainer}>
      <Text style={styles.groupText}>{itemProps.item.groupName}</Text>
      <Radio
      color={"gray"}
      selectedColor={"gray"}
      selected = {itemProps.radioValue === itemProps.item.groupNo}
      onPress={itemProps.onPress}
      />
    </View>

    </>
  );
}


const App=  props => {

  const [isBottomModal, setBottomModal] = React.useState(false);
  const [radioChecked, setRadioChecked] = React.useState(groupData[0].groupNo);
  const [search, setSearch] = React.useState('');
  const [dataSource, setDataSource] = React.useState(groupData);

  const OpenModal = () => {
    setBottomModal(!isBottomModal);
  }


  const updateSearch = search => {
   
    const newData = groupData.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.groupName ? item.groupName.toUpperCase() : ''.toUpperCase();
      const textData = search.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setDataSource(newData);
    setSearch(search);
  }

  return ( 
    <>
    <View style={styles.container}>
      <Button title = "bottom-modal" onPress = {OpenModal}
        />
    </View>

    <Modal isVisible = {isBottomModal}
          style={styles.view}
          // swipeDirection='down'
          // onSwipeComplete={() => {setBottomModal(false)}}
          onBackdropPress={() => {setBottomModal(!isBottomModal)}}        
   >
      <View style={styles.modal}>
          <View style={styles.searchbar}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={updateSearch}
              value={search}
              lightTheme = {true}
              clearIcon = {true}
              searchIcon = {true}
            />
          </View>
          <View style={{height:250, marginTop:20, marginLeft:10}}>
              <FlatList 
                data = {dataSource}
                renderItem = {
                  (itemProps) => (
                    <Item {...itemProps} radioValue = {radioChecked}
                    onPress = {
                      () => {setRadioChecked(itemProps.item.groupNo);
                        //aync save (itemProps.item.groupNo);
                      console.log(itemProps.item.groupNo+"is selected!!!");}
                    }
                      />
                  )
                }
                keyExtractor={item => item.groupNo}
              />
          </View>

      </View>
    </Modal>

    </>
  );
};

const styles = StyleSheet.create({

  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal:{
    backgroundColor: 'white',
    bottom:0,
    height:400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    width:screenWidth - 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft:20
  },
  searchbar:{
    marginLeft:20,
    marginTop:40,
    width:screenWidth -60,
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  groupText :{
    fontSize:20, 
    color:'black' }

});



export default App;
