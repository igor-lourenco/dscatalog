import './styles.css';
import { Link } from 'react-router-dom';
import { Category } from 'types/category';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import {toast} from 'react-toastify';

type Props = {
  category: Category; //atribui os dados do Produto na variavel
  onDelete: Function; //evento que é uma função
};

const CategoryCrudCard = ({ category, onDelete }: Props) => {
  const handleDelete = (categoryId: number) => {
    //função para deletar o produto

    if (!window.confirm('Tem certeza que deseja deletar??')) {
      // confirma se for verdade,
      return;
    }

    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/categories/${categoryId}`,
      withCredentials: true,
    };

    requestBackend(config).then(() => {
      console.log('DELETADO ID ' + categoryId);
      toast.success('Categoria excluída com sucesso!')
      onDelete(); //dispara a função onDelete para atualizar os dados 
    }).catch((response) => {
      toast.error(`Categoria ${category.name} não pode ser excluída porque existem produtos cadastrados nela!`)
    }) ;
  };

  return (
    <div className="base-card category-crud-card">
      <div className="category-crud-card-name">
        
          <h6>{category.name}</h6>
        
      </div>
      <div className="category-crud-card-buttons-container">
        <button
           onClick={() => handleDelete(category.id)} //product passado como parametro da função CategoryCrudCard
          className="btn btn-outline-danger category-crud-card-buttom category-crud-card-buttom-first"
        >
          EXCLUIR
        </button>
        <Link to={`/admin/categories/${category.id}`}>
          <button className="btn btn-outline-secondary category-crud-card-buttom">
            EDITAR
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCrudCard;
