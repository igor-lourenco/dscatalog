import ProductCard from 'components/ProductCard';
import { Product } from 'types/product';
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { SpringPage } from 'types/vendor/spring';
import Pagination from 'components/Pagination';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';
import ProductFilter, { ProductFilterData } from 'components/ProductFilter';

type ControlComponentsData = {  // dados dos componentes de controle
  activePage: number; // número da página ativa, vindo do componente de paginação
  filterData: ProductFilterData;
}

const Catalog = () => {
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);
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
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/products`,
      params: {
        page: controlComponentsData.activePage,
        size: 12,
        name: controlComponentsData.filterData.name,
        categoryId: controlComponentsData.filterData.category?.id
      },
    };
    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [controlComponentsData])

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  
  return (
    <div className="container my-4 catalog-container">
        <ProductFilter onSubmitFilter={handleSubmitFilter}/>
      <div className="row catalog-title-container">
      </div>

      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => {
            return (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            );
          })
        )}

        <div className="row">
        <Pagination pageCount={(page) ? page.totalPages : 0}
       range={3}
       onChange={handlePageChange} 
       forcePage={page?.number}
       />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
