import { Route, Switch } from "react-router-dom";
import List from "./List";


const Categories = () => {
    return(
        <Switch>
            <Route path="/admin/categories" exact>
                <List />
            </Route>
        </Switch>
    );
}

export default Categories;