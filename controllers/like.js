var Like = require('./../models/like');

exports.addLike = function (req, res) {
    var like = {
        user: req.user._id,
        picture: req.params.picture_id,
        quest: req.params.quest_id
    };
    var like_obj = new Like(like);
    like_obj
        .save()
        .then(
            (data) => {
                res.json(data.toJSON())
            }, (err) => {
                console.error(err);
                res.status(500).json(err.message);
            }
        );
};

exports.delLike = function (req, res) {
    Like.findOne({
            _id: req.params.like_id,
            picture: req.params.picture_id,
            quest: req.params.quest_id
        })
        .remove().then(
        (data) => {
            res.json(data.toJSON())
        },
        (err) => {
            console.error(err);
            res.status(500).json({error: err.message});
        }
    );
};

exports.getLike = function (req, res) {
    Like.findOne(
        {
            _id: req.params.like_id,
            picture: req.params.picture_id,
            quest: req.params.quest_id
        }
        )
        .then(
            (data) => {
                res.json(data.toJSON())
            },
            (err) => {
                console.error(err);
                res.status(500).json({error: err.message});
            }
        );
};

exports.getAllLike = function (req, res) {
    console.log('getAllLike');
    Like.find(
        {
            picture: req.params.picture_id,
            quest: req.params.quest_id
        }
        )
        .then(
            (data) => {
                res.json(data.toJSON())
            },
            (err) => {
                console.log('getAllLike error');
                console.error(err);
                res.status(500).json({error: err.message}).send();
            }
        );
};

