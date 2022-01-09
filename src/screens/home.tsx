import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Text, Appbar, Button, TextInput, Checkbox, useTheme } from 'react-native-paper';
import firestore, { firebase } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
import { TodoStyles as styles } from '../styles';
import { Todo, User } from '../types/types';

const todoListRef = firestore().collection('todoList');

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

const HomeScreen = () => {
  const { colors } = useTheme();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [isApiLoading, setApiLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );

  const updateTodoList = (list: Todo[]) => {
    setTodos(list);
    setApiLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      const subscribe = todoListRef
        .where('userId', '==', userInfo.uid)
        .orderBy('isDone', 'asc')
        .onSnapshot((querySnapshot: any) => {
          if (querySnapshot) {
            let list: Todo[] = [];
            querySnapshot?.docs?.map((docSnapshot: any) => {
              list = [
                ...list,
                {
                  ...docSnapshot.data(),
                  id: docSnapshot.id,
                },
              ];
            });
            console.log("list", list)
            updateTodoList(list);
          } else {
            setTodos([]);
            setApiLoading(false);
          }
        });
      return () => {
        typeof subscribe === 'function' ? subscribe() : null;
      };
    }
  }, [userInfo]);

  const getUserInfo = async () => {
    const currentUser = await auth().currentUser;
    setUserInfo(currentUser);
  };

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

  const addTodo = useCallback(async () => {
    todoListRef.add({
      isDone: false,
      remark: taskInput,
      userId: userInfo?.uid,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
    setTaskInput('');
  }, [taskInput, userInfo]);

  const deleteTodo = useCallback((item: Todo) => {
    todoListRef.doc(item.id).delete();
  }, []);

  const signOut = useCallback(async () => {
    try {
      setTodos([]);
      setTaskInput('');
      setUserInfo(null);
      setApiLoading(true);
      auth().signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderItem = useCallback(({ item }) => {
    let date = new Date(item.createdAt?.seconds * 1000).toLocaleDateString();
    return (
      <View style={styles.addContainer}>
        <Checkbox
          status={item.isDone ? 'checked' : 'unchecked'}
          onPress={() => updateTodoDone(item)}
          color={colors.primary}
        />
        <View style={styles.remarkContainer}>
          {item.isDone ? <Text style={styles.cutRemark}>
            {item.remark}
          </Text>
            : <TextInput style={item.isDone ? styles.cutRemark : styles.remark} value={item.remark} dense={true} underlineColor='#FFF' onChangeText={(text) => updateTodoRemark(item, text)} />}
          <Text style={styles.timestamp}>Created At: {date}</Text>
        </View>
        <Button color={colors.primary} onPress={() => deleteTodo(item)}>
          Delete
        </Button>
      </View>
    );
  }, [deleteTodo, updateTodoDone, updateTodoRemark, colors]);

  const handleTextChange = useCallback((value: string) => {
    setTaskInput(value);
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content
          title={`Hi ${userInfo?.displayName},`}
          subtitle="Write your tasks to do here!"
        />
        <Appbar.Action icon="logout" onPress={signOut} />
      </Appbar.Header>
      <View style={styles.addContainer}>
        <TextInput
          mode="outlined"
          label="Add Some Task"
          placeholder="Type something"
          theme={{ colors: { primary: colors.primary } }}
          onChangeText={handleTextChange}
          value={taskInput}
          style={styles.addTaskField}
        />
        <Button
          color={colors.primary}
          style={styles.button}
          disabled={taskInput.length === 0}
          onPress={addTodo}>
          ADD
        </Button>
      </View>
      {isApiLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={todos}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          ItemSeparatorComponent={renderSeparator}
          style={styles.list}
        />
      )}
    </>
  );
};

export default HomeScreen;