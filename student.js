// --- Simulate Backend Data Fetch ---
// In a real application, this data would be fetched securely from your server.
const studentData = {
    totalClassesHeld: 200,
    classesAttended: 135, // Example: 135/200 = 67.5% (Not Eligible)
    // Try: classesAttended: 155, // 155/200 = 77.5% (Eligible)
    requiredAttendance: 75
};

// --- Core Calculation & Display Function ---
function checkEligibility() {
    const { totalClassesHeld, classesAttended, requiredAttendance } = studentData;
    
    // 1. Calculate Percentage
    const attendancePercentage = (classesAttended / totalClassesHeld) * 100;
    const formattedPercent = attendancePercentage.toFixed(1); // One decimal place

    // 2. Update Dashboard Stats
    document.getElementById('current-percent').textContent = `${formattedPercent}%`;
    document.getElementById('classes-held').textContent = totalClassesHeld;
    document.getElementById('classes-attended').textContent = classesAttended;
    
    // 3. Determine Eligibility Status
    const statusDiv = document.getElementById('status-message');

    if (attendancePercentage >= requiredAttendance) {
        statusDiv.className = 'status-box eligible';
        statusDiv.innerHTML = '🎉 **Congratulations!** You are **ELIGIBLE** to attend the exams.';
    } else {
        statusDiv.className = 'status-box not-eligible';
        statusDiv.innerHTML = `
            <p>🚫 **WARNING: NOT ELIGIBLE.** Your attendance is **${formattedPercent}%**.</p>
            <p>To attend the exam, you must pay the compulsory fine of **₹1000**.</p>
            <button class="pay-button" onclick="initiatePayment()">Pay Fine Now (₹1000)</button>
        `;
    }
}

function initiatePayment() {
    // In a real system, this function would redirect the student to the payment gateway (e.g., Razorpay/Stripe)
    alert('Redirecting to the secure payment gateway to pay the ₹1000 fine...');
    // After successful payment, the backend would update the student's eligibility status.
}

// Run the check when the page loads
document.addEventListener('DOMContentLoaded', checkEligibility);