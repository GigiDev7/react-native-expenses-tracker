import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpanses from "./screens/ManageExpanses";
import RecentExpanses from "./screens/RecentExpanses";
import AllExpenses from "./screens/AllExpenses";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
      }}
    >
      <Tab.Screen
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="hourglass" />
          ),
        }}
        name="RecentExpanses"
        component={RecentExpanses}
      />
      <Tab.Screen
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="calendar" />
          ),
        }}
        name="AllExpenses"
        component={AllExpenses}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="ExpensesOverview"
            component={ExpensesOverview}
          />
          <Stack.Screen name="ManageExpense" component={ManageExpanses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
