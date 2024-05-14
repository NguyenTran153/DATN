import {StyleSheet, Text, View} from 'react-native';
import React from 'react';



interface PhotoTakingProps {
  label: string;
  name: string;
  value: any;
  onValueChange: () => void;
}

const PhotoTakingComponent: React.FC<PhotoTakingProps> = ({
  label,
  name,
  value,
  onValueChange,
}) => {
  return (
    <View>
      <Text>PhotoTakingComponent</Text>
    </View>
  );
};

export default PhotoTakingComponent;

const styles = StyleSheet.create({});
