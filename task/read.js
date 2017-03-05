var  request =require('request');
//把gbk编码的格式转成utf8格式的字符串
var iconv =require('iconv-lite');
//使用cheerio把html转化为一个jquery对象
var cheerio =require('cheerio');
var debug =require('debug')('crawl:read');
var movies =[];
exports.movie = function (url,callback) {
    //请求网址内容
    request({url,encoding:null},function (err,response,body) {
        //实现一个转码，把gbk编码的buffer转成utf-8格式的字符串
        body =iconv.decode(body,'gbk');
        //把此相应提字符串转成$符对象
        var  $ =cheerio.load(body);
        $('.keyword .list-title').each(function () {
            var $me =$(this);
            //声明一个电影对象，一个是标签文本对应的电影名称，一个是href属性指定的url地址
            var movie={
                name:$me.text(),
                url:$me.attr('href')
            }
            debug(`读到电影:${movie.name}`)
            movies.push(movie);
        })
        callback(err,movies)
    })
}
/*
exports.movie('http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1',function (err,movies) {
    console.log(movies);
})*/
