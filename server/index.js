
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/generate-cv', async (req, res) => {
  const { profileType, ...cvData } = req.body;

  const templateName = profileType === 'ats' ? 'ats.html' : 'modern.html';
  const templatePath = path.join(__dirname, 'templates', templateName);

  try {
    const htmlContent = fs.readFileSync(templatePath, 'utf8');
    const renderedHtml = ejs.render(htmlContent, cvData);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(renderedHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="cv-${profileType}.pdf"`);
    res.send(pdfBuffer);
  } catch (err) {
    console.error('CV Generation Error:', err);
    res.status(500).send('Failed to generate CV');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
