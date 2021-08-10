import './styles.css';

import { Link } from 'react-router-dom';
import { Category } from 'types/category';
//import { AxiosRequestConfig } from 'axios';
//import { requestBackend } from 'util/requests';

type Props = {
  category: Category; //atribui os dados do Produto na variavel
  //onDelete: Function; //evento que é uma função
};

const CategoryCrudCard = ({ category }: Props) => {
  /*const handleDelete = (productId: number) => {
    //função para deletar o produto

    if (!window.confirm('Tem certeza??')) {
      // confirma se for verdade,
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/products/${productId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      console.log('DELETADO ID ' + productId);
      onDelete(); //dispara a função onDelete para atualizar os dados 
    });
  };*/

  return (
    <div className="base-card category-crud-card">
      <div className="category-crud-card-description">
        <div className="category-crud-card-bottom-container">
          <h6>{category.name}</h6>
        </div>
      </div>
      <div className="category-crud-card-buttons-container">
        <button
          // onClick={() => handleDelete(product.id)} //product passado como parametro da função ProductCrudCard
          className="btn btn-outline-danger category-crud-card-buttom category-crud-card-buttom-first"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/products/${category.id}`}>
          <button className="btn btn-outline-secondary category-crud-card-buttom">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCrudCard;
