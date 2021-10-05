import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import MainView from "../screens/MainView";

export default function MainLayout () {
    return (
        <div className="bg-gray-200 h-screen overflow-y-auto text-gray-800">
            <div className="container m-auto flex flex-col">
                <Router>
                    <Switch>
                        <Route path="/" component={ MainView } />
                    </Switch>
                </Router>
            </div>
        </div>
    )
}
