
  <script src="/assets/js/main.js"></script>
  <script>
    function calculateAge() {
      const birthdateInput = document.getElementById('birthdate').value;
      if (!birthdateInput) {
        showNotification('Please enter your birthdate', 'error');
        return;
      }
      
      const birthdate = new Date(birthdateInput);
      const today = new Date();
      
      let years = today.getFullYear() - birthdate.getFullYear();
      let months = today.getMonth() - birthdate.getMonth();
      let days = today.getDate() - birthdate.getDate();
      
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      if (months < 0) {
        years--;
        months += 12;
      }
      
      const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
      const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
      const totalDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
      
      document.getElementById('ageDisplay').textContent = `${years} Years Old`;
      document.getElementById('exactAge').textContent = `${years} years, ${months} months, and ${days} days`;
      
      document.getElementById('additionalInfo').innerHTML = `
        Total days lived: <strong>${totalDays.toLocaleString()}</strong> days<br>
        Next birthday in: <strong>${daysUntilBirthday}</strong> days<br>
        Age on next birthday: <strong>${years + 1}</strong> years
      `;
      
      document.getElementById('result').style.display = 'block';
      showNotification('Age calculated!', 'success');
    }
  </script>
</body>
</html>
