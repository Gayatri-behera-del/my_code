// Simulated Data from Smartboard/Backend
const simulatedAttendanceData = [
    { roll: '1001', name: 'Alice Johnson', smartboardStatus: 'P', finalStatus: 'P' },
    { roll: '1002', name: 'Bob Williams', smartboardStatus: 'A', finalStatus: 'A' },
    { roll: '1003', name: 'Charlie Davis', smartboardStatus: 'P', finalStatus: 'P' },
    { roll: '1004', name: 'Diana Clark', smartboardStatus: 'A', finalStatus: 'A' },
    { roll: '1005', name: 'Eve Martinez', smartboardStatus: 'P', finalStatus: 'P' },
    { roll: '1006', name: 'Frank Lee', smartboardStatus: 'P', finalStatus: 'P' }
];

function loadAttendance() {
    const classSelect = document.getElementById('class-select');
    const selectedClass = classSelect.options[classSelect.selectedIndex].text;
    const attendanceList = document.getElementById('attendance-list');
    const attendanceSection = document.getElementById('attendance-section');

    document.getElementById('current-class').textContent = selectedClass;
    attendanceSection.style.display = 'block';
    attendanceList.innerHTML = ''; 

    simulatedAttendanceData.forEach(student => {
        const row = document.createElement('tr');
        
        // Determine the style class based on the smartboard status
        let statusClass = student.smartboardStatus === 'P' ? 'present-cell' : 'absent-cell';
        let initialStatus = student.smartboardStatus === 'P' ? 'Present' : 'Absent';

        row.innerHTML = `
            <td>${student.roll}</td>
            <td>${student.name}</td>
            <td class="${statusClass}">${initialStatus}</td>
            <td>
                <select class="status-input" data-roll="${student.roll}" onchange="updateFinalStatus(this)">
                    <option value="P" ${student.finalStatus === 'P' ? 'selected' : ''}>Present</option>
                    <option value="A" ${student.finalStatus === 'A' ? 'selected' : ''}>Absent</option>
                </select>
            </td>
        `;
        attendanceList.appendChild(row);
    });
}

function updateFinalStatus(selectElement) {
    const roll = selectElement.getAttribute('data-roll');
    const newStatus = selectElement.value;
    
    // Update the local simulated data
    const studentIndex = simulatedAttendanceData.findIndex(s => s.roll === roll);
    if (studentIndex !== -1) {
        simulatedAttendanceData[studentIndex].finalStatus = newStatus;
        console.log(`Updated Roll ${roll} to ${newStatus}`);
    }
}

function finalizeAttendance() {
    // This is where the final data (simulatedAttendanceData) would be sent to the backend server
    alert('Attendance finalized and submitted successfully! The system will now update student records and trigger necessary parent email notifications.');
    document.getElementById('attendance-section').style.display = 'none';
}