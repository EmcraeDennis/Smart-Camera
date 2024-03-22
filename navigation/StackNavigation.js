import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'


const Tab = createBottomTabNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ tabBarIcon: makeIconRender("home") }}
                    setHeaderShown={false}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ tabBarIcon: makeIconRender("cog") }}
                    setHeaderShown={false}
                />
                <Tab.Screen
                    name='Gallery'
                    component={GalleryScreen}
                    options={{ tabBarIcon: makeIconRender("camera") }}
                    setHeaderShown={false}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function makeIconRender(name) {
    return ({ color, size }) => (
        <MaterialCommunityIcons name={name} color={color} size={size} />
    );
}

export default StackNavigator

const styles = StyleSheet.create({})