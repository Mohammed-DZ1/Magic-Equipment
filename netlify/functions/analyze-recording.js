const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handler = async (event) => {
  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { screenshot, reason, timestamp } = body;

    if (!screenshot) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Screenshot data is required' }),
      };
    }

    // Extract base64 from data URI if needed
    let imageData = screenshot;
    if (screenshot.startsWith('data:image')) {
      imageData = screenshot.split(',')[1];
    }

    // Call Gemini Vision API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Analyze this screenshot for screen recording or screen capture tools.

Look for ANY of the following:
- OBS Studio windows, toolbars, or recording indicators
- ShareX UI, notifications, or floating windows
- Windows Recorder red recording dot or indicator
- Camtasia, ScreenFlow, or similar recording software
- Any "Recording" status indicators
- Capture tool overlays
- Virtual camera software
- Streaming software UI (Twitch/YouTube Live)
- Screenshot tool windows (Windows Snipping Tool, etc.)

IMPORTANT: Look at the ENTIRE screenshot, including:
- Taskbar/dock at bottom
- Browser address bar
- Desktop behind any windows
- System tray/notification area
- Any partially visible windows

Respond with ONLY a JSON object (no markdown, no extra text):
{
  "detected": true or false,
  "tool_name": "OBS|ShareX|Windows Recorder|Camtasia|ScreenFlow|None|Unknown",
  "confidence": 0.0 to 1.0,
  "visual_indicators": "Brief description of what you see",
  "reason": "Explanation of detection"
}`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg',
        },
      },
      {
        text: prompt,
      },
    ]);

    // Parse the response
    const responseText = result.response.text();
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.split('```json')[1].split('```')[0];
    } else if (responseText.includes('```')) {
      jsonText = responseText.split('```')[1].split('```')[0];
    }

    const analysis = JSON.parse(jsonText.trim());

    // Log the analysis attempt
    console.log(`Recording detection attempt: ${reason}`);
    console.log(`Gemini analysis result:`, analysis);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        detected: analysis.detected,
        tool: analysis.tool_name,
        confidence: analysis.confidence,
        reason: analysis.reason,
        timestamp: timestamp || new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('Vision analysis error:', error.message);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Failed to analyze screenshot',
        message: error.message,
      }),
    };
  }
};
