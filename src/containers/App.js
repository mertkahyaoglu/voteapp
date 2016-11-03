import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/EvilIcons'
import IIcon from 'react-native-vector-icons/Ionicons'

import { Navigator, StatusBar, View, Text, StyleSheet } from "react-native"

import Splash from "./Scenes/Splash"
import Home from "./Scenes/Home"
import Login from "./Scenes/Login"
import User from "./Scenes/User"
import Settings from "./Scenes/Settings"
import Notifications from "./Scenes/Notifications"
import Friends from "./Scenes/Friends"
import ChooseFriends from "./Scenes/ChooseFriends"
import InviteFriends from "./Scenes/InviteFriends"
import VoteView from "./Scenes/VoteView"
import Vote from "./Scenes/Vote"

import NavigationBar from "../components/NavigationBar"
import Tabs from "../components/Tabs"

import '../constants/UserAgent'
import io from 'socket.io-client/socket.io';

import { routeHome, routeSettings, routeFriends, routeInviteFriends, routeSplash } from '../constants/Routes'
import { Color } from '../constants/Styles'
import { HOST } from '../constants/API'

import { setupSocket } from '../actions/socket'

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = io("http://35.160.20.129:3000", {jsonp: false})
    this.socket.connect()
    this.socket.on('message', (data) => {
      console.log(data);
    })
    const { setupSocket } = this.props
  }

  componentDidMount() {
  }

  renderScene(route, navigator) {
    const { info } = this.props
    let Component
    let showTabs = false
    switch (route.id) {
      case 'splash':
        Component = Splash
        break
      case 'login':
        Component = Login
        break
      case 'home':
        Component = Home
        break
      case 'notifications':
        Component = Notifications
        break
      case 'user':
        Component = User
        break
      case 'settings':
        Component = Settings
        break
      case 'friends':
        Component = Friends
        break
      case 'choosefriends':
        Component = ChooseFriends
        break
      case 'invitefriends':
        Component = InviteFriends
        break
      case 'voteview':
        Component = VoteView
        break
      case 'vote':
        Component = Vote
        break
      default:
        return null
    }
    let _styles = [styles.sceneContainer]
    if (route.displayNavbar !== false) {
      _styles.push(styles.sceneMarginTop)
    }
    return (
      <View style={_styles}>
        <Component route={route} navigator={navigator}/>
        {
          route.showTabs !== false &&
          <Tabs
            selected={route.id}
            style={styles.tabs}
            selectedStyle={styles.selectedTab}
            onSelect={el => {
              let title
              switch (el.props.name) {
                case 'home':
                  title = 'Startup!'
                  break;
                case 'user':
                  title = 'My Profile'
                  break;
                case 'notifications':
                  title = 'Notifications'
                  break;
                default:

              }
              navigator.replace({ id: el.props.name, title })
            }}>
              <Text style={styles.tab} name="home">
                <Icon name="question" size={36} />
              </Text>
              <Text style={styles.tab} name="notifications">
                <Icon name="bell" size={36} />
              </Text>
              <Text style={styles.tab} name="user">
                <Icon name="user" size={36} />
              </Text>
          </Tabs>
        }
      </View>
    )
  }

  render() {
    const { tabSelected, currentTab } = this.props
    return (
      <View style={styles.container}>
        <StatusBar
         backgroundColor="#5FC6DC"
         barStyle="light-content" />
        <Navigator
          style={styles.container}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          initialRoute={routeSplash()}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FadeAndroid
          }}
          navigationBar={
            <NavigationBar
               style={styles.navigationBar}
               routeMapper={{
                 LeftButton: (route, navigator, index, navState) =>
                  {
                    if (navigator.getCurrentRoutes().length > 1) {
                      return <Icon style={styles.navIcon} onPress={() => {navigator.pop()}} color="white" name="chevron-left" size={36} />
                    }
                    if (route.id == 'user') {
                      return <IIcon style={styles.navIcon} onPress={() => {
                        navigator.push(routeFriends(Navigator.SceneConfigs.PushFromLeft))
                      }} color="white" name="md-people" size={36} />
                    }
                  },
                 RightButton: (route, navigator, index, navState) =>
                   {
                     if (route.id == 'user') {
                       return <Icon style={styles.navIcon} onPress={() => {
                         navigator.push(routeSettings())
                       }} color="white" name="gear" size={36} />
                     }
                     if (route.id == 'choosefriends' || route.id == 'friends') {
                       return <IIcon style={styles.navIcon} onPress={() => {
                         navigator.push(routeInviteFriends())
                       }} color="white" name="md-person-add" size={36} />
                     }
                     if (route.id == 'voteview') {
                       return <Icon style={styles.navIcon} onPress={() => {
                         navigator.replace(routeHome())
                       }} color="white" name="close" size={36} />
                     }
                   },
                 Title: (route, navigator, index, navState) =>
                   <Text style={styles.title}>{route.title}</Text>
               }}
               navigationStyles={Navigator.NavigationBar.StylesIOS}
             />
          } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.bgBody,
  },
  sceneContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  sceneMarginTop: {
    marginTop: 64
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'notoserif'
  },
  tabs: {
    backgroundColor: Color.bgTabs,
  },
  tab: {
    color: Color.textTab,
  },
  selectedTab: {
    color: Color.primary,
  },
  navigationBar: {
    backgroundColor: Color.primary,
  },
  navIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
})

App.propTypes = {
}

const mapStateToProps = (state) => ({
  info: state.login.info
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setupSocket
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
