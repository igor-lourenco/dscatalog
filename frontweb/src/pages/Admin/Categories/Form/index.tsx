import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = {
    categoryId: string;
}

const Form = () => {
  const history = useHistory();
  const {categoryId} = useParams<UrlParams>();
  const isEditing = categoryId !== 'create';

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Category>();

  useEffect(() => { // função pra carrega os dados da categoria no formulário de editar
    if (isEditing) { //se estiver na rota de editar
      requestBackend({ url: `/categories/${categoryId}` }).then((response) => { //carrega a categoria do id pego na rota url
        const category = response.data as Category; //atribui os dados carregados do tipo Category na const
        setValue('name', category.name); //coloca os valores no formulario
      });
    }
  }, [isEditing, categoryId, setValue]); //caso mudar o valor de algum, a função atualiza os dados

  const onSubmit = (formData: Category) => { // função pra salvar uma categoria
    const params: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/categories/${categoryId}` : `/categories`,
      data: formData,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      console.log('salvo', response.data);
      history.push('/admin/categories'); 
    });
  };

  const handleCancel = () => {
    history.push('/admin/categories'); //volta para a listagem
  };

  return (
    <div className="category-crud-container">
      <div className="base-card category-crud-form-card">
        <h1 className="category-crud-form-title">DADOS DA CATEGORIA</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="category-crud-input">
              <input
                {...register('name', {
                  required: 'Campo obrigatório',
                })}
                type="text"
                className={`form-control base-input ${
                  errors.name ? 'is-invalid' : ''
                }`} //mostra o campo vermelho
                placeholder="Nome da categoria"
                name="name"
              />
              <div className="invalid-feedback d-block">
                {errors.name?.message}
              </div>
            </div>
          </div>
          <div className="category-crud-form-buttons">
            <button className="btn btn-outline-danger" onClick={handleCancel}>
              CANCELAR
            </button>
            <button className="btn btn-outline-primary category-crud-form-button">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
