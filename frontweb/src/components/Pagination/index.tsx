import './styles.css';
import { ReactComponent as Arrowicon } from 'assets/images/Arrow.svg';

const Pagination = () => {
  return (
    <div className="pagination-container">
      <Arrowicon  className="arrow-previous arrow-inative"/>
      <div className="pagination-item active">1</div>
      <div className="pagination-item">2</div>
      <div className="pagination-item">3</div>
      <div className="pagination-item">...</div>
      <div className="pagination-item">10</div>
      <Arrowicon className="arrow-next arrow-active"/>
    </div>
  );
};
export default Pagination;
