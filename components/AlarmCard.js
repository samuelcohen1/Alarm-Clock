import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert } from 'react-native';
import { getDynamicStyles } from '../styles/AlarmStyles';
import { useDarkMode } from '../contexts/DarkModeContext';

export default AlarmCard = function ({ alarm, onToggleAlarm, onDelete }) {
  const formattedTime = new Date(alarm.alarmTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const dynamicStyles = getDynamicStyles(isDarkMode);
  const { isDarkMode } = useDarkMode();

  // shamelessly stolen from react native documentation
  const createTwoButtonAlert = () =>
    Alert.alert('Confirm deletion', 'Are you sure you want to delete this alarm?', [
      {
        text: 'Cancel',
      },
      { text: 'OK', onPress: () => onDelete(alarm.id) },
    ]);

  return (
    <View style={dynamicStyles.card}>
      <View style={dynamicStyles.content}>
        <Text style={dynamicStyles.time}>{formattedTime}</Text>
        <Text style={dynamicStyles.name}>{alarm.alarmName}</Text>
      </View>
      <View style={dynamicStyles.controls}>
        <Switch
          onValueChange={() => onToggleAlarm(alarm.id)}
          value={alarm.isActive}
          style={dynamicStyles.switch}
        />
        <TouchableOpacity onPress={() => createTwoButtonAlert()} style={dynamicStyles.deleteButton}>
          <Text style={dynamicStyles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
