import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, Keyboard } from 'react-native';
import { Text, Appbar, Button, TextInput, Checkbox, useTheme } from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { TodoStyles as styles } from '../styles';
import { Todo } from '../types/types';
import TodoItem from '../components/todo-item';
import AddTodo from '../components/add-todo';

const todoListRef = firestore().collection('todoList');

const HomeScreen = () => {
  const { colors } = useTheme();
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [isFetching, setisFetching] = useState<boolean>(true);
  const isLoggedInId = userInfo?.uid;

  useFocusEffect(() => {
    getUserInfo();
  });

  const getUserInfo = async () => {
    const currentUser = await auth().currentUser;
    setUserInfo(currentUser);
  };

  const updateTodoList = useCallback((list: Todo[]) => {
    setTodos(list);
    setisFetching(false);
  }, []);

  const updateTodoDone = useCallback((item: Todo) => {
    todoListRef.doc(item.id).update({
      isDone: !item.isDone,
    });
  }, []);

  const updateTodoRemark = useCallback((item: Todo, remark) => {
    todoListRef.doc(item.id).update({
      remark: remark
    });
  }, []);

  const addTodo = async () => {
    Keyboard.dismiss()
    await todoListRef.add({
      isDone: false,
      remark: taskInput,
      userId: userInfo?.uid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    setTaskInput('');
  };

  const deleteTodo = async (item: Todo) => {
    await todoListRef.doc(item.id).delete();
  };

  const fetchtodoList = () => {
    return todoListRef
      .where('userId', '==', userInfo?.uid)
      .orderBy('isDone', 'asc')
      .onSnapshot((querySnapshot: any) => {
        let list: Todo[] = [];
        if (querySnapshot) {
          querySnapshot.forEach((docSnapshot: any) => {
            list.push({
              ...docSnapshot.data(),
              id: docSnapshot.id,
            })
          });
          updateTodoList(list);
        }
        else {
          setisFetching(false);
        }
      });
  }

  useEffect(() => {
    if (isLoggedInId) {
      const subscriber = fetchtodoList()
      return (() => {
        console.log("called on unmount")
        if (subscriber) {
          subscriber()
        }
      })
    }
  }, [isLoggedInId]);

  const signOut = useCallback(async () => {
    try {
      setTodos([]);
      setTaskInput('');
      setUserInfo(null);
      setisFetching(true);
      auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <TodoItem
        item={item}
        onUpdateTodoDone={(item) => updateTodoDone(item)}
        onUpdateTodoRemark={(text) => {
          updateTodoRemark(item, text)
        }}
        onDeleteTodo={(item) => deleteTodo(item)}
      />
    );
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyList}>
        <Text style={styles.emptyListText}>There are no tasks added yet</Text>
      </View>
    );
  };

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const handleTextChange = useCallback((value: string) => {
    setTaskInput(value);
  }, []);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content
          title={`Hi ${userInfo?.displayName}`}
        />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar.Header>
      <Text style={styles.headerText}>Write your tasks to do here!</Text>
      <AddTodo
        taskInput={taskInput}
        handleTextChange={(text) => handleTextChange(text)}
        addTodo={addTodo}
      />
      {isFetching ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={todos}
          keyExtractor={todo => todo.id}
          renderItem={todo => renderItem(todo)}
          ListEmptyComponent={renderEmptyComponent}
          ItemSeparatorComponent={renderSeparator}
          style={styles.list}
        />
      )}
    </View>
  );
};

export default HomeScreen;