import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import Select from 'react-select';
import './styles.css';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    control, // objeto de controle do hook form
  } = useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    console.log('enviou',  formData);
  };

  useEffect(() => {
    //função pra carrega do backend quando o componente for montado
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content); //Atribui o dados da resposta do backend no setSelectCategories
    });
  }, []);

  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            className="form-control"
            placeholder="Nome do produto"
            name="name"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller //
              name="category" //nome do campo, tem q ser igual o nome do estado e do tipo Product
              control={control}
              render={(
                { field } //integra o select do formulário com o campo gerenciado pelo react-hook-form
              ) => (
                <Select
                  {...field}
                  options={selectCategories} //categorias carregadas do backend
                  placeholder="Categoria"
                  isClearable
                  classNamePrefix="product-crud-select"
                  getOptionLabel={(category: Category) => category.name} //recebe o item da lista e coloca o nome da categoria
                  getOptionValue={(category: Category) => String(category.id)} //recebe o item da lista e coloca o valor da categoria
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary">LIMPAR</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
