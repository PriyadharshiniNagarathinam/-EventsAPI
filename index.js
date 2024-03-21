// const app = require('express')();
// const port = 7373;

// app.listen(port, () => {
//     console.log(`App is running in http://localhost:${port}`);
// })

const { Builder,By,until,Key } = require('selenium-webdriver');

(async function helloSelenium() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://www.google.com/');
    let textBox = await driver.findElement(By.name('q'));
    textBox.sendKeys("events",Key.RETURN);

    await driver.wait(until.elementLocated(By.css('#rso')));
    
    let searchEvents = await driver.findElement(By.css('#rso > div.ULSxyf > div > div > div > div.k9uN1c.kfn9hb > div.BXE0fe > a'));
    searchEvents.click();
    await driver.manage().setTimeouts({ implicit: 3000 });

    let listOfEventsTab = await driver.findElement(By.css('#immersive_desktop_root > div.drPJve > div.YbRs3e > div:nth-child(2) > div.UbEfxe.uAAqtb > div.MZpzq.gws-horizon-textlists__tl-no-filters.TWKvJb > div.K9YWpe > ul'));

    let items = await listOfEventsTab.findElements(By.tagName('li'));
    cnt = 5;
    // await driver.executeScript('arguments[0].scrollIntoView()', items[4]);

    while(cnt>0){
        for (let i = 0; i < items.length; i++) {
            let liItem = items[i];
            await driver.executeScript('arguments[0].scrollIntoView()', liItem);
            items.splice(i, 1);
            i--;
        }
        console.log(items.length);
        await driver.sleep(5000);
        // let listOfEventsTab = await driver.wait(until.elementLocated(By.css('#Q5Vznb > div: nth - child(15) > div > div > div > ul')));
        // let listOfEventsTab = await driver.findElement(By.css('#Q5Vznb > div:nth-child(15) > div > div > div > ul'));
        items = await driver.findElements(By.tagName('li'));
        if (items.length == 0) break;
        console.log("After adding: " + items.length);
        cnt--;
    } 
    console.log(items.length);
    for (const liItem of items) {
        if (liItem) {
            // await driver.manage().setTimeouts({implicit: 5000});
            await driver.executeScript('arguments[0].scrollIntoView()', liItem);

            // Wait for each item to be present
            await driver.wait(until.elementIsVisible(liItem), 10000);

            const title = await liItem.findElement(By.className('YOGjf'));
            const t = await title.getText();
            console.log(cnt + " " + t);
            cnt++;
        }
    }
   
})();

