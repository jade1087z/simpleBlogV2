import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Modify = () => {
    let params = useParams();
    let navigate = useNavigate();

    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        };
        axios
            .post("/api/post/detail", body)
            .then((response) => {
                if (response.data.success) {
                    setPostInfo(response.data.postList);
                }
            })
            .catch((err) => console.log(err));
    }, [params.postNum]);

    useEffect(() => {
        setTitle(postInfo.title);
        setContents(postInfo.content);
    }, [postInfo]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (title === "" && contents === "") {
            return alert("내용을 작성해주세요");
        }

        let body = {
            title: title,
            content: contents,
            postNum: params.postNum,
        };

        axios
            .post("/api/post/modify", body)
            .then((res) => {
                if (res.data.success) {
                    alert("수정이 완료되었습니다.");
                    navigate(`/detail/${params.postNum}`);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <section id="login" className="join">
            <div className="login__inner">
                <h2>게시글 수정하기!</h2>
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
                                    value={title || ""}
                                    autoComplete="off"
                                    required
                                />
                                <textarea
                                    name="content"
                                    id="content"
                                    cols="30"
                                    rows="11"
                                    onChange={(e) => {
                                        setContents(e.currentTarget.value);
                                    }}
                                    value={contents || ""}
                                    style={{ width: "590px" }}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="post__btn"
                                onClick={(e) => onSubmit(e)}
                            >
                                UPDATE
                            </button>
                            <button type="submit" className="post__btn">
                                CANCLE
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Modify;
