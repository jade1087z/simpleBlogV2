import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // 데이터 보내고 받기 리덕스 기능
import { Route, Routes } from "react-router-dom";

import { loginUser, clearUser } from "./Reducer/userSlice"; // 세션의 기능을 구현한 함수 가져오기
import firebase from "./firebase.js"; // 파이어베이스에 연동해 사용

import Header from "./components/layout/Header";
import List from "./components/post/List";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home";
import Write from "./components/post/Write";
import Detail from "./components/post/Detail";
import Modify from "./components/post/Modify";
import Login from "./components/user/Login";
import Join from "./components/user/Join";

const App = () => {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            console.log("userinfo", userInfo);
        });
    }, []);

    useEffect(() => {
        // firebase.auth().signOut();
    });

    return (
        <div>
            <Header />
            <Main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/detail/:postNum" element={<Detail />} />
                    <Route path="/modify/:postNum" element={<Modify />} />
                    <Route path="/delete/:postNum" element={<Modify />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/join" element={<Join />} />
                </Routes>
            </Main>
            <Footer />
        </div>
    );
};

export default App;
