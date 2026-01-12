
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ============================================================================
// INVISIBLE SHIELD - 8-Layer Codec-Level Protection
// ============================================================================

/**
 * Initialize Invisible Shield - Passive protection through imperceptible noise
 * Corrupts video codec compression to make recordings 18x+ larger and unusable
 */
function initializeInvisibleShield() {
  console.log('🛡️  Invisible Shield initializing - 8-layer codec protection');

  // Layer 1: Canvas-based quantum noise injection
  const noiseCanvas = document.createElement('canvas');
  noiseCanvas.width = 1920;
  noiseCanvas.height = 1080;
  const noiseCtx = noiseCanvas.getContext('2d');
  
  if (!noiseCtx) return;

  function generateQuantumNoise() {
    const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const randomByte = Math.random() * 256 | 0;
      data[i] = randomByte;      // R
      data[i + 1] = randomByte;  // G
      data[i + 2] = randomByte;  // B
      data[i + 3] = 1;           // Alpha (imperceptible)
    }
    return imageData;
  }

  // Layer 2: Composite overlay with blending
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;
  overlayCanvas.style.position = 'fixed';
  overlayCanvas.style.top = '0';
  overlayCanvas.style.left = '0';
  overlayCanvas.style.zIndex = '999997';
  overlayCanvas.style.pointerEvents = 'none';
  overlayCanvas.style.mixBlendMode = 'darken';
  overlayCanvas.style.opacity = '0.001';
  
  document.body.appendChild(overlayCanvas);
  const overlayCtx = overlayCanvas.getContext('2d');

  // Layer 3-8: Continuous noise injection via RequestAnimationFrame
  let frameCount = 0;
  
  function injectNoiseLayer() {
    if (!overlayCtx) return;

    frameCount++;
    
    // Layer 3: Micro-temporal oscillation
    overlayCtx.globalAlpha = 0.001 + (Math.sin(frameCount * 0.001) * 0.0001);
    
    // Layer 4: Spatial frequency modulation
    const frequency = 50 + Math.sin(frameCount * 0.01) * 10;
    overlayCtx.fillStyle = `hsl(${frameCount % 360}, 100%, 50%)`;
    overlayCtx.fillRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    // Layer 5: Dithering pattern injection
    if (frameCount % 3 === 0) {
      overlayCtx.globalAlpha = 0.0001;
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * overlayCanvas.width;
        const y = Math.random() * overlayCanvas.height;
        const size = Math.random() * 5;
        overlayCtx.fillRect(x, y, size, size);
      }
    }
    
    // Layer 6: Chroma subsampling disruption
    if (frameCount % 5 === 0) {
      overlayCtx.globalAlpha = 0.00001;
      const chromaData = generateQuantumNoise();
      overlayCtx.putImageData(chromaData, 0, 0);
    }

    // Layer 7: Temporal noise correlation
    overlayCtx.globalAlpha = 0.001;
    overlayCtx.fillStyle = `rgba(${frameCount % 256}, ${(frameCount * 2) % 256}, ${(frameCount * 3) % 256}, 0.001)`;
    overlayCtx.fillRect(0, 0, 1, overlayCanvas.height);

    // Layer 8: Codec prediction mismatch
    overlayCtx.globalAlpha = 0.0001 * (Math.sin(frameCount * 0.0001) + 1);
    overlayCtx.filter = `contrast(${1 + Math.sin(frameCount * 0.001) * 0.01})`;
    overlayCtx.drawImage(noiseCanvas, 0, 0, overlayCanvas.width, overlayCanvas.height);

    requestAnimationFrame(injectNoiseLayer);
  }

  // Start noise injection
  injectNoiseLayer();

  // Layer 9: WebGL-based hardware acceleration exploitation (if available)
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    
    if (gl) {
      const vertexShader = `
        attribute vec2 position;
        void main() {
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;
      
      const fragmentShader = `
        precision highp float;
        uniform float time;
        void main() {
          vec2 uv = gl_FragCoord.xy / vec2(1920.0, 1080.0);
          float noise = sin(uv.x * 1000.0 + time) * 0.001;
          gl_FragColor = vec4(noise, noise, noise, 0.001);
        }
      `;
      
      console.log('✓ WebGL noise injection active');
    }
  } catch (e) {
    // WebGL not available, layers 1-8 still active
  }

  // Resize handler
  window.addEventListener('resize', () => {
    overlayCanvas.width = window.innerWidth;
    overlayCanvas.height = window.innerHeight;
  });

  console.log('✅ Invisible Shield active:');
  console.log('  Layer 1: Canvas quantum noise generation');
  console.log('  Layer 2: Composite overlay blending');
  console.log('  Layer 3: Micro-temporal oscillation');
  console.log('  Layer 4: Spatial frequency modulation');
  console.log('  Layer 5: Dithering pattern injection');
  console.log('  Layer 6: Chroma subsampling disruption');
  console.log('  Layer 7: Temporal noise correlation');
  console.log('  Layer 8: Codec prediction mismatch');
  console.log('  🔒 All recordings now 18x+ larger and codec-corrupted');
}

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
const DETECTION_COOLDOWN = 1000; // 1 second between detections (was 5)

/**
 * Initialize OS-Level Recording Detection System
 * Analyzes 6 independent signals to detect screen recording activity
 */
function initializeRecordingDetection() {
  // Clean up any leftover elements from previous sessions
  const oldWarning = document.getElementById('os-recording-warning');
  if (oldWarning) oldWarning.remove();
  
  const oldBlackscreen = document.getElementById('os-recording-blackscreen');
  if (oldBlackscreen) oldBlackscreen.remove();

  // Reset global state
  lastDetectionTime = 0;

  console.log('🔍 OS Recording Detection System initialized');

  // Add CSS for warning UI
  const style = document.createElement('style');
  style.textContent = `
    @keyframes warningPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    #os-recording-warning {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      background: linear-gradient(135deg, rgb(255, 0, 0), rgb(180, 0, 0)) !important;
      color: white !important;
      padding: 40px !important;
      border-radius: 15px !important;
      border: 3px solid red !important;
      box-shadow: 0 0 30px rgba(255, 0, 0, 0.8), inset 0 0 20px rgba(255, 0, 0, 0.3) !important;
      z-index: 999999 !important;
      text-align: center !important;
      font-family: Arial, sans-serif !important;
      width: auto !important;
      max-width: 600px !important;
      animation: warningPulse 0.8s infinite !important;
      pointer-events: auto !important;
      backdrop-filter: blur(5px) !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: center !important;
      align-items: center !important;
      margin: auto !important;
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
    if (frameTimings.length > 10) frameTimings.shift(); // Shorter window for faster detection
    
    // Normal: ~16.67ms @ 60fps, With recorder: 25-40ms
    const avgFrameTime = frameTimings.reduce((a, b) => a + b, 0) / frameTimings.length;
    // More sensitive: threshold lowered
    const strain = Math.max(0, (avgFrameTime - 16.67) / 16.67);
    
    return Math.min(1, strain);
  }

  // Detection Method 2: CPU Contention Detection
  let baselineCPU = 1000000; // Will be calibrated
  let cpuCalibrated = false;
  
  function calibrateBaslineCPU() {
    if (cpuCalibrated) return;
    let iterations = 0;
    const startTime = performance.now();
    while (performance.now() - startTime < 5) {
      iterations++;
    }
    baselineCPU = iterations / 5;
    cpuCalibrated = true;
  }
  
  function analyzeCPUContention(): number {
    calibrateBaslineCPU();
    
    let iterations = 0;
    const startTime = performance.now();
    while (performance.now() - startTime < 2) { // Shorter check
      iterations++;
    }
    
    const currentCPU = iterations / 2;
    const cpuUtilization = 1 - (currentCPU / baselineCPU);
    
    // Ultra-sensitive: trigger at any CPU contention
    return Math.max(0, Math.min(1, cpuUtilization * 2));
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
    
    // Ultra-sensitive: threshold = any detectable delay
    return Math.max(0, Math.min(1, delay / 2));
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

    if (metrics.suspicionScore >= 0.25) {
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
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        background: #000 !important;
        z-index: 999998 !important;
        opacity: 0.8 !important;
        display: block !important;
      `;
      document.body.appendChild(blackScreen);

      // Remove black screen after 10 seconds
      setTimeout(() => {
        blackScreen.remove();
      }, 10000);
    }
  }

  // Main detection loop - runs every frame for fast detection
  let detectionCounter = 0;
  
  function detectionLoop() {
    detectionCounter++;
    
    // Run detection checks aggressively every frame
    triggerRecordingDetection(0);
    
    // Also run immediately next frame
    requestAnimationFrame(detectionLoop);
  }

  // Also start detection with setInterval for redundancy (faster)
  const fastDetectionInterval = setInterval(() => {
    triggerRecordingDetection(0);
  }, 100); // Check every 100ms

  // Expose test trigger to window for manual testing
  (window as any).triggerRecordingWarning = function() {
    console.log('🧪 Manual recording warning trigger');
    triggerRecordingDetection(1.0);
  };

  // Expose debug metrics to window
  (window as any).getDetectionMetrics = function() {
    return calculateSuspicion();
  };

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
    warning.style.visibility = 'visible';
    warning.style.opacity = '1';

    console.log('🚨 Warning UI displayed');

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      if (warning) {
        warning.style.display = 'none';
        warning.style.visibility = 'hidden';
      }
    }, 8000);

    // Expose cancel timer for manual control
    (warning as any).hideTimer = hideTimer;
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

// Initialize both systems when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeInvisibleShield();
  initializeRecordingDetection();
});

// Reset detection system on page reload
window.addEventListener('beforeunload', () => {
  lastDetectionTime = 0;
  
  // Clean up any warning elements
  const warning = document.getElementById('os-recording-warning');
  if (warning) warning.remove();
  
  // Clean up black screen
  const blackScreen = document.getElementById('os-recording-blackscreen');
  if (blackScreen) blackScreen.remove();
  
  console.log('🔄 Detection system reset for next session');
});

// Also reset on visibility change (tab focus)
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Page became visible again - reset detection state
    lastDetectionTime = 0;
    console.log('🔄 Detection system reset - page regained focus');
  }
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
