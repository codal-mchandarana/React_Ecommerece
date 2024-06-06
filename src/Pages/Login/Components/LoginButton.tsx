import Classes from './LoginButton.module.css'

const LoginButton = ()=>{
    return <>
        <button style={{marginBottom: "-2rem"}} type="button" className={Classes.login_with_google_btn}>
            Sign in with Google
        </button>
    </>
}

export default LoginButton;