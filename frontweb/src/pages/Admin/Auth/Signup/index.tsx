import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { User } from 'types/user';
import { Role } from 'types/role';
import { useEffect, useState } from 'react';
import { requestBackend } from 'util/requests';
import { toast } from 'react-toastify';
import { AxiosRequestConfig } from 'axios';

const Signup = () => {
  const history = useHistory();

  const [selectCategories, setSelectCategories] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, //permite definir o valor de algum atributo
    control, // objeto de controle do hook form
  } = useForm<User>();

  useEffect(() => {
    //função pra carrega do backend quando o componente for montado
    requestBackend({ url: '/users' }).then((response) => {
      setSelectCategories(response.data.content); //Atribui o dados da resposta do backend no setSelectCategories
    });
  }, []);

  const onSubmit = (formData: User) => {
    const config: AxiosRequestConfig = {
      method: 'POST', // se estiver editando, metodo 'PUT' senão 'POST'
      url: `/users`, // se estiver editando, metodo 'PUT' senão 'POST'
      withCredentials: false, //passa token no header da requisição
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
    history.push('/admin/products'); //volta para a listagem
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
      </form>
    </div>
  );
};

export default Signup;
