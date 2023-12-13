import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const List = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        axios
            .post("/api/post/list")
            .then((res) => {
                if (res.data.success) {
                    setPostList([...res.data.postList]);
                }
            })
            .catch((err) => console.log(err));
    }, [postList]);

    return (
        <section>
            <div className="list__page">
                <h3>게시글 리스트</h3>
            </div>
            <div className="list__wrap">
                {postList.map((list, key) => (
                    <div className="list" key={key}>
                        <span className="cate">교육 </span>
                        <h3 className="title">
                            <Link to={`/detail/${list.postNum}`}>
                                <em>{list.postNum}: </em>
                                {list.title}
                            </Link>
                        </h3>
                        <p className="content">{list.content}</p>
                        <div className="auth">글쓴이</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default List;
