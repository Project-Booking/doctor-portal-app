import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface DayTabsProps {
  onDayChange?: (day: string) => void;
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DayTabs({ onDayChange }: DayTabsProps) {
  const [activeDay, setActiveDay] = useState('Mon');

  const handleDayPress = (day: string) => {
    setActiveDay(day);
    onDayChange?.(day);
  };

  return (
    <View style={styles.container}>
      {days.map((day) => (
        <TouchableOpacity
          key={day}
          style={[styles.dayButton, activeDay === day && styles.activeDay]}
          onPress={() => handleDayPress(day)}
        >
          <Text style={[styles.dayText, activeDay === day && styles.activeDayText]}>
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  activeDay: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeDayText: {
    color: '#FFFFFF',
  },
});