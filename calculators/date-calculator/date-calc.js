
  <script src="/assets/js/main.js"></script>
  <script>
    function calculateDifference() {
      const start = document.getElementById('startDate').value;
      const end = document.getElementById('endDate').value;
      if (!start || !end) { showNotification('Please enter both dates', 'error'); return; }
      const startDate = new Date(start); const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate); const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const diffWeeks = Math.floor(diffDays / 7); const diffMonths = Math.floor(diffDays / 30.44); const diffYears = Math.floor(diffDays / 365.25);
      document.getElementById('diffOutput').innerHTML = `<strong>Total Difference:</strong><br>${diffDays} days<br>${diffWeeks} weeks<br>${diffMonths} months (approx.)<br>${diffYears} years (approx.)`;
      document.getElementById('diffOutput').style.display = 'block'; showNotification('Difference calculated!', 'success');
    }
    function addSubtractDays() {
      const base = document.getElementById('baseDate').value; const days = parseInt(document.getElementById('daysToAdd').value);
      if (!base || isNaN(days)) { showNotification('Please enter both date and number of days', 'error'); return; }
      const baseDate = new Date(base); baseDate.setDate(baseDate.getDate() + days);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const resultDate = baseDate.toLocaleDateString('en-US', options); const iso = baseDate.toISOString().split('T')[0];
      document.getElementById('addOutput').innerHTML = `<strong>New Date:</strong><br>${resultDate}<br><span style="color: var(--text-muted); font-size: 0.9em;">${iso}</span>`;
      document.getElementById('addOutput').style.display = 'block'; showNotification('Date calculated!', 'success');
    }
  </script>
</body>
</html>
