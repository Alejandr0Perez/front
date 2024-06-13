import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Title, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([{ username: 'admin', password: 'admin' }]); // Default user for demo purposes

  const handleLogin = () => {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Inicio de Sesión</Title>
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
      <Button mode="contained" style={styles.button} onPress={handleLogin}>
        Iniciar Sesión
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Register')} style={styles.button}>
        Registrar
      </Button>
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
  button: {
    marginTop: 10,
  },
});

export default LoginScreen;
