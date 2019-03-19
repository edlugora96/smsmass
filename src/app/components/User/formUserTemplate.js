import React, { useState, useEffect } from 'react';
import Auth from '$utils/auth';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import VerifyInput from './VerifyInput';
let i=0, arrayIitial;

const verification = async (values) =>{
  const {
    toValidate,
    verify,
    init,
    phone,
    toEmail,
    contacts
  } = values;
  const res = await Auth.verifications({toValidate,verify,init,phone,toEmail,contacts});
  console.log(res);
  return res;
};

const template = (user) =>{
  return {
    components: [
      {
        type: 'text',
        title: 'Nombre (s)',
        attr: {
          name: 'name',
          id: 'formBasicUserName'
        }
      },
      {
        type: 'text',
        title: 'Apellido (s)',
        attr: {
          name: 'lastName',
          id: 'formBasiclastName'
        }
      },
      {
        type: 'email',
        title: 'Email',
        attr: {
          name: 'email',
          id: 'formBasicemail'
        }
      },
      {
        type: 'textContainer',
        text: 'Cambiar contraseña',
        FormShape: {
          Parent: (props)=>{
            const {
              children: Childdren
            } = props;
            if (!props.readOnly) {
              return <div className="field"> {Childdren} </div>;
            }
            return true;
          }
        }
      },
      {
        type: 'password',
        title: 'Contraseña actual',
        attr: {
          name: 'password',
          id: 'passwordUserold'
        },
        FormShape: {
          Parent: (props)=>{
            const {
              children: Childdren
            } = props;
            if (!props.readOnly) {
              return <div className="field"> {Childdren} </div>;
            }
            return true;
          }
        }
      },
      {
        type: 'password',
        title: 'Contraseña nueva',
        attr: {
          name: 'passwordnew',
          id: 'passwordUsernew'
        },
        FormShape: {
          Parent: (props)=>{
            const {
              children: Childdren
            } = props;
            if (!props.readOnly) {
              return <div className="field"> {Childdren} </div>;
            }
            return true;
          }
        }
      },
      {
        type: 'password',
        title: 'Confirmar contraseñas',
        attr: {
          name: 'passwordconfnew',
          id: 'passwordUserconfnew'
        },
        FormShape: {
          Parent: (props)=>{
            const {
              children: Childdren
            } = props;
            if (!props.readOnly) {
              return <div className="field"> {Childdren} </div>;
            }
            return true;
          }
        }
      },
      {
        type: 'checkbox',
        title: 'Usuario verificado',
        attr: {
          name: 'verifiedUser',
          id: 'formBasicverifiedUser'
        },
        FormShape: {
          Input: (props) =>{
            return pug`
              VerifyInput(init toEmail=props.values["email"], toValidate="email" isVerificate=props.initialValues[props.attr.name], ...props, verification=verification)
            `;
          }
          /*Input: (props) => {
            const {
              readOnly
            } = props;
            const [wantVerify, setWantVerify] = useState(false);
            const [wantSend, setWantSend] = useState(true);
            const [loading, setLoading] = useState(true);
            const inputCodeVerification = useRef(null);
            const verify = async ({step, confBtn, want, send}) => {
              !confBtn && setWantSend(!wantSend)
              setWantVerify(send)
              if(confBtn&&!step&&wantVerify&&inputCodeVerification.current.value==='') {
                // console.log('aqui');
                return false;
              }
              setLoading(true);
              const res = send&& await verification({
                init:step,
                toEmail:props.values.email,
                toValidate:'email',
                verify:(!step&&wantVerify)&&inputCodeVerification.current.value
              })
              if (res||!res) {
                setLoading(false)
              } else if (res){
                res && setWantVerify(want)
              }
              // console.log(res);
            }
            return pug`
              if (readOnly)
                input(type=props.type checked=props.initialValues[props.attr.name])

              else if (!props.initialValues[props.attr.name]&&!readOnly)
                button(type="button" onClick=()=>{verify({send:wantSend,step:true, want:!wantVerify})})= wantVerify? 'Cancelar verificación' : 'Verificar Usuario'

              else if (props.initialValues[props.attr.name]&&!readOnly)
                p Correcto

              if(wantVerify&&!props.initialValues[props.attr.name])
                if (loading)
                  p "Cargando..."

                else
                  button(type="button" onClick=()=>{verify({send:true, want:false,step:false, confBtn:true})}) Confirmar

                  input(type="text" name="codeVerification" ref=inputCodeVerification placeholder="E-XXXXXXX")
            `;
          }*/
        }
      },
      {
        type: 'text',
        title: 'Telefono (s)',
        attr:{
          name: 'phone',
          id:'phones'
        },
        FormShape: {
          Label: (props) => pug`
            label(htmlFor=props.attr.id)= props.title
          `,
          Input:React.memo((props)=>{
            const {
              readOnly
            } = props;
            if (i===0){
              arrayIitial = user[props.attr.name].slice();
            }
            i++;
            const [phones, setPhone] = useState(props.initialValues[props.attr.name]);
            useEffect(()=>{
              readOnly && setPhone(arrayIitial);
              i=0;
            },[readOnly]);
            const addNewPhone = () =>{
              const newPhoneArry = phones;
              newPhoneArry.push({codeArea:'+58',numberPhone:'Nro Telefono',link:'minor'});
              setPhone(newPhoneArry)
            }
            const deleteNewPhone = (index) =>{
              const newPhoneArry = phones;
              newPhoneArry.splice(index,1);
              setPhone(newPhoneArry)
            }
            const change = (e) => {
            if (props.onChange) { props.onChange(e,props); }
              props.handleChange(e);
              // console.log(props.values[props.attr.name]);
            };
            const blur = (e) => {
              if (props.onBlur) { props.onBlur(e,props); }
              props.handleBlur(e);
            };
            return pug`
              if (!readOnly)
                button(onClick=()=>addNewPhone()) Añadir telefono

              if (typeof phones === 'object')
                each inpt, index in phones
                  input(readOnly=readOnly name="phone["+index+"].codeArea" key=index+inpt+inpt.codeArea, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change defaultValue=inpt.codeArea)

                  if (!readOnly)
                    ErrorMessage(name="phone["+index+"].codeArea" key=index+inpt+inpt.codeArea+"ErrorMessage")

                  input(readOnly=readOnly name="phone["+index+"].numberPhone" key=index+inpt+inpt.numberPhone, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change defaultValue=inpt.numberPhone)

                  if (!readOnly)
                    ErrorMessage(name="phone["+index+"].numberPhone" key=index+inpt+inpt.numberPhone+"ErrorMessage")

                  select(readOnly=readOnly name="phone["+index+"].link" key=index+inpt+inpt.link, onFocus=props.onFocus, onBlur=blur, onChange=change defaultValue=inpt.link)
                    option(value="main") Principal

                    option(value="ofice") Oficina

                    option(value="home") Casa

                    option(value="work") Trabajo

                    option(value="local") Local

                    option(value="minor") Otro

                  if (!readOnly)
                    ErrorMessage(name="phone["+index+"].link" key=index+inpt+inpt.link+"ErrorMessage")

                  if (!inpt.verified && !readOnly)
                    VerifyInput(init phone=inpt.numberPhone contacts=[{phone:inpt.numberPhone}] toValidate="phone",isVerificate=inpt.verified, ...props, verification=verification key=index+inpt.verified+"buttonVerify")

                  else
                    p(key=index+inpt.verified+"pTag")= inpt.verified? 'Correcto' : 'Sin verificar'

                  if (!readOnly)
                    ErrorMessage(name="phone["+index+"].verified" key=index+inpt+inpt.verified+"ErrorMessage")

                  if (!readOnly)
                    button(key=index+inpt+inpt.verified+"Eliminator" onClick=()=>deleteNewPhone(index)) Eliminar Telefono

              else
                input(readOnly=readOnly, ...props.attr, type=props.type, onFocus=props.onFocus, onBlur=blur, onChange=change defaultValue=props.initialValues[props.attr.name])

                if (!readOnly)
                  ErrorMessage(...props.attr key="655526"+props.type+"inpt")
            `;
          }),
          ErrorMessage: ()=>true
        }
      },
      {
        type: 'cancelOrSubmit',
        titleSumit: 'Actualizar',
        attrSubmit: {
          id: 'submitUpdateUser'
        },
        FormShape: {
          Parent: (props)=>{
            const {
              children: Childdren
            } = props;
            if (!props.readOnly) {
              return <div className="ui buttons"> {Childdren} </div>;
            }
            return true;
          }
        }
      }
    ],
    initianState: () => ({
      ...user,
      password:'',
      passwordnew:'',
      passwordconfnew:''
    }),
    validSchema: Yup.object().shape({
      email: Yup.string(),
        // .required('Este campo es requerido'),
        // .email('Ingrese un Email valido'),
      name: Yup.string(),
        // .required('Este campo es requerido'),
      lastName: Yup.string(),
        // .required('Este campo es requerido'),
      password: Yup.string(),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, { message: 'La contraseña debetener minimo:\n2 letras minusculas.\n2 letras mayuculas.\n2 caracteres especiales.\nY tener mas de 8 caracteres.'}),
      passwordnew: Yup.string(),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, { message: 'La contraseña debetener minimo:\n2 letras minusculas.\n2 letras mayuculas.\n2 caracteres especiales.\nY tener mas de 8 caracteres.'}),
      passwordconfnew: Yup.string(),
        // .oneOf([Yup.ref('passwordnew'), null], 'Las contraseña no coinciden'),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, { message: 'La contraseña debetener minimo:\n2 letras minusculas.\n2 letras mayuculas.\n2 caracteres especiales.\nY tener mas de 8 caracteres.'}),
      phone: Yup.array().of(
        Yup.object().shape({
          verified:Yup.boolean('Valor incorreto'),
          codeArea:Yup.string(),
            // .required('Este campo es requerido'),
            // .matches(/^(\+58)$/, { message: 'Este campo tiene que ser igual a +58'}),
          link:Yup.string(),
            // .required('Este campo es requerido'),
            // .matches(/^(main|minor|ofice|home|work|local)$/, { message: 'Valor incorreto'}),
          numberPhone: Yup.string(),
            // .required('Este campo es requerido')
            // .matches(/^(04|02)([\d+]{9})$/, { message: 'Numero telefonico invalido'}),
        })
      ),
      birthdate: Yup.string()
      // .required('Este campo es requerido')
    }),
    onSubmit: async (values) => {
      // Auth.update(values);
      console.log(values);
    },
  };
};
// localStorage.getItem("auth");
// localStorage.removeItem("key");
export default template;