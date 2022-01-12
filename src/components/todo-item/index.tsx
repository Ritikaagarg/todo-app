import React from 'react';
import { View } from 'react-native';
import { Text, Button, TextInput, Checkbox, useTheme } from 'react-native-paper';
import styles from './styles';
import { Todo } from '../../types/types';

interface TodoItemProps {
  item: Todo;
  onUpdateTodoDone: (item: Todo) => void;
  onUpdateTodoRemark: (text: string) => void;
  onDeleteTodo: (item: Todo) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { colors } = useTheme();
  const { item, onUpdateTodoDone, onUpdateTodoRemark, onDeleteTodo } = props;
  let date = new Date(item.createdAt?.seconds * 1000).toLocaleDateString();

  return (
    <View style={styles.addContainer}>
      <Checkbox
        status={item.isDone ? 'checked' : 'unchecked'}
        onPress={() => onUpdateTodoDone(item)}
        color={colors.primary}
        uncheckedColor={colors.primary}
      />
      <View style={styles.remarkContainer}>
        {item.isDone ? <Text style={styles.cutRemark}>
          {item.remark}
        </Text>
          : <TextInput
            style={item.isDone ? styles.cutRemark : styles.remark}
            value={item.remark}
            dense={true}
            underlineColor='#FFF'
            onChangeText={(text) => {
              onUpdateTodoRemark(text)
            }}
          />}
        <Text style={styles.timestamp}>Created At: {date}</Text>
      </View>
      <Button color={colors.primary} onPress={() => onDeleteTodo(item)}>
        Delete
      </Button>
    </View>
  )
}

export default TodoItem;