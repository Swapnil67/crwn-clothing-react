import { useState, useContext } from "react";
import './sign-in.styles.scss';

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
  email: "",
  password: ""
};


const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    // setCurrentUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formFields;
    try {
      const { user } = await signInAuthUserWithEmailAndPassword({ email, password });
      // setCurrentUser(user);
      resetFormFields();
    } catch (err) {
      
      switch (err.code) {
        case 'auth/wrong-password':
          alert("Incorrect Password");
          break;
        case 'auth/user-not-found':
          alert("User not found");
          break;
        default:
          console.log("SignIn: ", err);
          console.log("Err code ", err.code);
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
    <div className="sign-in-container">
    <h2>I already have an account</h2>
    <span>Sign in with your email & password</span>
    <form onSubmit={handleSubmit}>
      <FormInput
        label="email"
        required={true}
        onChange={handleChange}
        name="email"
        type="email"
        value={email}
      />
      <FormInput
        label="Password"
        required={true}
        onChange={handleChange}
        name="password"
        type="password"
        value={password}
      />
      <div className="buttons-container">
        <Button type="submit">Sign in</Button>
        <Button type="button" buttonType="google" onClick={signInWithGoogle}>Sign In Google</Button>
      </div>
    </form>
  </div>
  );
};

export default SignIn;
