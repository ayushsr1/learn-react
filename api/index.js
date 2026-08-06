const express = require('express');
const serverless = require('serverless-http');
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper function to scan a directory and merge file contents
// ✅ REPLACE the readComponentFiles function in api/index.js with this:
function readComponentFiles(dirPath) {
  let combinedContent = '';
  try {
    // Double check that the folder actually exists inside the bundle
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      
      files.forEach(file => {
        // Look only for frontend file properties
        if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts')) {
          const filePath = path.join(dirPath, file);
          
          // Use standard plain readFileSync (never drops undefined errors)
          const fileData = fs.readFileSync(filePath, 'utf8'); 
          combinedContent += `\n--- FILE: ${file} ---\n${fileData}\n`;
        }
      });
    } else {
      console.log(`Directory path not found during execution: ${dirPath}`);
    }
  } catch (error) {
    console.error("Error running directory scanner:", error);
  }
  return combinedContent;
}


app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    // 1. Point to your frontend components folder
    // On Vercel, process.cwd() points to the root of your project directory
    const componentsPath = path.join(process.cwd(), 'src', 'components');
    
    // 2. Read and extract all code/text from your .tsx components
    const frontendCodebase = readComponentFiles(componentsPath);

    // 3. Instruct Gemini to parse your frontend code for content answers
    const systemInstruction = `
      You are the official AI chat persona for this gymnastics athlete website.
      Your personality is energetic, friendly, cute, and uses casual slang/emojis.
      
      You must answer user questions based on the text, content, schedules, prices, or links found directly inside the frontend code files provided below. Ignore the code syntax/imports and focus entirely on the hardcoded text data, strings, and components.
      
      FRONTEND CODE CONTEXT:
      ${frontendCodebase || "No frontend components found."}
    `;

    // 4. Send everything to Gemini 2.5 Flash
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7
      }
    });

    return res.status(200).json({
      success: true,
      reply: aiResponse.text
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      error: "AI engine failed to read codebase", 
      details: error.message 
    });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
