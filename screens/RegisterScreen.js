import React, { useState } from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
import { TextInput, Title } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([{ username: 'admin', password: 'admin' }]); // Default user for demo purposes

  const handleRegister = () => {
    if (username && password) {
      setUsers([...users, { username, password }]);
      Alert.alert('Registro Exitoso', 'Usuario registrado correctamente.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Registro</Title>
      <TextInput
        label="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 10,
  },
});

export default RegisterScreen;
