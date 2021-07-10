import {ReactComponent as ArrowIcon} from 'assets/images/Arrow.svg';
import ProductPrice from 'components/ProductPrice';
import './styles.css'

const ProductDetails = () => {
  return (
    <div className="product-details-container">
      <div className="base-card product-details-card">
        <div className="goback-container">
            <ArrowIcon />
            <h2>VOLTAR</h2>
        </div>
        <div className="row">
          <div className="col-xl-6">
              <div className="img-container">
                  <img src="https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/1-big.jpg" alt="nome do produto" />

              </div>
              <div className="name-price-container">
                  <h1>Nome do produto</h1>
                  <ProductPrice price={13.65}/>
              </div>
          </div>
          <div className="col-xl-6">
              <div className="description-container">
                  <h2>Descrição do produto</h2>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est iste reiciendis officia dolores nemo nesciunt necessitatibus consequatur eius at rem.</p>

              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
