import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

const API_URL = 'https://back-weld.vercel.app/api/quotes'; // Asegúrate de usar la URL correcta

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ customerName: '', items: [], total: 0 });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const addQuote = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuote),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setQuotes([...quotes, data]);
      setNewQuote({ customerName: '', items: [], total: 0 });
    } catch (error) {
      console.error('Error adding quote:', error);
      Alert.alert('Error', 'Hubo un problema al agregar la cotización. Por favor, intenta de nuevo más tarde.');
    }
  };

  const deleteQuote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setQuotes(quotes.filter(quote => quote._id !== id));
    } catch (error) {
      console.error('Error deleting quote:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar la cotización. Por favor, intenta de nuevo más tarde.');
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Cotizaciones</Title>
      <Title style={styles.subtitle}>Nueva Cotización</Title>
      {/* Aquí debes implementar los componentes necesarios para capturar los datos de la nueva cotización */}
      <Button mode="contained" onPress={addQuote} style={styles.button}>Agregar Cotización</Button>
      <Title style={styles.subtitle}>Listado de Cotizaciones</Title>
      <FlatList
        data={quotes}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>{item.customerName}</Paragraph>
              {item.items.map((subItem, index) => (
                <Paragraph key={index}>
                  {subItem.name} - {subItem.quantity} unidades - ${subItem.price} cada uno
                </Paragraph>
              ))}
              <Paragraph>Total: ${calculateTotal(item.items)}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button color="red" onPress={() => deleteQuote(item._id)}>Eliminar</Button>
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
  button: {
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
  },
});
