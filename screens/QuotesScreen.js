import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import { Button, Card, TextInput, Title, Paragraph } from 'react-native-paper';

const API_URL = 'https://alejandro-perezs-projects-ef7b4d2f.vercel.app/back/api/quotes'; // Reemplaza con tu URL de Vercel

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState([
    { id: '1', client: 'Juan Pérez', description: 'Construcción de casa', total: '15000.00' },
    { id: '2', client: 'María García', description: 'Remodelación de oficina', total: '8000.00' },
    { id: '3', client: 'Carlos López', description: 'Diseño de interiores', total: '5000.00' }
  ]);

  const [newQuote, setNewQuote] = useState({ client: '', description: '', total: '' });

  const addQuote = () => {
    if (newQuote.client && newQuote.description && newQuote.total) {
      setQuotes([...quotes, { id: Date.now().toString(), ...newQuote }]);
      setNewQuote({ client: '', description: '', total: '' });
    } else {
      Alert.alert('Error', 'Por favor, completa todos los campos para agregar una cotización.');
    }
  };

  const deleteQuote = (id) => {
    setQuotes(quotes.filter(quote => quote.id !== id));
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Control de Cotizaciones</Title>
      <Title style={styles.subtitle}>Agregar Nueva Cotización</Title>
      <TextInput
        label="Nombre del Cliente"
        mode="outlined"
        value={newQuote.client}
        onChangeText={text => setNewQuote({ ...newQuote, client: text })}
        style={styles.input}
      />
      <TextInput
        label="Descripción"
        mode="outlined"
        value={newQuote.description}
        onChangeText={text => setNewQuote({ ...newQuote, description: text })}
        style={styles.input}
      />
      <TextInput
        label="Total"
        mode="outlined"
        keyboardType="numeric"
        value={newQuote.total}
        onChangeText={text => setNewQuote({ ...newQuote, total: text })}
        style={styles.input}
      />
      <Button mode="contained" onPress={addQuote} style={styles.button}>Agregar Cotización</Button>
      <Title style={styles.subtitle}>Cotizaciones</Title>
      <FlatList
        data={quotes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>{item.client} - {item.description} - ${item.total}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button color="red" onPress={() => deleteQuote(item.id)}>Eliminar</Button>
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
