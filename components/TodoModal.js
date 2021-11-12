import React from 'react';
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, Keyboard} from 'react-native';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {colors} from '../Colors';

export default class TodoModal extends React.Component {
  
  state = {
    newTodo:"",
    updateTodo: "",
    updateIndex: ""
  };

  toggleTodoComplate = index => {
    let list = this.props.list;
    list.todos[index].completed = !list.todos[index].completed;

    this.props.updateList(list);
  };

  addTodo = () => {
    let list = this.props.list;
    list.todos.push({title: this.state.newTodo, completed: false});

    this.props.updateList(list);
    this.setState({ newTodo: "" });

    Keyboard.dismiss();
  };

  deleteTodo = index => {
    let list = this.props.list;
    list.todos.splice(index, 1);

    this.props.updateList(list);
  }

  toggleUpdateTodo = index => {
    let list = this.props.list;

    this.setState({
      updateTodo: list.todos[index].title,
      updateIndex: index
    })
  }

  updateTodo = () => {
    let list = this.props.list;
    let index = this.state.updateIndex;
    
    list.todos[index].title = this.state.updateTodo;

    console.log(list.todos[index].title)
  
    this.props.updateList(list);

    this.setState({ 
      updateTodo: "",
      updateIndex: "" 
    });
  }


  renderTodo = (todo, index) => {
    return (
        <View style={styles.todoContainer}>
          <TouchableOpacity onPress={() => this.toggleTodoComplate(index)}>
            <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={24} color={colors.lightColor} style={{width: 32}} />
          </TouchableOpacity>

          <Text style={[styles.todo, {textDecorationLine: todo.completed ? 'line-through' : 'none' , color: todo.completed ? colors.lightColor : colors.darkColor}]}>{todo.title}</Text>
          
          <View style={{flexDirection: "row"}}>
            <TouchableOpacity style={[styles.btn, {backgroundColor: colors.darkColor}]} onPress={() => this.toggleUpdateTodo(index)}>
              <AntDesign name="edit" size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, {backgroundColor: colors.red}]} onPress={() => this.deleteTodo(index)}>
              <AntDesign name="delete" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
    )
  };


  render() {
    const list = this.props.list;
    const taskCount = list.todos.length;
    const completedCount = list.todos.filter(todo => todo.completed).length;
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={{ position: "absolute", top: 32, right: 32, zIndex: 10 }} onPress={this.props.closeModal}>
            <AntDesign name="close" size={24} color={colors.darkColor} />
          </TouchableOpacity>

          <View style={[styles.section, styles.header]}>
            <View>
              <Text style={styles.title}>{list.name}</Text>
            </View>
          </View>
          <View style={[styles.section, {flex: 3}]}>
            <FlatList
              data={list.todos}
              renderItem={({item, index}) => this.renderTodo(item, index)}
              keyExtractor={(__, index) => index.toString()}
              contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
              showsHorizontalScrollIndicator={false}
            />
          </View>
            {this.state.updateTodo != "" ? (
              <View style={[styles.section, styles.footer]} behavior="padding">
                <TextInput 
                style={styles.input}
                onChangeText={text => this.setState({ updateTodo: text})}
                value={this.setState.updateTodo}
              />
              <TouchableOpacity style={styles.editTodo} onPress={() => this.updateTodo()}>
                <AntDesign name="edit" size={16} color={colors.white} />
              </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.section, styles.footer]} behavior="padding">
                <TextInput 
                style={styles.input}
                onChangeText={text => this.setState({ newTodo: text})}
                value={this.setState.newTodo}
              />
              <TouchableOpacity style={styles.addTodo} onPress={() => this.addTodo()}>
                <AntDesign name="plus" size={16} color={colors.white} />
              </TouchableOpacity>
              </View>
            )}
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    flex: 1,
    alignSelf: "stretch"
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.darkColor
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8
  },
  addTodo: {
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.success
  },
  editTodo: {
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkColor
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  todo: {
    color: colors.darkColor,
    fontWeight: "700",
    fontSize: 16
  },
  btn: {
    padding: 10,
    marginHorizontal: 5
  }
});