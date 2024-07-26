import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Portal, useTheme} from 'react-native-paper';

interface AutocompleteTextInputProps {
  text: string;
  setText: (text: string) => void;
  suggestions: string[];
  onSelect: (selectedMedicine: string) => void;
}

const AutocompleteTextInput: React.FC<AutocompleteTextInputProps> = ({
  text,
  setText,
  suggestions,
  onSelect,
}) => {
  const theme = useTheme();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 9999,
      elevation: 8,
      color: theme.colors.onBackground,
    },
    input: {
      borderWidth: 1,
      padding: 10,
      height: 40,
      fontSize: 15,
      borderRadius: 5,
      color: theme.colors.onBackground,
    },
    suggestionsContainer: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      color: theme.colors.primary,
      zIndex: 9999,
    },
    suggestion: {
      fontSize: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.background,
      color: theme.colors.primary,
    },
  });

  const handleInputChange = (inputText: string) => {
    setText(inputText);
    if (inputText) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputText.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setText(suggestion);
    setShowSuggestions(false);
    onSelect(suggestion);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên thuốc"
        value={text}
        onChangeText={handleInputChange}
      />
      {showSuggestions && (
        <ScrollView style={styles.suggestionsContainer}>
          {filteredSuggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestion}
              onPress={() => handleSuggestionPress(suggestion)}>
              <Text style={{color: theme.colors.onBackground}}>
                {suggestion}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AutocompleteTextInput;
