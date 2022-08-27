exports.homePage = (req, res) => {
    res.render('index', {
        title: 'Esse é um titulo',
        number: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
    return;
}

exports.treatPost = (req, res) => {
    res.send(`Hey, I'm the new post route!`);
    return;
}