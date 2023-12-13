import axios from "axios";
import React, { useState } from "react";
// import Image from "./Image";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
const Write = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState();

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" && content === "") {
            return alert("글을 작성하세요");
        }

        let body = {
            title: title,
            content: content,
            image: image,
        };
        axios
            .post("/api/post/write", body)
            .then((res) => {
                if (res.data.success) {
                    alert("게시글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("게시글 작성이 실패하였습니다..");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("게시글 작성이 실패하였습니다..");
            });
    };

    return (
        <section id="login" className="join">
            <div className="login__inner">
                <h2>게시글 작성!</h2>
                <div className="login_form btStyle bmStyle">
                    <form action="#" name="#" method="post">
                        <fieldset>
                            <legend className="blind">게시글 작성</legend>
                            <div>
                                <label
                                    htmlFor="youEmail"
                                    className="required blind"
                                >
                                    title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="title"
                                    onChange={(e) => {
                                        setTitle(e.currentTarget.value);
                                    }}
                                    autoComplete="off"
                                    required
                                />
                                <textarea
                                    name="content"
                                    id="content"
                                    cols="30"
                                    rows="11"
                                    onChange={(e) => {
                                        setContent(e.currentTarget.value);
                                    }}
                                    style={{ width: "590px" }}
                                ></textarea>
                                <Image setImage={setImage} />
                            </div>
                            <button
                                type="submit"
                                className="post__btn"
                                onClick={(e) => onSubmit(e)}
                            >
                                POST
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Write;
