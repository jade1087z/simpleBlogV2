const express = require("express");
const router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const setUpload = require("../util/upload.js");

router.post("/write", (req, res) => {
    let temp = req.body;
    const BlogPost = new Post(temp);

    Counter.findOne({ name: "counter" })
        .exec()
        .then((counter) => {
            temp.postNum = counter.postNum;

            const BlogPosts = new Post(temp);
            BlogPosts.save().then(() => {
                Counter.updateOne(
                    { name: "counter" },
                    { $inc: { postNum: 1 } }
                ).then(() => {
                    res.status(200).json({ success: true });
                });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});

router.post("/list", (req, res) => {
    Post.find()
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
            console.log(err);
        });
});
router.post("/detail", (req, res) => {
    Post.findOne({ postNum: req.body.postNum })
        .exec()
        .then((result) => {
            res.status(200).json({ success: true, postList: result });
        });
});
router.post("/modify", (req, res) => {
    let temp = { title: req.body.title, content: req.body.content };
    console.log(temp);
    Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ success: false });
        });
});
router.post("/delete", (req, res) => {
    Post.deleteOne({ postNum: Number(req.body.postNum) })
        .exec()
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false });
            console.log(err);
        });
});

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "image/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });
// const upload = multer({ storage: storage }).single("file");
// router.post("/image/upload", (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(400).json({ success: false });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 filePath: res.req.file.path,
//             });
//         }
//     });
// });

router.post(
    "/image/upload",
    setUpload("reactblogim/post"),
    (req, res, next) => {
        res.status(200).json({
            success: true,
            filePath: res.req.file.location,
        });
    }
);
module.exports = router;
