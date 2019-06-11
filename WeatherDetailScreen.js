import React from 'react';
import { StyleSheet, Text, View, Image, AppRegistry, ImageBackground } from 'react-native';
import { Constants } from 'expo';
import img from './assets/backgroundcolor3.jpg';
import loadingImage from './assets/loading.gif';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null);

    fetch(`http://169.254.191.116:8080/weather-crawler/current-weathers/by-city-name/${city}`)
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (

        <View style={{backgroundColor:'#191f26'}}>
         <ImageBackground source={loadingImage} style={{width: '100%', height: '100%'}} resizeMode='contain'>
         </ImageBackground>
         </View>
      )
    }

    let celsius = this.state.main.temp - 273.15;
    let weatherMain = this.state.weather[0].main;
    let description = this.state.weather[0].description;
    let pressure = this.state.main.pressure;
    let humidity = this.state.main.humidity;
    let windspeed = this.state.wind.speed;
    let iconId = this.state.weather[0].icon;

    return (
      <View>
      <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
        <Text style={styles.header}><Image style={styles.icon} source={{uri: 'https://openweathermap.org/img/w/' + iconId + '.png'}}/>{weatherMain}</Text>
        <Text>{'\n\n\n\n\n\n\n\n'}</Text>
        <Text style={styles.contents}>{celsius.toFixed(2)}°C</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.contents}>대기압 : {pressure}</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.contents}>습기 : {humidity}</Text>
        <Text>{'\n'}</Text>
        <Text style={styles.contents}>바람세기 : {windspeed}m/s</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'white',
  },
  icon: {
    width: 90,
    height: 90,
  },
  Text: {
    fontSize : 20,
  },
  contents: {
    fontSize : 20,
    color : 'white',
  },

});

AppRegistry.registerComponent('WeatherDetailScreen', () => WeatherDetailScreen);