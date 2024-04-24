import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

const AutocompleteTextInput = ({ suggestions }: { suggestions: string[] }) => {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.outline,
      padding: 10,
      height: 40,
      fontSize: 15,
    },
    suggestionsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      zIndex: 1,
    },
    suggestion: {
      fontSize: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
    },
  });
  const handleInputChange = (inputText: React.SetStateAction<string>) => {
    setText(inputText);
    if (inputText) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputText.toString().toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (suggestion: React.SetStateAction<string>) => {
    setText(suggestion);
    setShowSuggestions(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={text}
        onChangeText={handleInputChange}
      />
      {showSuggestions && (
        <ScrollView style={styles.suggestionsContainer}>
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};



export default AutocompleteTextInput;
