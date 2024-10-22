const axios = require('axios');
const cheerio = require('cheerio');

async function fetchExcelMarkData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const excelMarks = [];

        $('table tr').each((index, element) => {
            const row = $(element);
            const mark = {
                subject: row.find('td.subject').text(),
                score: row.find('td.score').text(),
                date: row.find('td.date').text(),
            };
            excelMarks.push(mark);
        });

        return excelMarks;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const url = 'https://example.com/excel-marks';
fetchExcelMarkData(url).then(data => console.log(data));