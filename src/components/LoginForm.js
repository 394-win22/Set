import { useState, forwardRef } from 'react';
import './LoginForm.css';
import { signInWithEmailAndPassWD, signInWithGoogle } from '../utilities/firebase';
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Form = () => {    
    let navigate = useNavigate();
    const [inputs, setinputs] = useState({
        email: "",
        password: ""
    });
    
    const [warnemail, setwarnemail] = useState(false);
    const [warnpass, setwarnpass] = useState(false);
    const [danger, setdanger] = useState(true);
    
    const [eye, seteye] = useState(true);
    const [pass, setpass] = useState("password");
    
    const [openAlert, setOpenAlert] = useState(false);
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClick = () => {
        setOpenAlert(true);
      };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
    };
    
    const inputEvent = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "email") {
            if (value.length > 0) {
                setdanger(true);
            }
        }
        setinputs((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        });
    };

    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    const submitForm = (e) => {
        e.preventDefault();
        setwarnemail(false);
        setwarnpass(false);
        if (inputs.password == "") {
            setwarnpass(true);
        }
        if (inputs.email == "") {
            setwarnemail(true);
        } else if (!validateEmail(inputs.email)) {
            setwarnemail(true);
            setdanger(false);
        } else {
            signInWithEmailAndPassWD(inputs, navigate, setOpenAlert)
        }
    };

    const Eye = () => {
        if (pass == "password") {
            setpass("text");
            seteye(false);
        } else {
            setpass("password");
            seteye(true);
        }
    };

    return(
        <>
            <div className="container-login">
                <div className="card-login">
                    <div className="form-login">
                        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                                Wrong username or password.
                            </Alert>
                        </Snackbar>
                        <div className="left-side">
                            <img src="https://image.s5a.com/is/image/saks/010422_WMHP_3UP_1_NEWYEARNEWJEANSRESOLUTION?scl=1&qlt=84&fmt=jpg" />
                        </div>
    
                        <div className="right-side">
                            {/* <div className="register">
                                <p>Not a member? <a href="#">Register Now</a></p>
                            </div> */}
    
                            <div className="hello">
                                <h2>Welcome to SET!</h2>
                                <h4>Set your cloSET</h4>
                            </div>
    
                            <form onSubmit={submitForm}>
    
                                <div className="input_text">
                                    <input id="user_name" className={` ${warnemail ? "warning" : "" }`} type="text" pattern="[^\s]+" placeholder="Enter Email" name="email" autoComplete="email" value={inputs.email} onChange={inputEvent} />
                                    <p className={` ${danger ? "danger" : "" }`}><i className="fa fa-warning"></i>Please enter a valid email address.</p>
                                </div>
                                <div className="input_text">
                                    <input id="user_password" className={` ${warnpass ? "warning" : "" }`} type={pass} placeholder="Enter Password" name="password" autoComplete="current-password" value={inputs.password} onChange={inputEvent} />
                                    <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`}></i>
                                </div>
                                {/* <div className="recovery">
                                    <p>Forget Password</p>
                                </div> */}
                                <div className="btn-login">
                                    <button type="submit">Sign in</button>
                                    <button type="button" className="mt-2" onClick={() => setinputs({email: "test@a.com", password: "123456"})}>Fill In Test User</button>
                                </div>

                            </form>
                            <hr />
                            <div className="boxes-login">
                                <span onClick={() => signInWithGoogle(navigate)}><img src="https://imgur.com/XnY9cKl.png" /></span>
                                {/* <span><img src="https://imgur.com/ODlSChL.png" /></span>
                                <span><img src="https://imgur.com/mPBRdQt.png" /></span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Form;