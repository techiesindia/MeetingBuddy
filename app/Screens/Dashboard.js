/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import { Navigation } from 'react-native-navigation';

import { Container, Header, Left, Body, Right, Button, Title, Drawer, Content, Footer, FooterTab } from 'native-base';

import SideBar from '../components/SideBar';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Dashboard extends Component {

  constructor(props) {
     super(props)
     this.state = {
       index: 0
     }
  }

  closeDrawer () {
   this.drawer._root.close()
  }

  openDrawer () {
   this.drawer._root.open()
  }

  activateTab = (index) => {
    this.setState({index: index})
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}>
      <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => this.openDrawer()}>
            <Icon name='menu' size={27} />
          </Button>
        </Left>
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name='camera' size={27}/>
          </Button>
        </Right>
      </Header>
      <Content />
    </Container>
    <Footer>
      <FooterTab>
          <Button
            activeTextStyle={{color: '#fff', fontWeight: 'normal'}}
            onPress={() => this.props.navigator.push({
              screen: 'Buddy.Meetings'
            })}
            >
            <Text>Meetings</Text>
          </Button>
          <Button
             onPress={() => this.props.navigator.push({
            screen: 'Buddy.TimeConvertor'
          })}>
            <Text>Time Convertor</Text>
          </Button>
        </FooterTab>
    </Footer>
    </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
