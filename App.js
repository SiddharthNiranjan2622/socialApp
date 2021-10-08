import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import AppForm from './components/AppForm';
import NavigationProvider from './context/NavigationContext';
import MainScreen from './screens/MainScreen';
import configureStore from './store/configureStore';

function App(props) {
  const store = configureStore();
  // store.getState().postSlice.loading
  // store.subscribe
  return (
    <Provider store={store}>
      <NavigationProvider>
        <MainScreen />
      </NavigationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
