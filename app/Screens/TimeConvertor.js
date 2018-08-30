/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import TextStyle from '../components/TextStyle';
import ButtonComponent from '../components/ButtonComponent';
import { SearchBar } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class TimeConvertor extends Component {

constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    this.state={
      isVisible: false,
      chosenDate: 'Date Time',
      address: '',
      coordinates: '',
      timeStamp: '',
      sourceTimeZone: '',
      destinationTimeZone: '',
      sourceDateTime: '',
      destinationDateTime: '',
      placeType: ''
    }
  }

  componentWillMount(){
    this.setState({
      timeStamp: Date.parse(new Date())
    })
  }

  onNavigatorEvent = event => {
    if (event.type === "NavBarButtonPress") {
      if (event.id === "sideDrawerToggle") {
        this.props.navigator.toggleDrawer({
          side: "left"
        });
      }
      else if (event.id === "addMeeting"){
        this.props.navigator.push({
          screen: "Buddy.AddMeeting",
          side: "right",
          title: "Add Meeting",
          passProps: {
            // zone: this.state.destinationTimeZone
            zone: "07-07-18"
          }
        })
      }
    }
    else if (event.type === 'DeepLink') {
      const parts = event.link.split('/');
      if (parts[0] === 'policy'){
        this.props.navigator.showModal({
          screen: parts[1],
          title: "Privacy Policy"
        });
      }
      else if (parts[0] === 'swiper'){
        this.props.navigator.push({
          screen: parts[1]
        });
      }
    }
  };

  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      chosenDate: moment(datetime).format('MMMM, Do YYYY HH:mm'),
      sourceDateTime: moment(datetime).tz(`${this.state.sourceTimeZone}`).format('YYYY-MM-DD HH:mm:ssZZ')
    })
  }

  hidePicker = () => {
    this.setState({
      isVisible: false
    })
  }

  showDateTimePicker = () => {
    this.setState({
      isVisible: true
    })
  }

  handleTimeZoneID = () => {
    let url = `https://maps.googleapis.com/maps/api/timezone/json?location=${this.state.coordinates}&timestamp=${this.state.timeStamp}&key=AIzaSyAbjpHVRy39RbBFZJxbVmXMZE7T7ATXoZs`
    console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((responseJson) => {
          if (this.state.placeType === "source"){
            this.setState({
              sourceTimeZone: responseJson.timeZoneId
            })
          }
          else{
            this.setState({
              destinationTimeZone: responseJson.timeZoneId,
              destinationDateTime: moment(this.state.sourceDateTime).tz(`${this.state.sourceTimeZone}`).format('YYYY-MM-DD HH:mm:ssZZ')
            })
          }
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        })
    };


  render() {
    return (
      <View style={styles.container}>
        <TextStyle
          text="Source Location"
            />
        <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={3} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        fetchDetails={true}
        listViewDisplayed='false'    // true/false/undefined
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data.description, details.geometry.location.lat, details.geometry.location.lng);
          this.setState(
            {
              address: data.description, // selected address
              coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}`, // selected coordinates
              placeType: "source"
            }
          );
          this.handleTimeZoneID()
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyAbjpHVRy39RbBFZJxbVmXMZE7T7ATXoZs',
          language: 'en', // language of the results
          types: '(cities)' // default: 'geocode'
        }}

        styles={{
          container: {
            zIndex: 10,
            overflow: 'visible',
          },
          textInputContainer: {
            borderTopWidth: 0,
            borderBottomWidth: 0,
            height: 50,
            overflow: 'visible',
            backgroundColor: '#ffffff',
            borderColor: '#ffffff',
            borderRadius: 100,
          },
          textInput: {
            backgroundColor: 'transparent',
            fontSize: 15,
            lineHeight: 22.5,
            paddingBottom: 0,
            flex: 1
          },
          listView: {
            position: 'absolute',
            top: 60,
            left: 10,
            right: 10,
            backgroundColor: '#ffffff',
            borderRadius: 5,
            flex: 1,
            elevation: 5,
            zIndex: 0
          },
          description: {
            color: '#1faadb'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}

        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
          <TextStyle
            text="Source Date & Time"
          />
        <TouchableOpacity onPress={this.showDateTimePicker}>
            <View style={styles.viewStyle}>
              <Text style={styles.buttonTextStyle}>{this.state.chosenDate}</Text>
            </View>
          </TouchableOpacity>
          <TextStyle
            text="Destination Location"
          />
          <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={3} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='false'    // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data.description, details.geometry.location.lat, details.geometry.location.lng);
            this.setState(
              {
                address: data.description, // selected address
                coordinates: `${details.geometry.location.lat},${details.geometry.location.lng}`, // selected coordinates
                placeType: "destination"
              }
            );
            this.handleTimeZoneID()
          }}

          getDefaultValue={() => ''}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyAbjpHVRy39RbBFZJxbVmXMZE7T7ATXoZs',
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
          }}

          styles={{
            container: {
              zIndex: 5,
              overflow: 'visible',
            },
            textInputContainer: {
              borderTopWidth: 0,
              borderBottomWidth: 0,
              height: 50,
              overflow: 'visible',
              backgroundColor: 'white',
              borderColor: 'white',
              borderRadius: 100,
            },
            textInput: {
              backgroundColor: 'transparent',
              fontSize: 15,
              lineHeight: 22.5,
              paddingBottom: 0,
              flex: 1
            },
            listView: {
              position: 'absolute',
              top: 60,
              left: 10,
              right: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              flex: 1,
              elevation: 3,
              zIndex: 0
            },
            description: {
              color: '#1faadb'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        />
          <TextStyle
            text="Destination Time"
          />
        <Text style={{width: "90%", height: "30%", backgroundColor: 'rgba(128, 128, 128, 1)'}}>
            {this.state.destinationDateTime}
          </Text>
          <DateTimePicker
            cancelTextIOS={'Cancel'}
            confirmTextIOS={'Update'}
            isVisible={this.state.isVisible}
            onConfirm={this.handlePicker}
            onCancel={this.hidePicker}
            mode={'datetime'}
            datePickerModeAndroid={'spinner'}
            is24Hour={true}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(241, 245, 246)',
    flexDirection: 'column',
    padding: 15
  },
  viewStyle: {
    width: Dimensions.get('window').width - 40,
    height: 40,
    backgroundColor: 'rgba(107, 123, 129, 1)',
    marginTop: 15,
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#fff',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18
  }
});
