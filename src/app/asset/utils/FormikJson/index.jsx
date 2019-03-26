/* jshint unused:false */
import React from 'react';
import { withFormik, Form as Formik, Field as FastField, ErrorMessage  } from 'formik';
import Structure from './Structure.jsx';
import './styles/form.styl';

const optFormik = {
  mapPropsToValues(props) {
    return props.template.initianState(props);
  },
  validationSchema(props){
    return props.template.validSchema;
  },

  handleSubmit(values, formikBag) {
    formikBag.setSubmitting(false);
    if (formikBag.props.template.onSubmit) {
      formikBag.props.template.onSubmit(values, formikBag);
    }
  },
};

const FormShapes = {
  Parent: (props) => {
    const {
      children: Childdren
    } = props;
    return <div className="field"> {Childdren} </div>;
  },
  Label :(props) => pug`
    label(htmlFor=props.attr.id)= props.title
  `,
  Input :(props) => pug`
    FastField(...props)
  `,
  ErrorMessage :(props) => pug`
    ErrorMessage(...props.attr)
  `
};

const FormikJson = (props) => pug`
  Formik(role="form", name=props.formName).ui.form
    each elemt, index in props.template.components
      Structure(key=index,...props,...elemt, index=index, FormShapes=FormShapes)
`;

export default withFormik(optFormik)(FormikJson);