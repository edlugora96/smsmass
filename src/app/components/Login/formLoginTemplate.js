import * as Yup from 'yup';
import { fetchServer } from '$utils/fetchServer';
// import socket from '$app/socketsClient';

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
      const res = await fetchServer('users/signIn', values, 'server');
      if (res.status === 200) {
        props.saveLogin(res.body.token);
        localStorage.setItem('auth', res.body.token);
      } else {
        localStorage.removeItem('auth');
      }
      // localStorage.getItem("auth");
      // localStorage.removeItem("key");
    },
  },
};