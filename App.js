import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import Todo from "./Todo";
import {AppLoading} from "expo";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
const seed = () => {
  const one = Math.floor((Math.random() * 100) / 3.92);
  const two = Math.floor((Math.random() * 100) / 3.92);
  const three = Math.floor((Math.random() * 100) / 3.92);
  const four = Math.floor((Math.random() * 100) / 3.92);
  const five = Math.floor((Math.random() * 100) / 3.92);
  const six = Math.floor((Math.random() * 100) / 3.92);
  const seven = Math.floor((Math.random() * 100) / 3.92);
  const eight = Math.floor((Math.random() * 100) / 3.92);
  const nine = Math.floor((Math.random() * 100) / 3.92);
  const ten = Math.floor((Math.random() * 100) / 3.92);
  const eleven = Math.floor((Math.random() * 100) / 3.92);
  const twelve = Math.floor((Math.random() * 100) / 3.92);
  const thirteen = Math.floor((Math.random() * 100) / 3.92);
  const fourteen = Math.floor((Math.random() * 100) / 3.92);
  const fifteen = Math.floor((Math.random() * 100) / 3.92);
  const sixteen = Math.floor((Math.random() * 100) / 3.92);
  return [
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    thirteen,
    fourteen,
    fifteen,
    sixteen
  ];
}

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    toDos:{},
    newToDo:"",
    loadedToDos:false
  }
  componentDidMount = ()=>{
    this._loadToDos();
  }
  render() {
    const {newToDo,loadedToDos,toDos} = this.state;
    if(!loadedToDos){
      return <AppLoading/>
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
            underlineColorAndroid={"transparent"}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo=>{
              return <Todo key={toDo.id} {...toDo} deleteToDo={this._deleteToDo}></Todo>
            })}
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewToDo = text => {
    this.setState({
      newToDo:text
    })
  }

  _loadToDos = ()=>{
    this.setState({
      loadedToDos:true
    })
  }

  _addToDo = ()=>{
    const {newToDo} = this.state;
    if(newToDo != ""){
      this.setState({
        newToDo:""
      })
      this.setState(prevState=>{
        const ID = uuidv4({ random: seed() });
        const newToDoObj = {
          [ID]:{
            id:ID,
            isCompleted:false,
            text:newToDo,
            createdAt:Date.now()
          }
        }
        console.log(newToDoObj)
        const newState = {
          ...prevState,
          newToDo:"",
          toDos:{
            ...prevState.toDos,
            ...newToDoObj
          }
        }

        return {...newState}
      })
    }
  }

  _deleteToDo = (id) =>{
    this.setState(prevState=>{
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        toDos
      }

      return {...newState}
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});