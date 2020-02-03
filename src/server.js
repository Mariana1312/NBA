const express = require("express")
const app = express()
const request = require("request")
const path = require("path")
const port = 3000

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.use(express.static(path.join(__dirname, '..', 'dist')))

app.get('/', function (request, response) {
    response.send("Hello")
})

app.get('/teams/:teamName', function (req, res) {
    let nameID = req.params.teamName //נשלח את הבקשה של הטים ניים שמופיע בראוט
    nameID = teamToIDs[nameID] //נכניס לתוכו את השם שנרצה לחפש

    request('http://data.nba.net/10s/prod/v1/2018/players.json', function (error, response) {
        if (error) {
            console.log(error)
        }
        else {
            let parse = JSON.parse(response.body)
            //let players = parse.league.standard.filter(i => i.teamId == nameID).filter(a => a.isActive)
            let players = parse.league.standard.filter(i => i.teamId == nameID && i.isActive)
            let showPlayers = players.map(m => ({firstName: m.firstName, lastName: m.lastName,
                jersey: m.jersey, pos: m.pos
            }))
            res.send(showPlayers)
        }
    })
})


app.listen(port, function () {
    console.log(`Running server on port ${port}`)
})




