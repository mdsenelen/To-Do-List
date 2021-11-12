import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../Colors";
import TodoModal from './TodoModal';
import UpdateListModal from './UpdateListModal';
import Fire from '../Fire'

export default class TodoList extends React.Component {

  state = {
    showListVisible: false,
    updateTodoVisible: false      
  };

  toggleListModal() {
    this.setState({showListVisible: !this.state.showListVisible});
  }

  toggleUpdateModal() {
    this.setState({updateTodoVisible: !this.state.updateTodoVisible});
  }

  deleteTodo = (list) => {

    firebase.removeList(list);
  }

  updateTodo = (list, name) => {
    firebase.updateTodo(list, name);
  }


  render(){
    const list = this.props.list;

    const name = this.props.listName;

    const completed = list.todos.filter(todo => todo.completed).length;

    return (
      <View>
        <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={() => this.toggleListModal()}>
          <TodoModal list={list} closeModal={() => this.toggleListModal()} updateList={this.props.updateList} />
        </Modal>
        <Modal 
          animationType="slide" 
          visible={this.state.updateTodoVisible}
          onRequestClose={() => this.toggleUpdateModal()}
          >
          <UpdateListModal list={list} closeModal={() => this.toggleUpdateModal()} updateTodo={this.updateTodo} />
        </Modal>
        <TouchableOpacity style={[styles.listContainer, {backgroundColor: completed ? colors.success : colors.red}]} onPress={() => this.toggleListModal()}>
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>
          <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.btn} onPress={() => this.toggleUpdateModal()}>
            <AntDesign name="edit" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => this.deleteTodo(list)}>
            <AntDesign name="delete" size={24} color={colors.white} />
          </TouchableOpacity>
          </View>
        </TouchableOpacity> 
      </View>
    )
  }
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.darkColor,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    marginHorizontal: 20,
    marginBottom: 10,
    alignSelf: 'stretch',
    flexDirection: "row",
  },
  listBtnContainer: {
    flexDirection: "row"
  },
  listTitle: {
    color: colors.white,
    fontWeight: "bold",
  },
  delete: {
    backgroundColor: colors.red,
    padding: 10
  },
  edit: {
    backgroundColor: colors.darkColor,
    padding: 10,
    marginRight: 10
  },
  success: {
    backgroundColor: colors.success,
    padding: 10,
    marginRight: 10
  },
  btn: {
    marginHorizontal: 10
  }
})