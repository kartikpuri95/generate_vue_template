const puppeteer = require('puppeteer');
// const fs = require('fs')
let html_content
let computed_style


    (async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://webapplayers.com/luna_admin-v1.4/'), { waitUntil: 'networkidle2' };
    await page.waitFor(5000);

    html_content = await page.evaluate(() => {
        return document.querySelector('.panel-body').outerHTML;
    });
    computed_style = await page.evaluate(() => {
        const ps = document.querySelectorAll('.panel-body');
        return JSON.stringify(getComputedStyle(ps[0]));
    });
    console.log(computed_style)
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