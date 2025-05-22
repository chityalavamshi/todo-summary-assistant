const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const axios = require('axios');

dotenv.config();
const app = express();

// ✅ Step 1: Check if environment variables are loaded
console.log("✅ Express app initialized");
console.log("🔐 OpenAI API key loaded:", !!process.env.OPENAI_API_KEY);
console.log("🔗 Slack Webhook URL loaded:", !!process.env.SLACK_WEBHOOK_URL);

app.use(cors());
app.use(bodyParser.json());

let todos = [];

// ✅ GET all todos
app.get('/todos', (req, res) => {
  console.log("📥 GET /todos called");
  res.json(todos);
});

// ✅ POST a new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: Date.now().toString(),
    text: req.body.text
  };
  todos.push(newTodo);
  console.log("➕ Added new todo:", newTodo);
  res.status(201).json(newTodo);
});

// ✅ DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id !== id);
  console.log(`❌ Deleted todo with id: ${id}`);
  res.json({ message: 'Todo deleted' });
});
//
app.post('/summarize', async (req, res) => {
  try {
    if (todos.length === 0) {
      console.log("No todos to summarize.");
      return res.status(400).json({ error: "No todos to summarize." });
    }

    const prompt = todos.map(t => t.text).join('\n');
    console.log("Prompt sent to OpenAI:", prompt);

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Summarize the following todos:" },
        { role: "user", content: prompt }
      ],
    });

    console.log("OpenAI API response:", openaiResponse);

    const summary = openaiResponse.choices[0].message.content;
    res.json({ summary });

  } catch (error) {
    console.error("Error in /summarize:", error);
    res.status(500).json({ error: "Failed to get summary." });
  }
});


// ✅ POST to summarize todos and send to Slack
app.post('/summarize', async (req, res) => {
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;

    // ✅ Step 2: Check for empty todos
    if (todos.length === 0) {
      console.log("🚫 No todos to summarize.");
      return res.status(400).json({ error: "No todos to summarize." });
    }

    const pendingTodos = todos.map(todo => todo.text).join('\n');

    // ✅ Step 3: Log the prompt
    console.log("📝 Prompt sent to OpenAI:\n", pendingTodos);

    // ✅ Step 4: Call OpenAI API and log the response
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize these tasks:\n${pendingTodos}` }]
      },
      {
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("📤 OpenAI API raw response:", JSON.stringify(openaiResponse.data, null, 2));

    const summary = openaiResponse.data.choices[0].message.content;

    // ✅ Send to Slack
    await axios.post(slackWebhook, { text: `📋 Todo Summary:\n${summary}` });

    console.log("✅ Summary sent to Slack successfully.");
    res.status(200).json({ message: 'Summary sent to Slack successfully.' });

  } catch (error) {
    console.error('❌ Error summarizing todos:', error.message);
    if (error.response) {
      console.error("📛 OpenAI API Error Response:", JSON.stringify(error.response.data, null, 2));
    }
    res.status(500).json({ error: 'Failed to summarize todos and send to Slack.' });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

