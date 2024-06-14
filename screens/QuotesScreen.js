import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Button, Card, TextInput, Title, Paragraph } from 'react-native-paper';

const API_URL = 'https://back-1-kfe7.onrender.com/api/quotes'; // URL para el endpoint de cotizaciones

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ customerName: '', project: '', amount: '' });

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
      setNewQuote({ customerName: '', project: '', amount: '' });
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

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Cotizaciones</Title>
      <Title style={styles.subtitle}>Nueva Cotización</Title>
      <TextInput
        label="Nombre del Cliente"
        value={newQuote.customerName}
        onChangeText={text => setNewQuote({ ...newQuote, customerName: text })}
        style={styles.input}
      />
      <TextInput
        label="Proyecto"
        value={newQuote.project}
        onChangeText={text => setNewQuote({ ...newQuote, project: text })}
        style={styles.input}
      />
      <TextInput
        label="Cantidad"
        keyboardType="numeric"
        value={newQuote.amount}
        onChangeText={text => setNewQuote({ ...newQuote, amount: text })}
        style={styles.input}
      />
      <Button mode="contained" onPress={addQuote} style={styles.button}>Agregar Cotización</Button>
      <Title style={styles.subtitle}>Listado de Cotizaciones</Title>
      <FlatList
        data={quotes}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>Cliente: {item.customerName}</Paragraph>
              <Paragraph>Proyecto: {item.project}</Paragraph>
              <Paragraph>Cantidad: ${item.amount}</Paragraph>
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
