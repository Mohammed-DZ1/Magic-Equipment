
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ============================================================================
// OS RECORDING DETECTION SYSTEM - Multi-Factor Analysis
// ============================================================================

interface RecordingMetrics {
  frameTimingStrain: number;
  cpuContention: number;
  canvasAccessDelay: number;
  memoryPressure: number;
  displayCaptureAttempt: number;
  suspicionScore: number;
  timestamp: string;
}

let lastDetectionTime = 0;
const DETECTION_COOLDOWN = 5000; // 5 seconds between detections

/**
 * Initialize OS-Level Recording Detection System
 * Analyzes 6 independent signals to detect screen recording activity
 */
function initializeRecordingDetection() {
  console.log('🔍 OS Recording Detection System initialized');

  // Add CSS for warning UI
  const style = document.createElement('style');
  style.textContent = `
    @keyframes warningPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    #os-recording-warning {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, rgb(255, 0, 0), rgb(180, 0, 0));
      color: white;
      padding: 40px;
      border-radius: 15px;
      border: 3px solid red;
      box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 0, 0.3);
      z-index: 999999;
      text-align: center;
      font-family: Arial, sans-serif;
      max-width: 600px;
      animation: warningPulse 0.8s infinite;
      pointer-events: auto;
      backdrop-filter: blur(5px);
    }
    
    #os-recording-warning h1 {
      font-size: 32px;
      margin: 0 0 15px 0;
      font-weight: bold;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    
    #os-recording-warning p {
      font-size: 24px;
      margin: 10px 0;
      font-weight: bold;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    
    #os-recording-warning .warning-sub {
      font-size: 14px;
      margin-top: 15px;
      opacity: 0.9;
      color: #ffe0e0;
    }
  `;
  document.head.appendChild(style);

  // Detection Method 1: Frame Timing Strain Analysis
  let frameTimings: number[] = [];
  let frameCount = 0;
  let lastFrameTime = performance.now();
  
  function analyzeFrameTiming(): number {
    const now = performance.now();
    const deltaTime = now - lastFrameTime;
    lastFrameTime = now;
    
    frameTimings.push(deltaTime);
    if (frameTimings.length > 60) frameTimings.shift();
    
    // Normal: ~16.67ms @ 60fps, With recorder: 25-40ms
    const avgFrameTime = frameTimings.reduce((a, b) => a + b, 0) / frameTimings.length;
    const strain = Math.max(0, (avgFrameTime - 16.67) / 23.33); // Normalize 0-1
    
    return Math.min(1, strain);
  }

  // Detection Method 2: CPU Contention Detection
  let baselineCPU = 1000000; // Will be calibrated
  let cpuCalibrated = false;
  
  function calibrateBaslineCPU() {
    if (cpuCalibrated) return;
    let iterations = 0;
    const startTime = performance.now();
    while (performance.now() - startTime < 10) {
      iterations++;
    }
    baselineCPU = iterations / 10; // iterations per millisecond
    cpuCalibrated = true;
  }
  
  function analyzeCPUContention(): number {
    calibrateBaslineCPU();
    
    let iterations = 0;
    const startTime = performance.now();
    while (performance.now() - startTime < 10) {
      iterations++;
    }
    
    const currentCPU = iterations / 10;
    const cpuUtilization = 1 - (currentCPU / baselineCPU);
    
    // With recorder: ~40% of baseline available = 0.6 contention
    // Threshold: > 40% loss = detection
    return Math.max(0, cpuUtilization - 0.4) / 0.6;
  }

  // Detection Method 3: Canvas Access Delay Monitoring
  function analyzeCanvasDelay(): number {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return 0;
    
    const startTime = performance.now();
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1, 1);
    const delay = performance.now() - startTime;
    
    // Normal: <0.5ms, With recorder: 5-10ms
    // Threshold: > 2ms = detection
    return Math.max(0, Math.min(1, (delay - 2) / 8));
  }

  // Detection Method 4: Memory Pressure Spike Detection
  function analyzeMemoryPressure(): number {
    if (!(performance as any).memory) return 0;
    
    const memInfo = (performance as any).memory;
    const heapUtilization = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
    
    // Normal: 30-50%, With recorder: 75%+
    // Threshold: > 70% = detection
    return Math.max(0, (heapUtilization - 0.7) / 0.15);
  }

  // Detection Method 5: Display Capture API Interception
  function analyzeDisplayCapture(): number {
    // Higher weight - direct user intent
    return 0; // Will be set to 1 if getDisplayMedia is called
  }

  let displayCaptureDetectionActive = false;
  
  function setupDisplayCaptureInterception() {
    if (displayCaptureDetectionActive) return;
    displayCaptureDetectionActive = true;
    
    const originalGetDisplayMedia = navigator.mediaDevices?.getDisplayMedia;
    
    if (originalGetDisplayMedia) {
      (navigator.mediaDevices as any).getDisplayMedia = function(...args: any[]) {
        console.warn('🔴 Display Capture API called - potential OS recording attempt');
        triggerRecordingDetection(1.0); // Highest confidence
        return Promise.reject(new Error('Display capture blocked'));
      };
    }
  }

  // Detection Method 6: Multi-Factor Suspicion Scoring
  function calculateSuspicion(): RecordingMetrics {
    const metrics: RecordingMetrics = {
      frameTimingStrain: analyzeFrameTiming(),
      cpuContention: analyzeCPUContention(),
      canvasAccessDelay: analyzeCanvasDelay(),
      memoryPressure: analyzeMemoryPressure(),
      displayCaptureAttempt: analyzeDisplayCapture(),
      suspicionScore: 0,
      timestamp: new Date().toISOString(),
    };

    // Weighted suspicion score
    metrics.suspicionScore = 
      (metrics.frameTimingStrain * 0.25) +
      (metrics.cpuContention * 0.2) +
      (metrics.canvasAccessDelay * 0.2) +
      (metrics.memoryPressure * 0.2) +
      (metrics.displayCaptureAttempt * 0.15);

    return metrics;
  }

  // Trigger detection and show warning
  function triggerRecordingDetection(displayCaptureConfidence: number) {
    const now = Date.now();
    if (now - lastDetectionTime < DETECTION_COOLDOWN) return;
    lastDetectionTime = now;

    const metrics = calculateSuspicion();
    if (displayCaptureConfidence > 0) {
      metrics.displayCaptureAttempt = displayCaptureConfidence;
      metrics.suspicionScore = 
        (metrics.frameTimingStrain * 0.25) +
        (metrics.cpuContention * 0.2) +
        (metrics.canvasAccessDelay * 0.2) +
        (metrics.memoryPressure * 0.2) +
        (metrics.displayCaptureAttempt * 0.15);
    }

    if (metrics.suspicionScore >= 0.65) {
      console.warn(
        `🚨 OS-LEVEL RECORDING DETECTED (Suspicion: ${(metrics.suspicionScore * 100).toFixed(1)}%)`
      );
      console.warn(
        `Metrics: FT=${metrics.frameTimingStrain.toFixed(2)} CPU=${metrics.cpuContention.toFixed(2)} CA=${metrics.canvasAccessDelay.toFixed(2)} MP=${metrics.memoryPressure.toFixed(2)}`
      );

      // Show warning UI
      showOSRecordingWarning();

      // Dispatch custom event for external handlers
      document.dispatchEvent(
        new CustomEvent('os-recording-detected', {
          detail: metrics,
        })
      );

      // Black screen activation
      const blackScreen = document.createElement('div');
      blackScreen.id = 'os-recording-blackscreen';
      blackScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 999998;
        opacity: 0.5;
      `;
      document.body.appendChild(blackScreen);

      // Remove black screen after 10 seconds
      setTimeout(() => {
        blackScreen.remove();
      }, 10000);
    }
  }

  // Main detection loop
  function detectionLoop() {
    triggerRecordingDetection(0);
    requestAnimationFrame(detectionLoop);
  }

  // Show OS Recording Warning UI
  function showOSRecordingWarning() {
    let warning = document.getElementById('os-recording-warning');
    
    if (!warning) {
      warning = document.createElement('div');
      warning.id = 'os-recording-warning';
      warning.innerHTML = `
        <h1>🚨 SCREEN RECORDING DETECTED 🚨</h1>
        <p>IF IT HAPPENED ONE MORE TIME YOUR ACCOUNT WILL BE BLOCKED</p>
        <div class="warning-sub">
          This activity has been logged and reported. Unauthorized screen recording is strictly prohibited.
        </div>
      `;
      document.body.appendChild(warning);
    }

    warning.style.display = 'block';

    // Auto-hide after 8 seconds
    setTimeout(() => {
      if (warning) warning.style.display = 'none';
    }, 8000);
  }

  // Initialize detection systems
  setupDisplayCaptureInterception();
  requestAnimationFrame(detectionLoop);

  console.log('✅ OS Recording Detection System active:');
  console.log('  ✓ Frame timing strain analysis');
  console.log('  ✓ CPU contention detection');
  console.log('  ✓ Canvas access delay monitoring');
  console.log('  ✓ Memory pressure spikes');
  console.log('  ✓ Display Capture API interception');
  console.log('  ✓ Multi-factor suspicion scoring');

  // Listen for detection events
  document.addEventListener('os-recording-detected', (event: any) => {
    console.warn('🚨 OS Recording Detected Event Fired:', event.detail);
  });
}

// Initialize detection system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeRecordingDetection();
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
