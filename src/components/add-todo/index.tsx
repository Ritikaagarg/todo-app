import React from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import styles from './styles';

interface TodoItemProps {
  taskInput: string;
  handleTextChange: (text: string) => void;
  addTodo: () => void;
}

const AddTodo = (props: TodoItemProps) => {
  const { colors } = useTheme();
  const { taskInput, handleTextChange, addTodo } = props;

  return (
    <View style={styles.addContainer}>
      <TextInput
        mode="outlined"
        label="Add Task"
        placeholder="Type here"
        theme={{ colors: { primary: colors.primary } }}
        onChangeText={(text) => handleTextChange(text)}
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
  )
}

export default AddTodo;