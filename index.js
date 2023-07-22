import {Configuration, OpenAIApi} from "openai"
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
const configuration = new Configuration({
    oraginazation: "org-olqlWTRPrzmt8b245yg0EgbF",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration)

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Get the role the of ChatGPT place it on locally hosted webpage

// app.get("/", async (req, res) => {

//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role:"user", content:"Hello World"},]
//     })
//     res.json(

//     {completion: completion.data.choices[0].message}
//     )


// })

// Post messages from user chatGPT to get a response
app.post("/", async (req, res) => {
    const {message} = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content:`${message}`},]
    })
    res.json(

    {completion: completion.data.choices[0].message}
    )


})
app.listen(port, ()=>{console.log(`Example app listneing at http://localhost:${port}`)});
