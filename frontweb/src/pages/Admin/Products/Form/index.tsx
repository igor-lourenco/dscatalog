import { AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = { // tipo criado, pode ser mais d um em uma rota url
  productId: string;
};

const Form = () => {
  const history = useHistory();

  const { productId } = useParams<UrlParams>(); //pega o parametro da url
  const isEditing = productId !== 'create'; //se parametro da url for diferente do create

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //permite definir o valor de algum atributo
  } = useForm<Product>();

  useEffect(() => {
    if (isEditing) { //se estiver na rota de editar
      requestBackend({ url: `/products/${productId}` }).then((response) => { //carrega o produto do id pego na rota url
        const product = response.data as Product; //atribui os dados carregados do tipo Product na const
        setValue('name', product.name); //coloca os valores no formulario
        setValue('price', product.price);
        setValue('description', product.description);
        setValue('imgUrl', product.imgUrl);
        setValue('categories', product.categories);
      });
    }
  }, [isEditing, productId, setValue]); //caso mudar o valor de algum, a função atualiza os dados 

  const onSubmit = (formData: Product) => {
    const data = {
      ...formData,
      imgUrl: isEditing // se estiver editando 
        ? formData.imgUrl //mantém o que estava no formData
        : 'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg',
      categories: isEditing ? formData.categories : [{ id: 1, name: '' }],
    };

    const config: AxiosRequestConfig = {
      method: isEditing ? 'PUT' : 'POST', // se estiver editando, metodo 'PUT' senão 'POST' 
      url: isEditing ? `/products/${productId}` : `/products`,// se estiver editando, metodo 'PUT' senão 'POST' 
      data: data, //atribui os dados passados na variavel data
      withCredentials: true, //passa token no header da requisição
    };

    requestBackend(config).then((response) => {
      console.log(response.data); //imprime os dados
      history.push('/admin/products');
    });
  };

  const handleCancel = () => {
    history.push('/admin/products'); //volta para a listagem
  };

  return (
    <div className="product-crud-container">
      <div className="base-card product-crud-form-card">
        <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row product-crud-inputs-container">
            <div className="col-lg-6 product-crud-inputs-left-container">
              <div className="margin-bottom-30">
                <input
                  {...register('name', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.name ? 'is-invalid' : ''
                  }`} //mostra o campo vermelho
                  placeholder="Nome do produto"
                  name="name"
                />
                <div className="invalid-feedback d-block">
                  {errors.name?.message}
                </div>
              </div>
              <div className="margin-bottom-30">
                <input
                  {...register('price', {
                    required: 'Campo obrigatório',
                  })}
                  type="text"
                  className={`form-control base-input ${
                    errors.price ? 'is-invalid' : ''
                  }`} //mostra o campo vermelho
                  placeholder="Preço do produto"
                  name="price"
                />
                <div className="invalid-feedback d-block">
                  {errors.price?.message}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <textarea
                  rows={10}
                  {...register('description', {
                    required: 'Campo obrigatório',
                  })}
                  className={`form-control base-input h-auto ${
                    errors.price ? 'is-invalid' : ''
                  }`} //mostra o campo vermelho
                  placeholder="Descrição"
                  name="description"
                />
                <div className="invalid-feedback d-block">
                  {errors.description?.message}
                </div>
              </div>
            </div>
          </div>
          <div className="product-crud-buttons-container">
            <button
              className="btn btn-outline-danger product-crud-button"
              onClick={handleCancel}
            >
              CANCELAR
            </button>
            <button className="btn btn-outline-primary  product-crud-button">
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Form;
