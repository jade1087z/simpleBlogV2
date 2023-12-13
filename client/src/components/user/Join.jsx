import React, { useState } from "react";
import firebase from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Join = () => {
    const [youName, setYouName] = useState("");
    const [youEmail, setYouEmail] = useState("");
    const [youPass, setYouPass] = useState("");
    const [youPassCheck, setYouPassCheck] = useState("");
    const [flag, setFlag] = useState(false);

    let navigate = useNavigate();

    const joinFunc = async (e) => {
        setFlag(true);
        e.preventDefault();
        if (!(youName && youEmail && youPass && youPassCheck)) {
            return alert("모든 항목을 채워야 회원가입이 가능합니다.");
        }

        if (youPass !== youPassCheck) {
            return alert("비밀번호가 다르네요");
        }

        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(youEmail, youPass);

        await createdUser.user.updateProfile({
            displayName: youName,
        });
        console.log(createdUser);
        console.log(createdUser.user);

        console.log(createdUser);
        console.log(createdUser.user);

        let body = {
            email: createdUser.user.multiFactor.email,
            displayName: createdUser.user.multiFactor.displayName,
            uid: createdUser.user.multiFactor.uid,
        };

        axios.post("/api/user/join", body).then((res) => {
            setFlag(false);
            if (res.data.success) {
                alert("회원가입에 성공하였습니다.!!");
                navigate("/login");
            } else {
                return alert("회원가입이 실패하였습니다.");
            }
        });
    };
    // let createdUser = await firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(youEmail, youPass)
    //     .then((userCredential) => {
    //         // Signed in
    //         var user = userCredential.user;
    //         createdUser.user.updateProfile({
    //             displayName: youName,
    //         });

    //         console.log(user);
    //         console.log(createdUser);
    //         console.log(createdUser.user);
    //     })
    //     .catch((error) => {
    //         if (error.code == "auth/email-already-in-use") {
    //             alert("The email address is already in use");
    //         } else if (error.code == "auth/invalid-email") {
    //             alert("The email address is not valid.");
    //         } else if (error.code == "auth/operation-not-allowed") {
    //             alert("Operation not allowed.");
    //         } else if (error.code == "auth/weak-password") {
    //             alert("The password is too weak.");
    //         }
    //     });
    return (
        <section id="login" className="join">
            <div className="login__inner">
                <h2>sign up</h2>
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
                                    value={youEmail}
                                    onChange={(e) =>
                                        setYouEmail(e.currentTarget.value)
                                    }
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="youEmail"
                                    className="required blind"
                                >
                                    Name
                                </label>
                                <input
                                    type="email"
                                    id="youName"
                                    name="youName"
                                    placeholder="Name"
                                    className="input_style"
                                    value={youName}
                                    onChange={(e) =>
                                        setYouName(e.currentTarget.value)
                                    }
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
                                    type="paddword"
                                    minLength={8}
                                    id="youPass"
                                    name="youPass"
                                    placeholder="password"
                                    className="input_style"
                                    value={youPass}
                                    onChange={(e) =>
                                        setYouPass(e.currentTarget.value)
                                    }
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="youPass"
                                    className="required blind"
                                >
                                    passwordCheck
                                </label>
                                <input
                                    type="paddword"
                                    minLength={8}
                                    id="youPass"
                                    name="youPass"
                                    placeholder="passwordCheck"
                                    className="input_style"
                                    value={youPassCheck}
                                    onChange={(e) =>
                                        setYouPassCheck(e.currentTarget.value)
                                    }
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <button
                                disabled={flag}
                                type="submit"
                                className="login__btn mt30"
                                onClick={(e) => joinFunc(e)}
                            >
                                sign up
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Join;
