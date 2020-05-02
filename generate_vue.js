const puppeteer = require('puppeteer');


// let web_link = 'http://webapplayers.com/luna_admin-v1.4/'
// let element_name = ".panel-body"

let web_link = process.argv[2]
let element_name = process.argv[3]

let html_content
let computed_style


    (async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(web_link), { waitUntil: 'networkidle2' };
    await page.waitFor(5000);

    html_content = await page.evaluate((element_name) => {
        return document.querySelector(element_name).outerHTML;
    }, element_name);


    computed_style = await page.evaluate((element_name) => {
        const ps = document.querySelectorAll(element_name);
        return JSON.stringify(getComputedStyle(ps[0]));
    }, element_name);


    var styles = await page.evaluate(() => {
        return document.styleSheets;
    });
    for (var i in styles) {
        console.log(styles[i])
    }
    const fs = require('fs')
    let vue_file = "<template>" + html_content + "</template>" + "<style scoped>" + computed_style + "</style>";
    fs.writeFile('mynewfile2.vue', vue_file, function(err, file) {
        if (err) throw err;
        console.log('Saved!');
    });
    fs.writeFile('mynewfile2.css', computed_style, function(err, file) {
        if (err) throw err;
        console.log('Saved!');
    });

    await browser.close();
})();