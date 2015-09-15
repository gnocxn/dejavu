// Write your package code here!
if(Meteor.isServer){
    function updateShortUrl(p){
        var url = 'http://sh.st/st/401bfc202d05bd508355c6463b671b90/' + p.url.replace(/.*?:\/\//g, "");
        return _.extend(p, {url : url});
    }

    function createShortUrl(p){
        var preg = 'http://sh.st/st/401bfc202d05bd508355c6463b671b90/',
            url = p.url.replace(preg,''),
            token = '401bfc202d05bd508355c6463b671b90';
        HTTP.put('https://api.shorte.st/v1/data/url',{
            headers : {
                'public-api-token' : token
            },
            data : {
                'urlToShorten' : url
            }
        },function(err, rs){
            console.log(err,rs);
        })
    }

    Telescope.callbacks.add('postSubmit', updateShortUrl);
    Telescope.callbacks.add('postSubmitAsync', createShortUrl);
}