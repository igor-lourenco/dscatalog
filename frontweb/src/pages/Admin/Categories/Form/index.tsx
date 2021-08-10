import './styles.css';

const Form = () => {
  return (
    <div className="category-crud-container">
      <div className="base-card category-crud-form-card">
        <h1 className="category-crud-form-title">DADOS DA CATEGORIA</h1>

        <form action="">
            <div className="row">
                <div className="">
                    <input type="text" className="form-control base-input" />
                </div>
            </div>
            <div>
                <button className="btn btn-outline-danger">CANCELAR</button>
                <button className="btn btn-outline-primary">SALVAR</button>
            </div>
        </form>

      </div>
    </div>
  );
};
export default Form;
