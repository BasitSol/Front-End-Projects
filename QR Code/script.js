const qrCodeElement = document.getElementById('qr-code');
const downloadBtn = document.getElementById('download-btn');
const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');

function generateQR() {
    const inputValue = qrInput.value.trim();

    if (!inputValue) {
        qrInput.classList.add('error');
        setTimeout(() => qrInput.classList.remove('error'), 500);
        return;
    }

    // Clear previous QR code
    qrCodeElement.innerHTML = '';

    // Generate new QR code
    const qrcode = new QRCode(qrCodeElement, {
        text: inputValue,
        width: 256,
        height: 256,
        colorDark: '#1f2937',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show download button
    downloadBtn.style.display = 'inline-block';
    downloadBtn.href = qrCodeElement.querySelector('canvas').toDataURL('image/png');
}

// Event listeners
generateBtn.addEventListener('click', generateQR);
qrInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateQR();
});