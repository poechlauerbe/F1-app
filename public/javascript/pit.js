document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/pit')
        .then(response => response.json())
        .then(data => {
            const pitDiv = document.getElementById('pit');
            pitDiv.innerHTML = '';
            data.forEach(pitinfo => {
				console.log(pitinfo);
            });
        })
        .catch(error => {
            console.error('Error fetching pit infos:', error);
        });
});
