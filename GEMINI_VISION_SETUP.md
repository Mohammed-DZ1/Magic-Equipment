# Gemini Vision-Based Screen Recording Detection

This document explains the Gemini Vision integration for advanced screen recording detection.

## What's New

The app now includes **Gemini Vision API integration** that analyzes screenshots in real-time to detect screen recording and capture tools.

## How It Works

### Detection Flow

```
1. User attempts suspicious activity
   ├─ Pointer leaves app viewport
   ├─ Page visibility changes
   └─ Multiple blur events detected

2. App captures screenshot
   └─ Converts to JPEG (60% quality for speed)

3. Sends to Gemini Vision API
   └─ Server-side analysis (secure)

4. Gemini analyzes for recording tools
   ├─ OBS Studio
   ├─ ShareX
   ├─ Windows Recorder
   ├─ Camtasia
   ├─ ScreenFlow
   └─ Other capture tools

5. If detected (confidence > 70%)
   ├─ Black screen triggers
   ├─ User IP logged
   ├─ Attempt recorded
   └─ IP can be blocked
```

## Detected Tools

The Gemini Vision system can detect:

### Windows
- **OBS Studio** - Studio windows, recording indicators
- **ShareX** - UI elements, notifications
- **Windows Recorder** - Red recording indicator
- **Windows Snipping Tool** - Screenshot UI
- **Camtasia** - Recording software

### Mac
- **ScreenFlow** - Capture tool
- **QuickTime** - Screen recording
- **Camtasia** - Recording software

### Cross-Platform
- **Streaming software** - Twitch, YouTube Live overlays
- **Virtual camera software** - Recording indicators
- **General recording indicators** - Status bars, notifications

## API Integration

### Netlify Function: `analyze-recording.js`

**Endpoint:** `/.netlify/functions/analyze-recording`

**Request:**
```json
{
  "screenshot": "data:image/jpeg;base64,...",
  "reason": "Pointer left - analyzing screen...",
  "timestamp": "2026-01-11T10:30:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "detected": true,
  "tool": "OBS",
  "confidence": 0.95,
  "reason": "OBS Studio window detected with recording indicator",
  "timestamp": "2026-01-11T10:30:00Z"
}
```

## Configuration

### Environment Variables

Add to your Netlify environment:

```
GEMINI_API_KEY=AIzaSyDtbnxTNqyxh67E8UUuaDfXiBwBWZVcH9M
```

The API key is stored securely in:
- `netlify.toml` - Production/preview configuration
- `.env.local` - Local development

**IMPORTANT:** Never expose the API key in client-side code. It's only available server-side.

### Cooldown Period

The system includes a 5-second cooldown between analyses to prevent API spam:
```javascript
const GEMINI_ANALYSIS_COOLDOWN = 5000; // milliseconds
```

## Detection Triggers

Gemini Vision analysis is triggered when:

1. **Pointer leaves viewport** - User moves mouse away
2. **Page hidden** - Tab loses focus
3. **Blur events** - Window loses focus (every 3rd event)

## Cost Considerations

### Pricing

- **Per image analysis:** ~$0.004 (4 cents)
- **Average monthly** (small platform): $0-10
- **Average monthly** (medium platform): $10-50
- **Average monthly** (large platform): $50-500

### Cost Optimization

The system implements cooldown to prevent excessive API calls:
- Only analyzes suspicious activity
- 5-second minimum between analyses
- Legitimate users = no cost
- Malicious users = caught quickly

## Confidence Scoring

The system only triggers blocking when confidence exceeds 70%:

```javascript
if (result.detected && result.confidence > 0.7) {
  // Block and trigger black screen
}
```

This prevents false positives from:
- Screenshots of video content
- Images showing recording tutorials
- Legitimate desktop activity

## Logging & Monitoring

All detection attempts are logged:

```
🤖 Gemini Vision Detection: OBS detected (confidence: 0.95)
   Reason: OBS Studio window with recording indicator visible
   Timestamp: 2026-01-11T10:30:00Z
   User IP: 192.168.1.1
```

## Privacy & Security

### Client-Side
- Screenshots are NOT stored locally
- Sent only for analysis
- Deleted immediately after

### Server-Side
- Screenshots processed in memory only
- API calls go directly to Google
- Results logged (not images)
- Data deleted after analysis

### Google/Gemini
- Images sent over HTTPS
- Processed by Google's secure servers
- Not used for training
- Subject to Google's privacy policy

## Troubleshooting

### Vision analysis not triggering?

1. Check GEMINI_API_KEY is set in netlify.toml
2. Verify API has vision capabilities enabled
3. Check browser console for errors
4. Ensure suspicious activity threshold is met

### False positives?

The confidence threshold prevents most false positives:
- Adjust threshold from 0.7 to 0.8+ for stricter detection
- Only legit recording tools trigger at high confidence

### API quota exceeded?

- Check Gemini API quota in Google Cloud Console
- Increase monthly quota if needed
- Implement rate limiting on server

## Future Enhancements

Possible improvements:
- Local ML fallback if API down
- Batch image analysis
- Custom confidence thresholds per user tier
- Automated IP blocking
- Detection analytics dashboard

## Testing

To test the system:

```javascript
// Manually trigger analysis
analyzeScreenWithGemini('Manual test');

// Check console for results
// Should see Gemini Vision Analysis Result in logs
```

## Limitations

What Gemini Vision CANNOT detect:
- Physical cameras pointing at screen
- HDMI capture devices
- Recording tools running hidden/minimized
- Very new tools not in Gemini's training data
- Tools with unusual UI modifications

These require native app or kernel-level monitoring.
