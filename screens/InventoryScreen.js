import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Button, Card, TextInput, Title, Paragraph } from 'react-native-paper';

const API_URL = 'https://back-1-kfe7.onrender.com/api/inventory'; // Ejemplo de URL para el endpoint de inventory en Render


export default function InventoryScreen() {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' });

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const addItem = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setInventory([...inventory, data]);
      setNewItem({ name: '', quantity: '', price: '' });
    } catch (error) {
      console.error('Error adding item:', error);
      Alert.alert('Error', 'Hubo un problema al agregar el artículo. Por favor, intenta de nuevo más tarde.');
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setInventory(inventory.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el artículo. Por favor, intenta de nuevo más tarde.');
    }
  };

  const calculateTotal = (item) => {
    return (item.quantity * item.price).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Control de Inventario</Title>
      <Title style={styles.subtitle}>Agregar Nuevo Producto</Title>
      <TextInput
        label="Nombre del Producto"
        mode="outlined"
        value={newItem.name}
        onChangeText={text => setNewItem({ ...newItem, name: text })}
        style={styles.input}
      />
      <TextInput
        label="Cantidad"
        mode="outlined"
        keyboardType="numeric"
        value={newItem.quantity}
        onChangeText={text => setNewItem({ ...newItem, quantity: text })}
        style={styles.input}
      />
      <TextInput
        label="Precio"
        mode="outlined"
        keyboardType="numeric"
        value={newItem.price}
        onChangeText={text => setNewItem({ ...newItem, price: text })}
        style={styles.input}
      />
      <Button mode="contained" onPress={addItem} style={styles.button}>Agregar Producto</Button>
      <Title style={styles.subtitle}>Inventario</Title>
      <FlatList
        data={inventory}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>{item.name} - {item.quantity} unidades - ${item.price} cada uno - Total: ${calculateTotal(item)}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button color="red" onPress={() => deleteItem(item._id)}>Eliminar</Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#343a40',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});
