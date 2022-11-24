import { useState } from "react";

import FormInput from "../../components/form-input/form-input.component"
import Button from "../button/button.component";

import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword, 
} from '../..//utils/firebase/firebase.utils';

import './sign-in.styles..scss';

const defaultFormFields = {
    Email:'',
    Password:'',
};

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { Email, Password} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {       
            const response = await signInAuthUserWithEmailAndPassword(
                Email,
                Password,
            );
            console.log(response);    
            resetFormFields();
        }  catch (error) {
            switch(error.code) {
                case 'auth/wrong-password' :
                    alert('Incorrect email id or password');
                    break;
                case 'auth/user-not-found' :
                    alert('Account not found, Create account to login !');
                    break;
                default:
                    console.log(error);
            }        
        }   
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account ?</h2>
            <span> Login into your account</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='Email' 
                    value={Email}
                /> 

                <FormInput 
                    label="Password"
                    type='password'
                    required 
                    onChange={handleChange} 
                    name='Password'
                    value={Password}
                /> 
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>                
            </form>
        </div>
    );
};

export default SignIn;