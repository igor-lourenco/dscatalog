import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductFilter, { ProductFilterData } from 'components/ProductFilter';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

type ControlComponentsData = {  // dados dos componentes de controle
  activePage: number; // número da página ativa, vindo do componente de paginação
  filterData: ProductFilterData;
}

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  const [controlComponentsData, setControlComponentsData] = useState<ControlComponentsData>(
    {//mantém o estado dos dados de todos os componentes que fazem algum controle da listagem
    activePage: 0,
    filterData: {name: '', category: null}
  });

  const handlePageChange = (pageNumber: number) => { //atualiza o estado que o componente devolve
    setControlComponentsData({activePage: pageNumber, filterData: controlComponentsData.filterData})
  }

  const handleSubmitFilter = (data : ProductFilterData) => {
    setControlComponentsData({activePage: 0, filterData: data})

  }

  const getProducts = useCallback(() => {
     //função para pegar todos os produtos no backend
      const config: AxiosRequestConfig = {
        method: 'GET',
        url: `/products`,
        params: {
          page: controlComponentsData.activePage, 
          size: 3,
          name: controlComponentsData.filterData.name,
          categoryId: controlComponentsData.filterData.category?.id
        },
      };
      //setIsLoading(true);
      requestBackend(config).then((response) => {
        //passa o config como parametro no requestBackend
        setPage(response.data); //atribui os dados no setPage
      });
      // .finally(() => setIsLoading(false));
    
  },[controlComponentsData])

  useEffect(() => {
    getProducts(); //chama a função
  }, [getProducts]);

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>

        <ProductFilter onSubmitFilter={handleSubmitFilter}/>
      </div>

      <div className="row">
        {page?.content.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={product}  
            onDelete={getProducts} //evento que chama a lista atualizada
             />
          </div>
        ))}
      </div>
      <Pagination pageCount={(page) ? page.totalPages : 0}
       range={3}
       onChange={handlePageChange} 
       forcePage={page?.number}
       />
    </div>
  );
};
export default List;
