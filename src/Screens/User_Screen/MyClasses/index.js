import { createStackNavigator } from "@react-navigation/stack"
import MyClasses from "./MyClasses";
import ShowOptions from "./ShowOptions";

const Stack = createStackNavigator();

export const myClasses_stacks = [
    <Stack.Screen name="MyClasses" component={MyClasses}/>,
    <Stack.Screen name="ShowOptions" component={ShowOptions}/>,
]
