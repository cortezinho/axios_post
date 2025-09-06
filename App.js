import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const API = "http://10.110.12.38:9000/users";

  const addUser = async () => {
    try {
      const response = await axios.post(API, {
        name: newName,
        email: newEmail,
      });
      setUsers([...users, response.data]);
      setNewName("");
      setNewEmail("");
    } catch (error) {
      console.log("Error POST:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuários</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={newName}
        onChangeText={setNewName}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o e-mail"
        value={newEmail}
        onChangeText={setNewEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={addUser}>
        <Text style={styles.buttonText}>Adicionar Usuário</Text>
      </TouchableOpacity>

      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.email}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum usuário adicionado ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#2d3436",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dfe6e9",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0984e3",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d3436",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#636e72",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#b2bec3",
  },
});
