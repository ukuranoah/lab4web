const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const handlebars = require('handlebars');
const hbs = require('express-handlebars').create({
    helpers: {
        select: (selected, options) => {
            return options.fn(this).replace(
                new RegExp(' value="' + selected + '"'),
                '$& selected="selected"');
        },
        buildGrid: (length, width) => {

            if (length <= 0 || width <= 0) {
                return '<p>Invalid Grid!</p>';
            }

            const tableStart = "<table><tbody>";
            const tableClose = "</tbody></table>";
            let body = '';

            for (let x = 0; x < width; x++) {
                body += '<tr>';
                for (let y = 0; y < length; y++) {

                    var randomColor = ((1<<24)*Math.random()|0).toString(16);
                    let bg = randomColor

                    body += `<td style="background-color: #${bg};"><p class='textColor' style='color:white'>#${bg}</p><p class='textColor' style='color:black'>#${bg}</p></td>`
                }
                body += '</tr>';
            }

            return tableStart + body + tableClose;
        },
        error404: () => {
            const classes = ['shrink', 'rotate', 'still']
            let message = "";
            for (let i = 0; i < 20 + Math.random() * 30; i++) {
                message += `<div class="${classes[Math.floor(Math.random() * classes.length)]}">404</div>`
            }
            return new handlebars.SafeString(message);
        }
    }
});

const app = express()
const port = 3000;
app.engine('handlebars', (hbs.engine))
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`We are up and running on port ${port}!`)
});