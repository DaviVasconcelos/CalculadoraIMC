import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import icon from './assets/icon.png';

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
      Alert.alert('Erro', 'Por favor, preencha todos os campos.'); // Sobre o alert: https://reactnative.dev/docs/alert
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
      {/* Imagem acima da header */}
      <Image source={icon} style={styles.icone} />

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

      {/* Botão personalizado para calcular o IMC */}
      <TouchableOpacity
        style={styles.button}
        onPress={calculateIMC}
      >
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingLeft: 20,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  result: {
    fontSize: 22,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    width: "100%",
    borderRadius: 10, // Define bordas arredondadas
    paddingVertical: 15,
    paddingHorizontal: 60,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icone: {
    width: 400, // Ajuste a largura da imagem conforme necessário
    height: 200, // Ajuste a altura da imagem conforme necessário
    resizeMode: 'contain', // Redimensionar a imagem para caber no espaço
    marginBottom: 30, // Espaço entre a imagem e o título
  },
});
