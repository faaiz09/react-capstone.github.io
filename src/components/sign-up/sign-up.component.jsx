import { useState } from "react";

import FormInput from "../../components/form-input/form-input.component"
import Button from "../button/button.component";

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth 
} from '../..//utils/firebase/firebase.utils';

import './sign-up.styles..scss';

const defaultFormFields = {
    Name:'',
    Email:'',
    Password:'',
    ConfirmPassword:'',
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { Name, Email, Password, ConfirmPassword } = formFields;

    console.log(formFields);

    const resetFormFields = () => {
            setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            alert("Passwords Do Not Match !");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(
                Email,
                Password,
            );
            
            await createUserDocumentFromAuth(user, { Name });  
            resetFormFields();
         }  catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create account, user already exists !!');
            } else {
              console.log('User creation encountered an error', error);
            }
        }   
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account !?</h2>
            <span> Create your Account</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='Name' 
                    value={Name} 
                />  

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

                <FormInput 
                    label="Confirm Password"
                    type='password'
                    required 
                    onChange={handleChange} 
                    name='ConfirmPassword'
                    value={ConfirmPassword}
                />  
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUp;