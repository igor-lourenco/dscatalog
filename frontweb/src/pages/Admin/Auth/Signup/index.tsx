import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { Users } from 'types/users';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { AxiosRequestConfig } from 'axios';
import './styles.css';

const Signup = () => {
  const history = useHistory();

  const { register,handleSubmit,formState: { errors }} = useForm<Users>();// objeto de controle do hook form

  const onSubmit = (formData: Users) => {
      const data = {
          ...formData,
          roles: [{id: 2}]
      }
    const config: AxiosRequestConfig = {
      method: 'POST', // se estiver editando, metodo 'PUT' senão 'POST'
      url: `/users`, // se estiver editando, metodo 'PUT' senão 'POST'
     data: data
    };

    requestBackend(config)
      .then((response) => {
        toast.info('Usuário cadastrado com sucesso!');
        console.log(response.data); //imprime os dados
        history.push('/admin/auth');
      })
      .catch(() => {
        toast.error('Erro ao cadastrar o usuário!');
      });
  };

  const handleCancel = () => {
    history.push('/admin/auth'); //volta para a listagem
  };

  return (
    <div className="base-card login-card">
      <h1>Cadastrar</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="margin-bottom-30">
          <input
            {...register('firstName', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.firstName ? 'is-invalid' : ''
            }`} //mostra o campo vermelho
            placeholder="Primeiro nome"
            name="firstName"
          />
          <div className="invalid-feedback d-block">
            {errors.firstName?.message}
          </div>
        </div>

        <div className="margin-bottom-30">
          <input
            {...register('lastName', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.lastName ? 'is-invalid' : ''
            }`} //mostra o campo vermelho
            placeholder="Segundo nome"
            name="lastName"
          />
          <div className="invalid-feedback d-block">
            {errors.lastName?.message}
          </div>
        </div>

        <div className="form-check ">
             <input  type="radio" 
                {...register('roles',{ 
                    value: [{id: 1}]  
                } )}
                className={` form-check-input  ${
                    errors.roles ? 'is-invalid' : ''
                }`}
                name='roles'
                checked
                />
            <label className="form-check-label" >
                Operador
            </label>
        </div>
        <div className="form-check margin-select">
            <input  type="radio"  
             {...register('roles',{
                value: [{id: 2}]
            } )}
            className={` form-check-input  ${
                errors.roles ? 'is-invalid' : ''
            }`}
            name='roles'
            />
            <label className="form-check-label" >
                Admin
            </label>
        </div>


        <div className="margin-bottom-30">
          <input
            {...register('email', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            className={`form-control base-input ${
              errors.email ? 'is-invalid' : ''
            }`} //mostra o campo vermelho
            placeholder="Email"
            name="email"
          />
          <div className="invalid-feedback d-block">
            {errors.email?.message}
          </div>
        </div>

        <div className="margin-bottom-30">
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`form-control base-input ${
              errors.password ? 'is-invalid' : ''
            }`} //mostra o campo vermelho
            placeholder="Senha"
            name="password"
          />
        </div>
        <div className="invalid-feedback d-block">
          {errors.password?.message}
        </div>

        <div className="product-crud-buttons-container">
          <button
            className="btn btn-outline-danger product-crud-button"
            onClick={handleCancel}
          >
            CANCELAR
          </button>
          <button className="btn btn-outline-primary  product-crud-button">
            SALVAR
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
