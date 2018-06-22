
// Display user create form on GET.
exports.home_page_get = function (req, res) {
    console.log("GET request for the home page");
    res.render('index.ejs', {
        title: 'Home'
    });
};