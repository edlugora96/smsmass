import * as Yup from 'yup';
import Auth from '$utils/auth';
export default {
  login:
  {
    components: [
      {
        type: 'text',
        title: 'Usuario',
        attr: {
          name: 'user',
          placeholder: 'Ingrese su(s) usuario o email',
          id: 'formBasicUser'
        }
      },
      {
        type: 'password',
        title: 'Contrseña',
        attr: {
          name: 'password',
          placeholder: '*********',
          id: 'formBasicPassword'
        }
      },
      {
        type: 'checkbox',
        title: 'Mantener session abierta',
        attr: {
          name: 'remember',
          id: 'remember'
        }
      },
      {
        type: 'cancelOrSubmit',
        title: 'Enviar',
        attrSubmit: {
          id: 'submitLogin'
        }
      }
    ],
    initianState: () => ({
      user: '',
      password: '',
      remember: false
    }),
    validSchema: Yup.object().shape({
      user: Yup.string()
        .required('Required'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values, { props }) => {
      const res = await Auth.login(values, props);
      console.log(res);
    },
  },
};
// localStorage.getItem("auth");
// localStorage.removeItem("key");