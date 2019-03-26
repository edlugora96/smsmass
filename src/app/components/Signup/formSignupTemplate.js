import * as Yup from 'yup';
import Auth from '$utils/auth';
export default {
  sigupInit:{
    components: [
      {
        type: 'text',
        title: 'user',
        attr: {
          name: 'user',
          placeholder: 'Ingrese su(s) user',
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
        type: 'submit',
        titleSumit: 'Siguiente',
        attrSubmit: {
          id: 'submitsignupinit'
        }
      }
    ],
    initianState: () => ({
      user: '',
      password: '',
      ci: '',
      name: '',
      lastName: '',
      phone:{
        numberPhone: ''
      },
      sex:'f',
    }),
    validSchema: Yup.object().shape({
      user: Yup.string()
        .required('Este campo es requerido'),
      password: Yup.string()
        .required('Este campo es requerido')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, { excludeEmptyString: true, message: 'La contraseña se alpha numerico y debe tener minimo:\n1 letras minusculas.\n1 letras mayuculas.\n1 caracteres especiales.\nY tener mas de 8 caracteres.'})
    }),
    onSubmit: async (values, { props }) => {
      props.setStep('sigupEnd');
      // Auth.signup(values, props);
    }
  },
  sigupEnd: {
    components: [
      {
        type: 'text',
        title: 'CI',
        attr: {
          name: 'dni',
          placeholder: 'V-XXXXXX',
          id: 'formSinupci'
        }
      },
      {
        type: 'text',
        title: 'Nombre (s)',
        attr: {
          name: 'name',
          placeholder: 'Ingrese su(s) Nombre (s)',
          id: 'formSinupname'
        }
      },
      {
        type: 'text',
        title: 'Apellidos (s)',
        attr: {
          name: 'lastName',
          placeholder: 'Ingrese su(s) Apellidos (s)',
          id: 'formSinuplastName'
        }
      },
      {
        type: 'date',
        title: 'Fecha de nacimiento',
        attr: {
          name: 'birthdate',
          id: 'formSinupbirthdate'
        }
      },
      {
        type: 'text',
        title: 'Nro. Telefono',
        attr: {
          name: 'phone.numberPhone',
          placeholder: 'Ej: 0420000000',
          id: 'formSinupnumberPhone'
        }
      },
      {
        type: 'select',
        options: [
        {value:'f',title:'Mujer'},
        {value:'m',title:'Hombre'},
        {value:'o',title:'Otro'}
        ],
        title: 'Sexo',
        attr: {
          name: 'sex',
          id: 'sex'
        }
      },
      {
        type: 'cancelOrSubmit',
        titleSubmit: 'Registrarse',
        btnHandlerCancel:'setCancel',
        attrSubmit: {
          id: 'submitsignupend'
        }
      }
    ],
    initianState: () => ({
      user: '',
      password: '',
      dni: '',
      name: '',
      lastName: '',
      birthdate: '',
      phone:{
        numberPhone: ''
      },
      sex:'f',
    }),
    validSchema: Yup.object().shape({
      user: Yup.string()
        .required('Este campo es requerido'),
      password: Yup.string()
        .required('Este campo es requerido')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, { excludeEmptyString: true, message: 'La contraseña debetener minimo:\n2 letras minusculas.\n2 letras mayuculas.\n2 caracteres especiales.\nY tener mas de 8 caracteres.'}),
      dni: Yup.string()
        .required('Este campo es requerido')
        .matches(/^([V]-)([\d+]{7,9})$/, { excludeEmptyString: true, message: 'Numero de cedula invalido'}),
      name: Yup.string()
        .required('Este campo es requerido'),
      lastName: Yup.string()
        .required('Este campo es requerido'),
      phone:Yup.object().shape({
        numberPhone: Yup.string()
          .required('Este campo es requerido')
          .matches(/^(04|02)([\d+]{9})$/, { excludeEmptyString: true, message: 'Numero telefonico invalido'}),
      }),
      birthdate: Yup.string()
        .required('Este campo es requerido'),
      sex: Yup.string()
        .required('Este campo es requerido')
        .matches(/[f|m|o]/, { excludeEmptyString: true, message: 'Sexo invalido'}),
    }),
    onSubmit: async (values, { props }) => {
      Auth.signup(values, props);
    }
  },
};
// localStorage.getItem("auth");
// localStorage.removeItem("key");