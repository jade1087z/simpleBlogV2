import React, { useState } from "react";
import firebase from "../../firebase.js";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const LoginFunc = async (e) => {
        e.preventDefault();

        if (!(email && password)) {
            return alert("모든 값을 채워주세요");
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert("로그인 성공하였습니다.");
            navigate("/");
        } catch (err) {
            console.log(err.code);
            if (err.code === "auth/invalidid-email") {
                setErrorMsg("존재하지 않는 이메일입니다.");
            } else if (err.code === "auth/invalidid-crednential") {
                setErrorMsg("비밀번호가 일치하지 않습니다.");
            } else {
                setErrorMsg("로그인 실패하였습니다.");
            }
        }
    };

    return (
        <section id="login">
            <div className="login__inner">
                <h2>Login</h2>
                <div className="login_form btStyle bmStyle">
                    <form action="#" name="#" method="post">
                        <fieldset>
                            <legend className="blind">로그인 영역</legend>
                            <div>
                                <label
                                    htmlFor="youEmail"
                                    className="required blind"
                                >
                                    E-mail
                                </label>
                                <input
                                    type="email"
                                    id="youEmail"
                                    name="youEmail"
                                    placeholder="E-mail"
                                    className="input_style"
                                    onChange={(e) => {
                                        setEmail(e.currentTarget.value);
                                    }}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="youPass"
                                    className="required blind"
                                >
                                    password
                                </label>
                                <input
                                    type="password"
                                    id="youPass"
                                    name="youPass"
                                    placeholder="password"
                                    className="input_style"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setPassword(e.currentTarget.value);
                                    }}
                                    required
                                />
                            </div>
                            <div>{errorMsg !== "" && <p>{errorMsg}</p>}</div>
                            <button
                                type="submit"
                                onClick={(e) => LoginFunc(e)}
                                className="login__btn mt30"
                            >
                                Login
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
