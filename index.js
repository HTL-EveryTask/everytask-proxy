// express
const express = require('express');
const cors = require('cors');
const axios = require("axios");

const app = express();
const port = process.env.PORT || 3002;
const axiosInstance = axios.create({
    baseURL: "https://urania.webuntis.com/",
});

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

// react to requests
app.post('/WebUntis/jsonrpc.do/', async (req, res) => {
    console.log(req.body);

    let response;
    // if query contains token, add it to headers
    if (req.body.validationString) {
        console.log("AAAAAAAAAAAAAAAAAAAAAA")
        response = await axiosInstance({
                method: 'post',
                url: 'WebUntis/jsonrpc.do',
                params: req.query,
                headers: {
                    Cookie: req.body.validationString,
                },
                data: req.body,
            }
        );
    } else {
        response = await axiosInstance({
            method: 'post',
            url: 'WebUntis/jsonrpc.do',
            params: req.query,
            data: req.body,
        })
    }
    res.send(response.data);
    console.log("response", response.data);
}, (err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});