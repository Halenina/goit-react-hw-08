import { Field, Form, Formik } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import css from "./ContactForm.module.css";
import { addContact } from "../../redux/contacts/operations";
import Button from "../Button/Button";

const PhonebookSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "User name must have at least 3 characters!")
    .max(50, "User name must be less than 50 characters!")
    .required("Name is required!"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, {
      message: "Invalid phone number",
      excludeEmptyString: false,
    })
    .required("Number is required!"),
});

const INITIAL_FORM_DATA = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, formActions) => {
    dispatch(addContact(values));
    formActions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_FORM_DATA}
        validationSchema={PhonebookSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field className={css.input} type="text" name="name"></Field>
            <ErrorMessage
              className={css.errorMsg}
              name="name"
              component="span"
            />
          </label>

          <label className={css.label}>
            Number
            <Field className={css.input} type="text" name="number"></Field>
            <ErrorMessage
              className={css.errorMsg}
              name="number"
              component="span"
            />
          </label>

          <Button type="submit">Add contact</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;