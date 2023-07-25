import { useState, useContext } from "react";
import './sign-up.styles.scss';

import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { UserContext } from '../../contexts/user.context';


const defaultFormFields = {
  email: "",
  password: "",
  displayName: "",
  confirmPassword: "",
};

const SignUp = () => {

  // const { setCurrentUser  } = useContext(UserContext);

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, password, confirmPassword } = formFields;
    if (password !== confirmPassword) {
      alert("Password & Confirm Password must match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(formFields);
      // setCurrentUser(user);
      const userAuthResp = await createUserDocumentFromAuth(user, {
        displayName,
      });
      resetFormFields();
    } catch (err) {

      switch (err.code) {
        case 'auth/email-already-in-use':
          alert("Cannot create user, email already in use");
          break;
        case 'auth/weak-password':
          alert("Weak password, try another");
          break;
        default:
          console.log("SignUp: ", err);
          console.log("Err Code ", err.code);
          break;
      }

    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required={true}
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required={true}
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required={true}
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required={true}
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
