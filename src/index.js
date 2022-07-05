const express = require('express')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const methodOverride = require('method-override')

const route = require('./routes')
const db = require('./config/db/index')
const sortMiddleware = require('./app/middlewares/SortMiddleware')

// connect to db
db.connect()

const app = express()
const port = 3000

// middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
// hand middleware
app.use(sortMiddleware)

// HTTP logger
app.use(morgan('combined'))

// set static path
app.use(express.static(path.join(__dirname, 'public')))

// method override header request
app.use(methodOverride('_method'))

// Template engine
app.engine(
    '.hbs',
    handlebars.engine({
        extname: '.hbs',

        helpers: {
            sum: (a, b) => a + b,
            sort: (field, sort) => {
                const sortField = field === sort.column ? sort.type : 'default'

                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-down-short-wide',
                    desc: 'fa-solid fa-arrow-down-wide-short',
                }

                const icon = icons[sortField]

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }

                const type = types[sort.type]

                return `
                    <a href="?_sort&column=${field}&type=${type}" class="ms-1 text-dark">
                        <i class="${icon}"></i>
                    </a>
                `
            },
        },
    }),
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'resource', 'views'))

// Route path
route(app)

// Listen
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
