/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Cita from './componentes/cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarform, guardarMostrarForm] = useState(false);
  const [citas, setCitas] = useState([
    // {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    // {id: '2', paciente: 'Redux', propietario: 'Axel', sintomas: 'No Duerme'},
    // {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);

  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  // muestra u oculta el formulario
  const mostrarFormulario = () =>{
    guardarMostrarForm(!mostrarform);
  };

  const cerrarTeclado = () =>{
    Keyboard.dismiss();
  };

  return (
    <>
    <TouchableWithoutFeedback onPress = { () => cerrarTeclado() }>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}> {mostrarform ? 'Cancelar Crear cita' : 'Crear Nueva Cita'} </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          { mostrarform ?
            ( <>
                <Text style={styles.titulo}>Crear Nueva Cita</Text>
                <Formulario
                  citas={citas}
                  setCitas={setCitas}
                  guardarMostrarForm={guardarMostrarForm}/>
              </>
              ) : (
            <>
              <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'} </Text>
              <FlatList
                style={styles.listado}
                //data es un PROP propio de flatlist, serian los datos q renderizaria el flatlist
                data={citas}
                // renderItem, otro PROP, es una funcion que define la apariencia que va a tener la informacion una vez que se muestre, tambien hace el .map como
                // en lo comentado abajo
                renderItem={({item}) => (
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
                )}
                // Para que funcione el .item de arriba, es necesario hacer el key con ID unico
                keyExtractor={cita => cita.id}
              />
            </>
          ) }
        </View>
      </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20 ,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
