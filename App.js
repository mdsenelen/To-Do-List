import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { colors } from './Colors';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal'
import Fire from './Fire'

export default class App extends React.Component {

  state = {
    addTodoVisible: false,
    updateTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  };

  componentDidMount() {
    firebase = new Fire((error, user) => {
      if(error){
        return alert("Bir sorun oluştu.");
      }

      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({loading: false});
        })
      })

      this.setState({user})
    });
  };

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list, name) => {
    return <TodoList list={list} updateList={this.updateList} />
  }

  addList = list => {
   firebase.addList({
     name: list.name,
     todos: []
   });
  }

  updateList = list => {
    firebase.updateList(list);
  }


  render() {
    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.darkColor} />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
          >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} updateList={this.updateList} />
        </Modal>
        <View style={styles.header}>
          <Text style={styles.headerText}>Yapılacaklar Listesi</Text>
        </View>
        <View style={{flex: 1, paddingVertical: 40}}>
          <FlatList data={this.state.lists} 
          renderItem={({ item, name }) => 
          this.renderList(item, name)
          }
          keyExtractor={item => item.id.toString()}
          keyboardShouldPersistTaps="always"
          />
        </View>
        <View style={styles.addContainer}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: StatusBar.currentHeight || 30,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    color: colors.white,
    backgroundColor: colors.darkColor
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.white
  },
  addContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  addList: {
    backgroundColor: colors.darkColor,
    borderRadius: 999,
    padding: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
  },
  add: {
    color: colors.lightColor,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  }
});
