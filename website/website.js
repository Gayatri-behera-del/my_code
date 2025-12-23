// --- Simulated Backend Data (For Demo Only) ---
// This data would be fetched from your server in a real application.
const studentData = {
    // Current system calculation: 135/200 = 67.5% (Not Eligible)
    totalClassesHeld: 200,
    classesAttended: 135, 
    requiredAttendance: 75,
    systemCalculatedPercent: 67.5, 
    studentName: "Gayatri Behera"
};

// Function to check the user's input against the system's data
function confirmPercentage() {
    const feedbackDiv = document.getElementById('confirmation-feedback');
    const userInput = parseFloat(document.getElementById('user-percentage').value);
    const systemPercent = studentData.systemCalculatedPercent;
    
    feedbackDiv.innerHTML = '';
    feedbackDiv.className = '';

    if (isNaN(userInput)) {
        feedbackDiv.innerHTML = 'Please enter a valid number.';
        feedbackDiv.className = 'error';
        return;
    }

    // Check for close match (allowing for minor rounding differences)
    if (Math.abs(userInput - systemPercent) < 0.1) { 
        feedbackDiv.innerHTML = '✅ Confirmed! Your entered percentage matches the system record.';
        feedbackDiv.className = 'success';
    } else {
        feedbackDiv.innerHTML = `❌ **Discrepancy detected!** System reports ${systemPercent.toFixed(1)}%. Please recheck or contact administration.`;
        feedbackDiv.className = 'error';
    }
}

// Core Calculation & Display Function
function checkEligibility() {
    const { totalClassesHeld, classesAttended, requiredAttendance, systemCalculatedPercent } = studentData;
    
    const formattedPercent = systemCalculatedPercent.toFixed(1); 

    document.getElementById('student-name').textContent = studentData.studentName;
    document.getElementById('current-percent').textContent = `${formattedPercent}%`;
    document.getElementById('classes-held').textContent = totalClassesHeld;
    document.getElementById('classes-attended').textContent = classesAttended;
    
    const statusDiv = document.getElementById('status-message');

    if (systemCalculatedPercent >= requiredAttendance) {
        statusDiv.className = 'status-box eligible';
        statusDiv.innerHTML = '🎉 **Congratulations!** You are **ELIGIBLE** to attend the exams.';
    } else {
        statusDiv.className = 'status-box not-eligible';
        statusDiv.innerHTML = `
            <p>🚫 **WARNING: NOT ELIGIBLE.** Your attendance is **${formattedPercent}%**.</p>
            <p>To attend the exam, you must pay the compulsory fine of **₹1000** for waiver.</p>
            <button class="pay-button" onclick="initiatePayment()">Pay Fine Now (₹1000)</button>
        `;
    }
}

// Function to initiate payment will now redirect to the new page
function initiatePayment() {
    window.location.href = 'payment_justification.html';
}

document.addEventListener('DOMContentLoaded', checkEligibility);