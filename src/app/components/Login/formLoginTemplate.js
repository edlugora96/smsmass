import * as Yup from 'yup';
import { fetchServer } from '$utils/fetchServer';
import { setCookie } from '$utils/cookies';

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
          name: 'remamber',
          id: 'remamber'
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
      remamber: false
    }),
    onSubmit: async (values) => {
      console.log(values);
      const res = await fetchServer('users/signIn', values, 'server');
      res.status === 200 && setCookie('auth', res.body.token, values.remamber?7:1);
    },
    validSchema: Yup.object().shape({
      email: Yup.string()
        .required('Required')
        .email('Ingrese un Email valido'),
      password: Yup.string()
        .required('Required'),
    })
  },
};