const express = require('express');
const router = express.Router();

const News = require('../../models/News');

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/', (req,res) => {
    res.send('GameNEWS_news')
})

router.get('/:limit', (req,res) => {
    const limit = parseInt(req.params.limit);
    News.find()
    .sort( { posted: 1 })
    .limit(limit)
    .exec((err,news) => {
        res.json(news);
    })
});

router.get('/get', (req,res) => {
    News.find()
    .sort( { posted: 1 })
    .exec((err,news) => {
        res.json(news);
    })
});

router.post('/search', (req,res) => {
    const KW = req.body.keyword;
    News.find( {$text: { $search: KW} })
    .then(news => {
        if(news)
            res.json(news);
        else
            res.json({msg: "No news found"});
    })
});

router.delete('/:id', (req,res) => {
    const id = req.params.id;
    News.findById(id)
    .then( news => {
        News.deleteOne(news)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false });
        })
    });
});

router.get('/getNews/:id', (req,res) => {
    const id = req.params.id;
    News.findById(id)
    .then(news => {
        if(news)
            res.json(news);
    })
});

router.post('/', (req,res) => {
    const newNews = new News( {
        title: req.body.title,
        subtitle: req.body.subtitle,
        tagline: req.body.tagline,
        rating: req.body.rating,
        body: req.body.body,
        categories: req.body.categories,
        platforms: req.body.platforms,
        images: req.body.images,
        trailer: req.body.trailer,
        by: req.body.by,
        userId: req.body.userId,
        updated: req.body.updated,
        posted: req.body.posted
    })

    newNews.save().then(news => res.json(news));
})

router.put('/updateNews', (req,res) => {
    const id = req.body.newsId;

    News.findOneAndUpdate({_id: id}, {
        $set: { 
            updated: new Date().toISOString()
        },
    }, {useFindAndModify: false})
    .then( () => {
        res.sendStatus(200);
    }).catch(err => {
        console.error(err);
        res.sendStatus(500);
    })
})

module.exports = router;