const express = require('express');
const cors = require('cors');
var request = require("request");
const app = express();

var time, timer = 300;
function startTimer(duration) {
    var timer = duration, minutes, seconds;

    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        time = minutes + "M " + seconds + "S";
        console.log(time);
        if (minutes === '00' && seconds === '00') {
            time = 'Board Now';
        }
        if (seconds === 30 || seconds === '00') {
            var options = {
                method: 'PUT',
                url: 'https://api.passslot.com/v1/passes/pass.slot.boardingpass/40786b50-9097-4860-9164-a406e05835eb/values/TIMELEFT',
                headers:
                {
                    'postman-token': '2ba8da8d-a607-3a68-c91b-b45c8417c5ee',
                    'cache-control': 'no-cache',
                    'content-type': 'text/plain',
                    authorization: 'Basic VWxpc2FqeU1hSVFIVHJ3cXphT1VPWmFsc1FreGhvVUNkZVVvWUhNVERERHVzc2ROdU5sTFRhQmt5VkttTkZFVTo='
                },
                body: '{\r\n"value": ' + '"' + time + '"' + '\r\n}'

            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                console.log(body);
            });



        }

        if (--timer < 0) {
            timer = 0;
            setTimeout(
                function () {
                    timer = duration;
                }, 50000
            )
        }
    }, 1000);



}

startTimer(timer);


app.use(cors());
app.get('/', (req, res) => {

    res.send(time);
});




app.listen(4000, () => {
    console.log('product server listening to port ')
});











