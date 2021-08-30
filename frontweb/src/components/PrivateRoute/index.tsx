import { Redirect, Route } from 'react-router-dom';
import { Role } from 'types/role';
import { hasAnyRoles, isAuthenticated, } from 'util/auth';

type Props = {
  children: React.ReactNode; //sub-elementos
  path: string;
  roles?: Role[];
};

const PrivateRoute = ({ children, path, roles = [] }: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? ( //testa se o usuario não esta autenticado
          <Redirect // redireciona para a tela de login
            to={{
              pathname: "/admin/auth/login",
              state: { from: location },
            }}
          />
        ) : !hasAnyRoles(roles) ? ( // testa se o usuario não tem o role admin
          <Redirect to="/admin/products" /> //redireciona para a tela padrao
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
