const puppeteer = require("puppeteer");
const Grant = require("../models/grants");
require("dotenv").config();
const URL = "https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatorias";

const scrapper = async () => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(300000);
  await page.goto(URL);
  await page.click("#regionalizacion > option[value='1']");
  await page.click(
    'option[title="PYME Y PERSONAS FÍSICAS QUE DESARROLLAN ACTIVIDAD ECONÓMICA"]'
  );
  await page.click('button[title="Buscar"]');
  await page.waitForSelector("tr[id]");
  let tr = await page.$$eval(`tr[id]`, (ele) =>
    ele.map((item) => {
      let newArray = item.innerText.split("\t");
      return {
        id: newArray[0],
        mrr: newArray[1],
        admin: newArray[2],
        dep: newArray[3],
        org: newArray[4],
        date: newArray[5],
        title: newArray[6],
        title_co: newArray[7],
        assignedTo: newArray[8],
        link: `https://www.pap.hacienda.gob.es/bdnstrans/GE/es/convocatoria/${newArray[0]}`,
      };
    })
  );
  await browser.close();
  try {
    Grant.insertMany(tr);
  } catch (error) {
    console.log("hay elementos duplicados");
    throw new Error(error);
  }
  return tr;
};

module.exports = scrapper;
