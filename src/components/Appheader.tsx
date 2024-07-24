import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

type AppHeaderProps = {
  onAdd?: () => void;
  title: string;
  back?: boolean;
};

const AppHeader: React.FC<AppHeaderProps> = ({onAdd, title, back}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {back && (
        <View style={[styles.buttonContainer, styles.leftButtonContainer]}>
          <Button title="Back" onPress={navigation.goBack} />
        </View>
      )}
      <Text style={styles.title}>{title}</Text>
      {onAdd && (
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={onAdd} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    position: 'relative',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: 4,
    flexDirection: 'row',
  },
  leftButtonContainer: {
    left: 4,
  },
});

export default AppHeader;
