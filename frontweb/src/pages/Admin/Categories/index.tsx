import { Route, Switch } from "react-router-dom";
import Form from "./Form";
import List from "./List";


const Categories = () => {
    return(
        <Switch>
            <Route path="/admin/categories" exact>
                <List />
            </Route>
            <Route path="/admin/categories/:categoryId" exact>
                <Form />
            </Route>
        </Switch>
    );
}

export default Categories;