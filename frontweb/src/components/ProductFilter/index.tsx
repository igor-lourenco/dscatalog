import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { Controller, useForm } from 'react-hook-form';
import { Category } from 'types/category';
import Select from 'react-select';
import './styles.css';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';

 export type ProductFilterData = {
  name: string;
  category: Category | null;
};

type Props = {
    onSubmitFilter : (data: ProductFilterData) => void
}

const ProductFilter = ({onSubmitFilter} : Props) => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    control, // objeto de controle do hook form
  } = useForm<ProductFilterData>();

  const onSubmit = (formData: ProductFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => { // função pra limpar os campos de busca
    setValue('name', '');
    setValue('category', null);
  }

  const handleChangeCategory = (value: Category) => { //função pra enviar o formulário toda vez que mudar o valor do campo das categorias 
      setValue('category', value)

      const obj : ProductFilterData = { // const obj do tipo ProductFilterFata
          name: getValues('name'), // pega o valor que tá no campo nome
          category: getValues('category') // pega o valor que tá no campo da categoria
      }

      onSubmitFilter(obj);
  }

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
          <button className="product-filter-search-icon">
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
                  classNamePrefix="product-filter-select"
                  onChange={value => handleChangeCategory(value as Category)}
                  getOptionLabel={(category: Category) => category.name} //recebe o item da lista e coloca o nome da categoria
                  getOptionValue={(category: Category) => String(category.id)} //recebe o item da lista e coloca o valor da categoria
                />
              )}
            />
          </div>
          <button onClick={handleFormClear} className="btn btn-outline-secondary btn-product-filter-clear">LIMPAR <span className="btn-product-filter-word">FILTRO</span></button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
