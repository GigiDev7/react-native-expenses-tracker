import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpanses from "./screens/ManageExpanses";
import RecentExpanses from "./screens/RecentExpanses";
import AllExpenses from "./screens/AllExpenses";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="RecentExpanses" component={RecentExpanses} />
      <Tab.Screen name="AllExpenses" component={AllExpenses} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} />
          <Stack.Screen name="ManageExpense" component={ManageExpanses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});
