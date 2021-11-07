import React, { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const updatedTasks = tasks.map(task => ({ ...task }))
    const selectedTask = updatedTasks.find(item => item.title.toUpperCase() === newTaskTitle.toUpperCase());
    
    if(!selectedTask) {
      const formattedTask: Task = {id: new Date().getTime(), done: false, title: newTaskTitle}
      setTasks(oldTasks => [...oldTasks, formattedTask]);
    } else {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
    }
    
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const selectedTask = updatedTasks.find(item => item.id === id);
    if (selectedTask) {
      selectedTask.done = !selectedTask.done;
      const index = updatedTasks.findIndex(item => item.id === id);
      updatedTasks.splice(index, 1, selectedTask);
      setTasks([...updatedTasks]);
    }
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const selectedTask = updatedTasks.find(item => item.id === taskId);
    if (selectedTask) {
      selectedTask.title = taskNewTitle;
      const index = updatedTasks.findIndex(item => item.id === taskId);
      updatedTasks.splice(index, 1, selectedTask);
      setTasks([...updatedTasks]);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {text: 'Sim', onPress: () => {
        const newList = tasks.filter((item) => item.id !== id);
        setTasks(newList);
      }},
      {text: 'Não', onPress: () => {}}
    ])
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})