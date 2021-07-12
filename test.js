
const { Builder, By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
require("chromedriver");
var chrome = require('selenium-webdriver/chrome');

let TIMEOUT = 30000;

describe('Prueba que accede al tercer vínculo no patrocinado de una búsqueda en Google.', async function () {
    let driver;
    const options = new chrome.Options();

    before(async function() {
        driver = new Builder().forBrowser('chrome').
        setChromeOptions(options).build();
    });

    it('Se busca el término "webdriver".', async function() {
        
        this.timeout(TIMEOUT);
        await driver.get("http://google.com");
        await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);

        // elemento recibe un WebElement en formato Json del tercer vinculo 
        elemento = await driver.findElement(By.xpath('//div[@class="hlcw0c" or @class="g"][3]'));
        // utilizamos el metodo getTex para obtener el texto completo del tercer vinculo 
        textoCompleto = await elemento.getText();
        // utilizamos el metodo substring para otener la url del tercer vinculo
        urlObtenido = textoCompleto.substring(textoCompleto.indexOf("\n") + 1).slice(0, 24);
        // ingresamos al tercer vinculo
        await elemento.click();
        // asignamos a urlDestinos la url del tecer vinculo para comparar con urlObtenido
        urlDestino = "https://www.agile611.com";
        // realizamos la comparacion
        expect(urlDestino).to.equal(urlObtenido);
    });

    after(async function() {
        driver && driver.quit()
    });
});

