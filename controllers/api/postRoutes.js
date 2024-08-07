const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/withAuth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if (!postData) {
            res.status(404).json({ message: 'Failed to find Post with that id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.patch('/:id', withAuth, async(req,res) => {
    try {
        const postData = await Post.update({ title: req.body.title, content: req.body.content },
            {
                where: {
                    id: req.params.id,
                },
            },
        );
        if(!postData) {
            res.status(404).json({ message: 'Failed to find a Post with that id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;