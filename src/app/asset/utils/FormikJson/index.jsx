/* jshint unused:false */
import React from 'react';
import { withFormik, Form as Formik } from 'formik';
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
    console.log(formikBag.props);
    if (formikBag.props.template.onSubmit) {
      formikBag.props.template.onSubmit(values, formikBag);
    }
  },
};

const FormikJson = (props) => pug`
  Formik(role="form").ui.form
    each elemt, index in props.template.components
      Structure(key=index,...props,...elemt, index=index)
`;

export default withFormik(optFormik)(FormikJson);