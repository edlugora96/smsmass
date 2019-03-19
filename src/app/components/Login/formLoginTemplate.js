import * as Yup from 'yup';
import Auth from '$utils/auth';
export default {
  login:
  {
    components: [
      {
        type: 'text',
        title: 'Email',
        attr: {
          name: 'email',
          placeholder: 'Ingrese su(s) email',
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
      email: '',
      password: '',
      remember: false
    }),
    validSchema: Yup.object().shape({
      email: Yup.string()
        .required('Required')
        .email('Ingrese un Email valido'),
      password: Yup.string()
        .required('Required'),
    }),
    onSubmit: async (values, { props }) => {
      Auth.login(values, props);
    },
  },
};
// localStorage.getItem("auth");
// localStorage.removeItem("key");