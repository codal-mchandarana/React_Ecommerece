import { Form, useNavigate } from 'react-router-dom'
import Classes from './Login.module.css'
import { useContext } from 'react';
import { CartContext } from '../../Store/CartContextProvider';

const Login: React.FC = (): JSX.Element => {

    const { setIslogin } = useContext(CartContext);
    const navigate = useNavigate();

    const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        let newForm = new FormData(document.forms[0])
        let email = newForm.get('email')
        let password = newForm.get('password')

        let user = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: email,
                password: password,
                expiresInMins: 1, 
            })
        })
        if (user.status === 200) {
            let response = await user.json()
            localStorage.setItem('token',response.token)
            setIslogin(true);
            navigate('/')
        }

        event.preventDefault()
    }

    return <div className={Classes.login100_form}>
        <div className={Classes.limiter}>
            <div className={Classes.container_login100}>
                <div className={Classes.wrap_login100}>
                    <div className={`${Classes.login100_pic} ${Classes.js_tilt}`} data-tilt>
                        <img src="img/img-01.png" alt="IMG" />
                    </div>

                    <Form className={`${Classes.login100_form} ${Classes.validate_form}`} onSubmit={HandleSubmit}>
                        <span className={Classes.login100_form_title}>
                            Member Login
                        </span>

                        <div className={`${Classes.wrap_input100} ${Classes.validate_input}`} data-validate="Valid email is required: ex@abc.xyz">
                            <input className={Classes.input100} type="text" name="email" placeholder="Email" />
                            <span className={Classes.focus_input100}></span>
                            <span className={Classes.symbol_input100}>
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className={`${Classes.wrap_input100} ${Classes.validate_input}`} data-validate="Password is required">
                            <input className={Classes.input100} type="password" name="password" placeholder="Password" />
                            <span className={Classes.focus_input100}></span>
                            <span className={Classes.symbol_input100}>
                                <i className="fa fa-lock" aria-hidden="true"></i>
                            </span>
                        </div>

                        <div className={Classes.container_login100_form_btn}>
                            <button className={Classes.login100_form_btn}>
                                Login
                            </button>
                        </div>



                    </Form>
                </div>
            </div>
        </div>
    </div>
}

export default Login