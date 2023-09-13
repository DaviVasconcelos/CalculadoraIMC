import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  // Estado para armazenar o peso e a altura inseridos pelo usuário.
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Estado para armazenar o valor calculado do IMC.
  const [imc, setImc] = useState(null);

  // Função para calcular o IMC quando o botão "Calcular IMC" é pressionado.
  const calculateIMC = () => {
    if (weight === '' || height === '') {

      // Verifica se os campos estão vazios e exibe um alerta se estiverem.
      alert('Por favor, preencha todos os campos.');
      return;
      
    }

    // Converte o peso e a altura para números e calcula o IMC.
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100;

    // Fórmula do IMC: peso (kg) / (altura (m) * altura (m)).
    const calculatedIMC = (weightKg / (heightM * heightM)).toFixed(2);

    // Atualiza o estado com o valor calculado do IMC.
    setImc(calculatedIMC);
  };

  return (
    <View style={styles.container}>
      {/* Título da aplicação */}
      <Text style={styles.header}>Calculadora de IMC</Text>

      {/* Campos de entrada para peso e altura */}
      <TextInput
        placeholder="Peso (em kg)"
        style={styles.input}
        value={weight}
        onChangeText={(text) => setWeight(text)}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Altura (em cm)"
        style={styles.input}
        value={height}
        onChangeText={(text) => setHeight(text)}
        keyboardType="numeric"
      />

      {/* Botão para calcular o IMC */}
      <Button title="Calcular IMC" onPress={calculateIMC} />

      {/* Exibe o resultado do IMC se estiver disponível */}
      {imc && (
        <Text style={styles.result}>
          Seu IMC é: {imc} - {interpretIMC(imc)}
        </Text>
      )}
    </View>
  );
}

// Função que interpreta a faixa de IMC com base no valor calculado.
const interpretIMC = (imc) => {
  if (imc < 18.5) return 'Abaixo do Peso';
  if (imc >= 18.5 && imc < 24.9) return 'Peso Normal';
  if (imc >= 25 && imc < 29.9) return 'Sobrepeso';
  return 'Obesidade';
};

// Estilos para os componentes da interface.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
});
