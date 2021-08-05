import './styles.css';
import { ReactComponent as Arrowicon } from 'assets/images/Arrow.svg';
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  return (
    <>
    <ReactPaginate
      pageCount={10} // Quantidade Total de páginas 
      pageRangeDisplayed={3} // Quantas bolinhas da paginação vai aparecer
      marginPagesDisplayed={1} // Quantas bolinas de paginação vao aparecer depois dos 3 pontos 
      containerClassName="pagination-container" //classe do container que vai ter os elementos
      pageLinkClassName="pagination-item" //estilo de cada um dos links de paginação
      breakClassName="pagination-item" //estilo dos 3 pontos da paginação
      previousClassName="arrow-previous" // estilo da seta
      nextClassName="arrow-next" //estilo da seta
      activeLinkClassName="pagination-link-active" //estilo de quanto estiver na página
      previousLabel={<Arrowicon/>} //seta antes da paginação
      nextLabel={<Arrowicon/>} //seta depois da paginação
      disabledClassName="arrow-inative"
    />
    </>
  );
};
export default Pagination;
