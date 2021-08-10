import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from 'types/category';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import CategoryCrudCard from '../CategoryCrudCard';
import './styles.css';

const List = () => {
  const [page, setPage] = useState<SpringPage<Category>>();
  

  const getCategories = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/categories`,
      params: {
        page: pageNumber,
        size: 12,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  };

  useEffect(() => {
    getCategories(0);
  }, []);

  return (
    <div className="category-crud-container">
      <div className="category-crud-bar-container">
        <Link to="/admin/categories/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>

        <div className="base-card category-filter-container">search</div>
      </div>
      <div className="row">
        {page?.content.map((category) => (
          <div key={category.id} className="col-sm-6 col-md-12">
            <CategoryCrudCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
