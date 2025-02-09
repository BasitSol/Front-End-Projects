let userInput = document.getElementById('date');
userInput.max = new Date().toISOString().split("T")[0];
let result = document.getElementById('result');

function calculateAge() {
    let birthDate = new Date(userInput.value);
    if (!birthDate.getTime()) {
        result.classList.remove('show');
        result.innerHTML = "Please select a valid date!";
        result.classList.add('show');
        return;
    }

    let today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    result.innerHTML = `
        <div class="age-result">
            <span>${ageYears}</span> years
            <span>${ageMonths}</span> months
            <span>${ageDays}</span> days
        </div>
    `;
    result.classList.add('show');
}