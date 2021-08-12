import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { User } from 'types/user';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

const Users = () => {
  const [page, setPage] = useState<SpringPage<User>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/users',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <div className="row">
      {page?.content.map((item) => (
        <div key={item.id} className="base-card user-crud-card">
          <div className="user-crud-card-name">
            <p>{item.firstName} {item.lastName}</p>
            <p>{item.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
