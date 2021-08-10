import './styles.css';

const Form = () => {
  return (
    <div className="category-crud-container">
      <div className="base-card category-crud-form-card">
        <h1 className="category-crud-form-title">DADOS DA CATEGORIA</h1>

        <form action="">
            <div className="row">
                <div className="category-crud-input">
                    <input type="text" className="form-control base-input" />
                </div>
            </div>
            <div className="category-crud-form-buttons">
                <button className="btn btn-outline-danger">CANCELAR</button>
                <button className="btn btn-outline-primary category-crud-form-button">SALVAR</button>
            </div>
        </form>

      </div>
    </div>
  );
};
export default Form;
