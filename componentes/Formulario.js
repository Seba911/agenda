/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = ({citas, setCitas, guardarMostrarForm}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintomas, guardarSintomas] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const confirmarFecha = date => {
    //   local date string
    const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  // Muestra u oculta el timepicker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = hora => {
    const opciones = {hour: 'numeric', minute:'2-digit'};
    guardarHora(hora.toLocaleDateString('en-US', opciones));
    hideTimePicker();
  };

  //crear nueva cita

  const crearNuevaCita = () => {
    //Validar
    if (
      // trim, propiedad nativa de js
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === '') {
        mostrarAlerta();

        return;
      }
    const cita = { paciente, propietario, telefono, hora, sintomas};
    cita.id = shortid.generate();
    console.log(cita);

    // Agregar al state -- funcion que modifica el estado del state
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);

    // Ocultar el formulario cuando se genera la cita nueva
    guardarMostrarForm(false);

    // Resetear el formulario
  };
//   Alerta si falla
const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son obligatorios', //mensaje
      [{
        text: 'OK',
      }]
    );
};

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ texto => guardarPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ texto => guardarPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Teléfono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={ texto => guardarTelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige la Fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            is24Hour
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={ texto => guardarSintomas(texto)}
          />
        </View>
        <TouchableHighlight
          onPress={() => crearNuevaCita()}
          style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}> Crear Nueva Cita </Text>
        </TouchableHighlight>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 20,
    marginHorizontal: '2.5%',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    marginTop: 5,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;
