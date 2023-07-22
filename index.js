import {Configuration, OpenAIApi} from "openai"
import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import 'dotenv/config'

const configuration = new Configuration({
    organization: process.env.ORGANIZATION,
    apiKey: process.env.CHATGPT_API_KEY,
});

const openai = new OpenAIApi(configuration)

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Get the role the of ChatGPT place it on locally hosted webpage

app.get("/", async (req, res) => {

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:"user", content:"Hello World"},]
    })
    res.json(

    {completion: completion.data.choices[0].message}
    )


})

// Post messages from user chatGPT to get a response
app.post("/", async (req, res) => {
    const {messages} = req.body;
    console.log(messages)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // The message is the history GPT can use for context.
        // The role determine which part of 
        messages: [
            {"role":"system", "content": "You are DesignGPT helptful assistant graphics design chatbot"},
            ...messages
            // {role:"user", content:`${message}`},
            // {role:"assistatn", content: ""}
        ]
    })
    res.json(

    {completion: completion.data.choices[0].message}
    )
})
app.listen(port, ()=>{console.log(`Example app listneing at http://localhost:${port}`)});
