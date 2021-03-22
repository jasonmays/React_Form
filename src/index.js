import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, TextField, MenuItem, RadioGroup, FormControlLabel, Radio, FormControl, FormHelperText} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { withStyles, ThemeProvider } from '@material-ui/styles';
import theme from './theme';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#000',
    },
    '& .MuiInput-underline:after': {
      color: '#76388e',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#07baf5',
        borderWidth: '3px',
      },
      '&:hover fieldset': {
        borderColor: '#036e91',
        borderWidth: '3px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#036e91',
        borderWidth: '3px',
      },
    },
  },
})(TextField);

const validationSchema = yup.object({
  firstname: yup.string('Enter your first name').required('Firstname is required'),
  lastname: yup.string('Enter your first name').required('Lastname is required'),
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  communication: yup.string('Pick').required('Required'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      organization: '',
      euresident: '',
      communication: ''
    },
    validationSchema: validationSchema,
    onSubmit: ({ firstname, lastname, email, organization, euresident, communication }, { setSubmitting, resetForm, setFieldValue }) => {
      console.log(euresident, organization)
      try {
        axios({
          method: 'POST',
          url: `http://localhost:5000/api/v1/forms`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({
            firstname, 
            lastname, 
            email, 
            organization, 
            euresident, 
            communication
          })
        })
        .then(function (response) {
          alert(
            "Success: " + JSON.stringify(response.data.success) + '\n' +
            "Message: " + JSON.stringify(response.data.message)
          );
        });
        setSubmitting(false);
        setFieldValue('success', true);
        setTimeout(() => resetForm(), 100000);
      } catch (err) {
        setSubmitting(false);
        setFieldValue('success', false);
        console.log(err);
      }
    },
  });

  return (
    <div className="form_styling">
      <h1>Sign up for email updates</h1>
      <p className="form_styling__requiredFieldText">*Indicates required Field</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form_styling__row">
          <div className="form_styling__column">
            <CssTextField
              id="firstname"
              name="firstname"
              label="FIRST NAME*"
              className="form_styling__textBox"
              variant="outlined"
              style={{color: 'white'}}
              value={formik.values.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.firstname && Boolean(formik.errors.firstname)}
              helperText={formik.touched.firstname && formik.errors.firstname}
            />
          </div>
          <div className="form_styling__column">
            <CssTextField id="lastname"
              name="lastname"
              label="LAST NAME*"
              type="lastname"
              className="form_styling__textBox"
              variant="outlined"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.lastname && Boolean(formik.errors.lastname)}
              helperText={formik.touched.lastname && formik.errors.lastname}/>
          </div>
        </div>
        <div className="form_styling__row">
          <div className="form_styling__column">
            <CssTextField
              id="email"
              name="email"
              label="EMAIL ADDRESS*"
              type="email"
              className="form_styling__textBox"
              variant="outlined"
              color="primary"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="form_styling__column">
            <CssTextField
              id="organization"
              name="organization"
              label="ORGANIZATION"
              type="organization"
              className="form_styling__textBox"
              variant="outlined"
              value={formik.values.organization}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.organization && Boolean(formik.errors.organization)}
              helperText={formik.touched.organization && formik.errors.organization}
            />
          </div>
        </div>
        <FormControl variant="outlined" className="form_styling__selectBox">
          <CssTextField
            select
            id="euresident"
            name="euresident"
            label="EU RESIDENT"
            type="euresident"
            variant="outlined"
            value={formik.values.euresident}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.euresident && Boolean(formik.errors.euresident)}
            helperText={formik.touched.euresident && formik.errors.euresident}
          >
            <MenuItem value=""><em>Select One</em></MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </CssTextField>
        </FormControl>
        <FormControl fullWidth>
          <RadioGroup
            id="communication"
            name="communication"
            label="communication"
            tyoe="communication"
            value={formik.values.communication}
            onChange={formik.handleChange}
          >
            <div className="form_styling__row">
              <div className="form_styling__columnRadioGroup">
                <FormControlLabel value="advances" control={<Radio icon={<CheckBoxOutlineBlankIcon className='form_styling__icon' />} checkedIcon={<CheckBoxIcon className="form_styling__icon__checkIcon"  />} />} onClick={() => {formik.setFieldValue('communication','') }} label="ADVANCES" />
                <FormControlLabel value="alerts" control={<Radio icon={<CheckBoxOutlineBlankIcon className='form_styling__icon' />} checkedIcon={<CheckBoxIcon className="form_styling__icon__checkIcon" />} />} onClick={() => {formik.setFieldValue('communication','') }} label="ALERTS" />
              </div>
              <div className="form_styling__columnRadioGroup">
              <FormControlLabel value="otherCommunications" control={<Radio icon={<CheckBoxOutlineBlankIcon className='form_styling__icon' />} checkedIcon={<CheckBoxIcon className="form_styling__icon__checkIcon" />} />} onClick={() => {formik.setFieldValue('communication','') }} label="OTHER COMMUNICATIONS" />
              </div>
            </div>
            <FormHelperText error={formik.errors.communication} className="form_styling__error">{formik.touched.communication && formik.errors.communication}</FormHelperText>
          </RadioGroup>
        </FormControl>
        <div className="form_styling__button__center">
          <Button color="primary" variant="contained" type="submit" className="form_styling__button">
            SUBMIT
          </Button>
          <Button color="primary" variant="contained" className="form_styling__button" onClick={() => {formik.resetForm() }}>
            RESET
          </Button>
        </div>
      </form>
    </div>
  );
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Form />
  </ThemeProvider>
  , 
  document.getElementById('root')
);