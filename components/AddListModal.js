import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {colors} from '../Colors';

export default class AddListModal extends React.Component { 

  state = {
    name: ""
  }

  createTodo = () => {
    const {name} = this.state;
    
    const list = {name};

    this.props.addList(list);

    this.setState({name: ""});
    this.props.closeModal();
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity style={{ position: "absolute", top: 32, right: 32 }} onPress={this.props.closeModal}>
          <AntDesign name="close" size={24} color={colors.darkColor} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>

          <Text style={styles.title}>Yapılacaklar Listesi Oluştur</Text>
          
          <TextInput 
            style={styles.input} 
            placeholder="Liste Adı" 
            onChangeText={text => this.setState({name: text})}
          />
        
          <TouchableOpacity style={styles.create} onPress={this.createTodo}>
            <Text style={{color: colors.white, fontWeight: "600"}}>Oluştur</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.darkColor,
    alignSelf: "center",
    marginBottom: 16
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.darkColor,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.success
  }
});