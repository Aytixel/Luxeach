const app = require('http').createServer().listen(5643)
const io = require('socket.io').listen(app)
const mysql = require('mysql')
const validUrl = require('valid-url')
const con = mysql.createConnection({host: 'mariadb', user: 'root', password: 'aytixel72110', database: 'luxeach_database'})

con.connect()

io.sockets.on('connection', socket => {
    socket.on('client:save_new-page', url => {
        if (validUrl.isUri(url)) {
            con.query('SELECT id FROM url_bank WHERE url = "' + url + '"', (err, result) => {
                if (err) socket.emit('server:response_new-page', 1)
                else if (result.length == 0) {
                    con.query('INSERT INTO url_bank SET url = "' + url + '", register_date = NOW(), is_new = 2', (err, result) => {
                        if (err) socket.emit('server:response_new-page', 1)
                        else {
                            con.query('SELECT id FROM url_bank WHERE is_new = 2 AND url = "' + url + '"', (err, result) => {
                                if (err) socket.emit('server:response_new-page', 1)
                                else {
                                    socket.broadcast.emit('client:save_new-page', JSON.stringify({"url": url,"id": result[0].id}))
                                    socket.emit('server:response_new-page', 0)
                                }
                            })
                        }
                    })
                } else socket.emit('server:response_new-page', 4)
            })
        } else socket.emit('server:response_new-page', 3)
    })
})