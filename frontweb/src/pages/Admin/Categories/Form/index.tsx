import { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';
import './styles.css';

const Form = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();

  const onSubmit = (formData: Category) => { // função pra salvar uma categoria
    const params: AxiosRequestConfig = {
      method: 'POST',
      url: `/categories`,
      data: formData,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      console.log('salvo', response.data);
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
