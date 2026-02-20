// script.js

// ==================== TOOL 1: Case Converter ====================
function convertToUpperCase() {
    const input = document.getElementById('caseInput').value;
    document.getElementById('caseResult').innerText = input.toUpperCase();
}

function convertToLowerCase() {
    const input = document.getElementById('caseInput').value;
    document.getElementById('caseResult').innerText = input.toLowerCase();
}

function convertToTitleCase() {
    const input = document.getElementById('caseInput').value;
    const titleCase = input.toLowerCase().split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
    document.getElementById('caseResult').innerText = titleCase;
}

// ==================== TOOL 2: Word Counter ====================
function updateCounts() {
    const text = document.getElementById('counterInput').value;
    
    // Word count
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    document.getElementById('wordCount').innerText = words;
    
    // Character count
    document.getElementById('charCount').innerText = text.length;
    
    // Sentence count
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    document.getElementById('sentenceCount').innerText = sentences;
}

// ==================== TOOL 3: Text Cleaner ====================
function removeExtraSpaces() {
    const input = document.getElementById('cleanerInput').value;
    const cleaned = input.replace(/\s+/g, ' ').trim();
    document.getElementById('cleanerResult').innerText = cleaned;
}

function removeLineBreaks() {
    const input = document.getElementById('cleanerInput').value;
    const cleaned = input.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    document.getElementById('cleanerResult').innerText = cleaned;
}

// ==================== TOOL 4: QR Code Generator ====================
function generateQRCode() {
    const text = document.getElementById('qrInput').value;
    const qrResult = document.getElementById('qrResult');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!text) {
        alert('Please enter some text or URL');
        return;
    }
    
    // Clear previous QR code
    qrResult.innerHTML = '';
    
    // Show loading
    qrResult.innerHTML = '<div class="loading"></div>';
    
    // Generate QR code
    setTimeout(() => {
        QRCode.toCanvas(text, { width: 150 }, function(error, canvas) {
            qrResult.innerHTML = '';
            if (error) {
                qrResult.innerHTML = 'Error generating QR code';
                downloadBtn.style.display = 'none';
            } else {
                qrResult.appendChild(canvas);
                downloadBtn.style.display = 'block';
            }
        });
    }, 500);
}

function downloadQRCode() {
    const canvas = document.querySelector('#qrResult canvas');
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}

// ==================== Universal Copy Function ====================
function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.innerText;
    
    if (!text) {
        alert('Nothing to copy!');
        return;
    }
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        alert('Failed to copy text');
    }
    
    document.body.removeChild(textarea);
}

// Copy notification
function showCopyNotification() {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('copyNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'copyNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
        `;
        notification.innerHTML = '<i class="fas fa-check-circle"></i> Copied to clipboard!';
        document.body.appendChild(notification);
    }
    
    // Show notification
    notification.style.display = 'block';
    
    // Hide after 2 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// ==================== Initialize on page load ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('TextTools Hub initialized!');
    
    // Add sample text to counter for demonstration
    const counterInput = document.getElementById('counterInput');
    if (counterInput) {
        counterInput.placeholder = 'Type here to see live counts...';
    }
    
    // Add keyboard shortcuts for Enter key in forms
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Find the next button and click it
                const button = this.nextElementSibling?.querySelector('button');
                if (button) button.click();
            }
        });
    });
});

// ==================== Error Handler ====================
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nLine: ' + lineNo);
    // Show user-friendly message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #f44336;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
    `;
    errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Something went wrong. Please refresh the page.';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
    return false;
};