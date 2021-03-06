const cheerio = require("cheerio");
const request = require("request");

module.exports = function(callback){

    console.log("doin a scrape");

    request("https://www.cbr.com/category/comics/news/", (error, response, html)=>{

    const $        = cheerio.load(html);
    const results  = [];

    $("div.info-wrapper").each(function(i, element) {

        let link   = $(element).children('strong.title').children().attr("href");
        let title  = $(element).children('strong.title').children().text();
        let blurb  = $(element).children("div.details").children("div.excerpt").text();
        let author = $(element).children("div.details").children("span.author").text();

        if(title.length > 1 && link && blurb.length > 1)
            results.push({
                id: new Date().getTime(),
                title: title,
                link: link,
                blurb: blurb,
                author: author
            });
        
    });

    // Log the results once you've looped through each of the elements found with cheerio
    callback(results);

    });

}