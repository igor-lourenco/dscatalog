import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './Users';
import PrivateRoute from 'components/PrivateRoute';
import './styles.css';
import Products from './Products';
import Categories from './Categories';

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/products">
            <Products />
          </PrivateRoute>
          <PrivateRoute path="/admin/categories">
            <Categories />
          </PrivateRoute>
          <PrivateRoute path="/admin/users" roles={['ROLE_ADMIN']}>
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};
export default Admin;
