import { createDrawerNavigator } from "@react-navigation/drawer";
import Show_Analysis from "./Show_Analysis";
import Submit_Analysis from "./Submit_Analysis";


const Drawer = createDrawerNavigator();

export const analysis_stacks = [
    <Drawer.Screen name="Show_Analysis" component={Show_Analysis} />,
    <Drawer.Screen name="Submit_Analysis" component={Submit_Analysis} />,
]
