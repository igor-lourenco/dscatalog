import { AxiosRequestConfig } from 'axios';
import ProductCrudCard from 'pages/Admin/Products/ProductCrudCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import './styles.css';

const List = () => {
  const [page, setPage] = useState<SpringPage<Product>>();

  useEffect(() => {
    getProducts(); //chama a função
  }, []);

  const getProducts = () => { //função para pegar todos os produtos no backend
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/products`,
      params: {
        page: 0,
        size: 50,
      },
    };
    //setIsLoading(true);
    requestBackend(config).then((response) => {
      //passa o config como parametro no requestBackend
      setPage(response.data); //atribui os dados no setPage
    });
    // .finally(() => setIsLoading(false));
  };

  return (
    <div className="product-crud-container">
      <div className="product-crud-bar-container">
        <Link to="/admin/products/create">
          <button className="btn btn-primary text-white btn-crud-add">
            ADICIONAR
          </button>
        </Link>

        <div className="base-card product-filter-container">Search Bar</div>
      </div>

      <div className="row">
        {page?.content.map((product) => (
          <div key={product.id} className="col-sm-6 col-md-12">
            <ProductCrudCard product={product}  
            onDelete={() => getProducts()} //evento que chama a lista atualizada
             />
          </div>
        ))}
      </div>
    </div>
  );
};
export default List;