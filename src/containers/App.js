import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import { Navigator, StatusBar, View, Text, StyleSheet } from "react-native"
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import Icon from 'react-native-vector-icons/EvilIcons'

import Splash from "./Scenes/Splash"
import Home from "./Scenes/Home"
import Login from "./Scenes/Login"
import User from "./Scenes/User"
import Settings from "./Scenes/Settings"
import Notifications from "./Scenes/Notifications"
import Friends from "./Scenes/Friends"

import NavigationBar from "../components/NavigationBar"
import Tabs from "../components/Tabs"

import { tabSelected } from '../actions/tabs'

class App extends Component {

  renderScene(route, navigator) {
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
                  title = 'Mert Kahyaoğlu'
                  break;
                case 'notifications':
                  title = 'Bildirimler'
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
          initialRoute={{ id: 'splash', displayNavbar: false, showTabs: false }}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.PushFromRight;
          }}
          navigationBar={
            <NavigationBar
               routeMapper={{
                 LeftButton: (route, navigator, index, navState) =>
                  {
                    if (navigator.getCurrentRoutes().length > 1) {
                      return <Icon onPress={() => {navigator.pop()}} color="white" name="chevron-left" size={36} />
                    }
                  },
                 RightButton: (route, navigator, index, navState) =>
                   {
                     if (route.id == 'user') {
                       return <Icon onPress={() => {
                         navigator.push({ id: 'settings', showTabs: false, title: 'Ayarlar' })
                       }} color="white" name="gear" size={36} />
                     }
                   },
                 Title: (route, navigator, index, navState) =>
                   { return (<Text style={styles.title}>{route.title}</Text>); },
               }}
               style={{backgroundColor: '#5FC6DC'}}
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
    backgroundColor: '#f5f5f5'
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
    fontFamily: 'Hobo'
  },
  tabs: {
    backgroundColor:'#202735',
  },
  tab: {
    color: '#F5F5FA',
  },
  selectedTab: {
    color: '#5FC6DC',
  },
})

App.propTypes = {
  tabSelected: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  currentTab: state.tabs.currentTab
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  tabSelected
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
