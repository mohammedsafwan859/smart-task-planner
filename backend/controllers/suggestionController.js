const Groq = require('groq-sdk');

// Initialize the Groq client with your API key
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// @desc    Generate task suggestions
// @route   POST /api/suggestions
const generateSuggestions = async (req, res) => {
  // We can remove the debugging console.log now
  // console.log("Using Groq API Key:", process.env.GROQ_API_KEY); 

  try {
    const { tasks } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.status(400).json({ message: "No tasks provided to analyze." });
    }

    // --- Prompt Engineering: This prompt is almost identical ---
    const prompt = `
      You are a world-class productivity expert. Your goal is to help me prioritize my tasks.
      Analyze the following list of tasks and reorder them into the most logical and efficient sequence for me to complete today.
      Consider priority, due dates (if any), and the likely effort involved. Start with quick wins if possible to build momentum.

      Here is my task list in JSON format:
      ${JSON.stringify(tasks)}

      Your response MUST be a valid JSON object containing a single key called "suggestions".
      The value of "suggestions" should be an array of objects.
      Each object in the array must have two keys: "taskId" (the original _id of the task) and "reason" (a short, one-sentence explanation for its ranking).
      Do not include any other text or explanations outside of the JSON object.
    `;

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama-3.1-8b-instant', // A powerful and fast open-source model
        response_format: { type: "json_object" }, // Ask for JSON output directly
    });
    
    const content = chatCompletion.choices[0]?.message?.content;

    if (!content) {
        throw new Error("AI did not return any content.");
    }
    
    res.status(200).json(JSON.parse(content));

  } catch (error) {
    console.error("Error calling Groq API:", error);
    res.status(500).json({ message: "Failed to generate AI suggestions." });
  }
};

module.exports = {
  generateSuggestions,
};