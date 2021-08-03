import './styles.css';
import ProductPrice from 'components/ProductPrice';
import { Product } from 'types/product';
import CategoryBadge from '../CategoryBadge';

type Props = {
  product: Product;
};

const ProductCrudCard = ({ product }: Props) => {
  return (
    <div className="base-card product-crud-card">
      <div className="product-crud-card-top-container">
        <img src={product.imgUrl} alt={product.name} />
      </div>
      <div>
        <div className="product-crud-card-bottom-container">
          <h6>{product.name}</h6>
          <ProductPrice price={product.price} />
        </div>

        <div className="product-crud-categories-container">
          {product.categories.map((x) => (
            <CategoryBadge name={x.name} key={x.id} />
          ))}
        </div>
      </div>
      <div className="product-crud-card-buttons-container">
        <button className="btn btn-outline-danger product-crud-card-buttom product-crud-card-buttom-first">EXCLUIR</button>
        <button className="btn btn-outline-secondary product-crud-card-buttom">EDITAR</button>
      </div>
    </div>
  );
};

export default ProductCrudCard;
