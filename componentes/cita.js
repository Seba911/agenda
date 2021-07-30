import React from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {
  const dialogoEliminar = id => {
    console.log('eliminando...', id);
    // esta funcion lleva al componente principal, toma una copia del State (citasActuales), y luego la filtra deacuerdo a la cita que se desea eliminar
    eliminarPaciente(id);
  };

  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente: </Text>
        {/* se le agrega .item, esto es exclusivo e interpretado por react-native, imprime lo que se solicita */}
        {/* Seria equivalente a poner renderItem={({citas})} =>, y luego poner en el <Text>{citas.item.paciente} */}
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>
      <View>
        <View>
          <Text style={styles.label}>Propietario: </Text>
          <Text style={styles.texto}>{item.propietario}</Text>
        </View>
        <Text style={styles.label}>Sintomas: </Text>
        <Text style={styles.texto}>{item.sintomas}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}> Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderStyle: 'solid',
    borderBottomWidth: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  textoEliminar: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Cita;
