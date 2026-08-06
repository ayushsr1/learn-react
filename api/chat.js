import fs from 'fs';
import path from 'path';

function readComponentFiles(dirPath) {
  let combinedContent = '';
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      files.forEach(file => {
        if (file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts')) {
          const filePath = path.join(dirPath, file);
          const fileData = fs.readFileSync(filePath, 'utf8');
          combinedContent += `\n--- FILE: ${file} ---\n${fileData}\n`;
        }
      });
    }
  } catch (error) {
    console.error("Error running directory scanner:", error);
  }
  return combinedContent;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body || {};
    if (!message) return res.status(400).json({ error: "Message is required" });

    const componentsPath = path.join(process.cwd(), 'src', 'components');
    const frontendCodebase = readComponentFiles(componentsPath);

    const systemInstruction = `
      You are the official AI chat persona for this gymnastics athlete website.
      Your personality is energetic, friendly, cute, and uses casual slang/emojis.
      
      You must answer user questions based on the text, content, schedules, prices, or links found directly inside the frontend code files provided below. Ignore the code syntax/imports and focus entirely on the hardcoded text data, strings, and components.
      
      FRONTEND CODE CONTEXT:
      ${frontendCodebase || "No frontend components found."}
    `;

    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.7 }
      })
    });

    const data = await apiResponse.json();

    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return res.status(200).json({
        success: true,
        reply: data.candidates[0].content.parts[0].text
      });
    } else {
      throw new Error(JSON.stringify(data));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      error: "The AI engine pipeline crashed", 
      details: error.message 
    });
  }
}
