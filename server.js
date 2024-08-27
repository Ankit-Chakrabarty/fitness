const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');



dotenv.config();
const app = express();
app.use(express.json);
app.use(cors()); 

/*const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});*/
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});
console.log("CODE CHAL RHA HAII");



app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});


app.post('/api/generate', async (req, res) => {
  try {
    const { name, height, weight, age, ailments, userInput, country, preference } = req.body;

    const prompt = `
      Name: ${name}
      Height: ${height} cm
      Weight: ${weight} kg
      Age: ${age} years
      Diseases: ${ailments}
      Goal: ${userInput}

      Create a creative dialogue tutorial by Dragon Ball Z's Goku (where only he speaks (!important)) who is now my Personal Fitness Trainer & Dietitian.
      Create a daily meal plan (prepare a detailed schedule from Mon to Sun with time-specific meals) (${country} - ${preference})
      Create a Workout Plan (general)
      Create Health goals (be funny, motivating, and add a funny quick advice quote tip)
    `;
    console.log(prompt);


    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 1000,
    });
    //console.log(baseCompletion);


    const basePromptOutput = baseCompletion.data.choices[0]?.text.trim();
    console.log(basePromptOutput)

    res.status(200).json({ output: basePromptOutput });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


