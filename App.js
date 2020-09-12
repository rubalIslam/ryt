import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import AroundMe from "./containers/AroundMe";
import AdminLogin from "./containers/AdminLogin";
import Welcome from "./containers/Welcome";
import Room from "./containers/Room";
import Dashboard from "./containers/Dashboard";
import Engineers from "./containers/Engineers";
import EditEngineers from "./containers/EditEngineers";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const [adminToken, setadminToken] = useState(null);
  const [adminId, setadminId] = useState(null);

  // AsyncStorage.removeItem("userToken");
  // AsyncStorage.removeItem("userId");

  const setAdminToken = async token => {
    if (token) {
      AsyncStorage.setItem("adminToken", token);
    } else {
      AsyncStorage.removeItem("adminToken");
    }
    setadminToken(token);
  }

  const setAdminId = async id => {
    if (id) {
      AsyncStorage.setItem("adminId", id);
    } else {
      AsyncStorage.removeItem("adminId");
    }
    setadminId(id);
  };

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  const setId = async id => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const adminToken = await AsyncStorage.getItem("adminToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setadminToken(adminToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
          // No token found, user isn't signed in
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => <Welcome setId={setId} setToken={setToken} />}
            </Stack.Screen>

            <Stack.Screen
              name="SignUp"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => <SignUpScreen setId={setId} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="SignIn"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => <SignInScreen setId={setId} setToken={setToken} />}
            </Stack.Screen>
            <Stack.Screen
              name="AdminLogin"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => <AdminLogin setAdminId={setAdminId} setAdminToken={setAdminToken} />}
            </Stack.Screen>
            {
              adminToken !== null ? (
                <Stack.Screen
                  name="Tab"
                  options={{ header: () => null, animationEnabled: false }}
                >
                  {
                    () => (
                      <Tab.Navigator
                      >
                        <Tab.Screen
                          name="Dashboard"
                          options={{ header: () => null, animationEnabled: false }}
                        >
                          {() => (
                            <Stack.Navigator>
                              <Stack.Screen
                                name="Dashboard"
                                options={{ header: () => null, animationEnabled: false }}
                              >
                                {() => <Dashboard />}
                              </Stack.Screen>
                              <Stack.Screen
                                name="Engineers"
                                options={{ header: () => null, animationEnabled: false }}
                              >
                                {() => <Engineers />}
                              </Stack.Screen>
                              <Stack.Screen
                                name="EditEngineers"
                                options={{ header: () => null, animationEnabled: false }}
                              >
                                {() => <EditEngineers />}
                              </Stack.Screen>
                            </Stack.Navigator>
                          )}
                        </Tab.Screen>
                        <Tab.Screen
                          name="AdminProfile"
                          options={{ header: () => null, animationEnabled: false }}
                        >
                          {() => (
                            <Stack.Navigator>
                              <Stack.Screen
                                name="AdminProfile"
                                options={{ header: () => null, animationEnabled: false }}
                              >
                                {() => <Dashboard />}
                              </Stack.Screen>
                              <Stack.Screen
                                name="Room"
                                options={{ header: () => null, animationEnabled: false }}
                              >
                                {() => <Room />}
                              </Stack.Screen>
                            </Stack.Navigator>
                          )}
                        </Tab.Screen>
                      </Tab.Navigator>
                    )
                  }
                </Stack.Screen>
              ) : null
            }
          </Stack.Navigator>
        ) : (
            // User is signed in
            <Stack.Navigator>
              <Stack.Screen
                name="Tab"
                options={{ header: () => null, animationEnabled: false }}
              >
                {() => (
                  <Tab.Navigator
                    tabBarOptions={{
                      activeTintColor: "black",
                      inactiveTintColor: "white",
                      style: {
                        backgroundColor: "#F1485C"
                      }
                    }}
                  >
                    <Tab.Screen
                      name="Home"
                      options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name={"home"} size={size} color={color} />
                        )
                      }}
                    >
                      {() => (
                        <Stack.Navigator>
                          <Stack.Screen
                            name="Home"
                            options={{
                              title: "List",
                              tabBarLabel: "Home",
                              headerStyle: { backgroundColor: "#F1485C" },
                              headerTitleStyle: { color: "white" },
                              headerTitleAlign: "center"
                            }}
                          >
                            {() => <HomeScreen />}
                          </Stack.Screen>
                          <Stack.Screen
                            name="Room"
                            options={{
                              headerBackTitleVisible: false,
                              headerBackImage: () => (
                                <Ionicons
                                  style={{ marginLeft: 20 }}
                                  name={"ios-arrow-back"}
                                  size={30}
                                  color={"white"}
                                />
                              ),
                              title: "Room",
                              headerStyle: { backgroundColor: "#F1485C" },
                              headerTitleStyle: { color: "white" },
                              headerTitleAlign: "center"
                            }}
                          >
                            {() => <Room />}
                          </Stack.Screen>
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>
                    <Tab.Screen
                      name="Around Me"
                      options={{
                        tabBarLabel: "Around Me",
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons name={"location-pin"} size={size} color={color} />
                        )
                      }}
                    >
                      {() => (
                        <Stack.Navigator>
                          <Stack.Screen
                            name="Around Me"
                            options={{
                              title: "Around Me",
                              headerStyle: { backgroundColor: "#F1485C" },
                              headerTitleStyle: { color: "white" },
                              headerTitleAlign: "center"
                            }}
                          >
                            {() => <AroundMe />}
                          </Stack.Screen>
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>
                    <Tab.Screen
                      name="Profile"
                      options={{
                        tabBarLabel: "Profile",
                        tabBarIcon: ({ color, size }) => (
                          <Ionicons
                            name={"profile"}
                            size={size}
                            color={color}
                          />
                        )
                      }}
                    >
                      {() => (
                        <Stack.Navigator>
                          <Stack.Screen
                            name="Profile"
                            options={{
                              title: "Profile",
                              headerStyle: { backgroundColor: "#F1485C" },
                              headerTitleStyle: { color: "white" },
                              headerTitleAlign: "center"
                            }}
                          >
                            {() => (
                              <ProfileScreen setId={setId} setToken={setToken} />
                            )}
                          </Stack.Screen>
                        </Stack.Navigator>
                      )}
                    </Tab.Screen>
                  </Tab.Navigator>
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
      </NavigationContainer>
    </ActionSheetProvider>
  );
}
