import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params.postNum);
    const [postInfo, setPostInfo] = useState({});

    useEffect(() => {
        let body = {
            postNum: params.postNum,
        };
        axios
            .post("/api/post/detail", body)
            .then((response) => {
                console.log(response);
                setPostInfo(response.data.postList);
            })
            .catch((err) => console.log(err));
    }, [params.postNum]);

    const deleteHandler = (e) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            let body = {
                postNum: params.postNum,
            };
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if (response.data.success) {
                        alert("게시글이 삭제되었습니다.");
                        navigate("/list");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 삭제가 실패했습니다.");
                });
        }
    };
    return (
        <section className="detail">
            <div className="detail__wrap">
                <div className="detail__title">
                    <h3>{postInfo.title}</h3>
                    <div className="auth">auth</div>
                </div>
                <div className="detail__content">
                    {postInfo.content}
                    {postInfo.image && (
                        <img src={postInfo.image} alt={postInfo.title} />
                    )}
                </div>

                <div className="btn">
                    <button className="modify">
                        <Link to={`/modify/${postInfo.postNum}`}> mod</Link>
                    </button>
                    <button
                        className="delete"
                        onClick={(e) => deleteHandler(e)}
                    >
                        del
                    </button>
                    <button className="list">
                        <Link to={"/list"}>back</Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Detail;
