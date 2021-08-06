import './styles.css';
import { ReactComponent as Arrowicon } from 'assets/images/Arrow.svg';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  range : number;
  onChange?: (pageNumber : number) => void // função que recebe numero como argumento
  forcePage? : number;
}

const Pagination = ( {forcePage, pageCount, range, onChange } : Props) => {
  return (
    <>
    <ReactPaginate
    forcePage={forcePage}
      pageCount={pageCount} // Quantidade Total de páginas 
      pageRangeDisplayed={range} // Quantas bolinhas da paginação vai aparecer
      marginPagesDisplayed={1} // Quantas bolinas de paginação vao aparecer depois dos 3 pontos 
      containerClassName="pagination-container" //classe do container que vai ter os elementos
      pageLinkClassName="pagination-item" //estilo de cada um dos links de paginação
      breakClassName="pagination-item" //estilo dos 3 pontos da paginação
      previousClassName="arrow-previous" // estilo da seta
      nextClassName="arrow-next" //estilo da seta
      activeLinkClassName="pagination-link-active" //estilo de quanto estiver na página
      previousLabel={<div className="pagination-arrow-container"><Arrowicon/></div>} //seta antes da paginação
      nextLabel={<div className="pagination-arrow-container"><Arrowicon/></div>} //seta depois da paginação
      disabledClassName="arrow-inative"
      onPageChange={(items) => (onChange) ? onChange(items.selected) : {} }
    />
    </>
  );
};
export default Pagination;
