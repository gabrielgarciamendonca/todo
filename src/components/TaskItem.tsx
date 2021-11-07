import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pen/pen.png';
import { Task } from './TasksList';

// import { Container } from './styles';

interface TaskItemProps {
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, taskNewTitle: string) => void;
    item: Task
}

export function TaskItem({index, toggleTaskDone, removeTask, editTask, item}: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setNewTitle(item.title);
        setIsEditing(false);
    }

    function handleSubmitEditing() {
        editTask(item.id, newTitle);
        setIsEditing(false);
    }

    useEffect(() => {
        isEditing ? textInputRef.current?.focus() : textInputRef.current?.blur();
    }, [isEditing])

    return (
        <>
        <View style={{justifyContent: 'center'}}>
        <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        //TODO - use onPress (toggle task) prop
        onPress={() => toggleTaskDone(item.id)}
        >
        <View 
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
        >
            { item.done && (
            <Icon
                name="check"
                size={12}
                color="#FFF"
            />
            )}
        </View>

        <TextInput 
            //TODO - use style prop
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
        />
        </TouchableOpacity>
    </View>

    <View style={styles.icons}>
        <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24}}
            onPress={isEditing ? handleCancelEditing : handleStartEditing}
        >
            {
                isEditing ? <Icon name="x" style={styles.x} /> : <Image source={editIcon} />
            }
        </TouchableOpacity>
        <View style={styles.iconSeparator} />
        <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
            onPress={() => removeTask(item.id)}
            disabled={isEditing}
            //TODO - use onPress (remove task) prop
        >
            <Image source={trashIcon} />
        </TouchableOpacity>
    </View>
    </>
    );
    }

    const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: Platform.OS === 'ios' ? 15 : 5,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconSeparator: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
    },
    icons: {
        flexDirection: 'row'
    },
    x: {
        fontSize: 24,
        color: '#B2B2B2'
    }
})