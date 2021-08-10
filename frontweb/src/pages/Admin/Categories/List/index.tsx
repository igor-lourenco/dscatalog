import { Link } from 'react-router-dom';
import CategoryCrudCard from '../CategoryCrudCard';
import './styles.css';

const List = () => {
  const category = {
    id: 1,
    name: 'Livros',
  };

  return (
    <div className="">
      <div className="category-crud-bar-container">
        <Link to="/admin/categories/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>

        <div className="base-card category-filter-container">search</div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-md-12">
          <CategoryCrudCard category={category} />
        </div>
        <div className="col-sm-6 col-md-12">
          <CategoryCrudCard category={category} />
        </div>
        <div className="col-sm-6 col-md-12">
          <CategoryCrudCard category={category} />
        </div>
        <div className="col-sm-6 col-md-12">
          <CategoryCrudCard category={category} />
        </div>
      </div>
    </div>
  );
};

export default List;
