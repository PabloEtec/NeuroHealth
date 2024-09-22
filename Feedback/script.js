document.addEventListener('DOMContentLoaded', function() {
    let selectedRating = 0;

    // Função para carregar feedbacks armazenados no LocalStorage
    function loadFeedbacks() {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        
        feedbackContainer.innerHTML = ''; // Limpa o container antes de adicionar feedbacks
        storedFeedbacks.forEach(feedback => {
            addFeedbackToDisplay(feedback);
        });
    }

    // Função para criar um feedback HTML
    function createFeedbackElement(feedback) {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';

        // Nome do autor
        const feedbackAuthor = document.createElement('div');
        feedbackAuthor.className = 'feedback-author';
        feedbackAuthor.textContent = `Por: ${feedback.name}`;

        // Data e hora
        const feedbackTime = document.createElement('div');
        feedbackTime.className = 'feedback-time';
        feedbackTime.textContent = `Em: ${feedback.date}`;

        // Texto do feedback
        const feedbackText = document.createElement('p');
        feedbackText.textContent = feedback.text;

        // Avaliação em estrelas
        const ratingStars = document.createElement('div');
        ratingStars.className = 'rating-stars';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.textContent = '★';
            star.style.color = i < feedback.rating ? '#ffd700' : '#888';
            ratingStars.appendChild(star);
        }

        feedbackItem.appendChild(feedbackAuthor);
        feedbackItem.appendChild(feedbackTime);
        feedbackItem.appendChild(feedbackText);
        feedbackItem.appendChild(ratingStars);

        return feedbackItem;
    }

    // Função para adicionar um feedback ao display e ao LocalStorage
    function addFeedbackToDisplay(feedback, saveToStorage = true) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackItem = createFeedbackElement(feedback);
        
        feedbackContainer.prepend(feedbackItem); // Adiciona ao topo

        if (saveToStorage) {
            saveFeedback(feedback);
        }
    }

    // Função para salvar feedbacks no LocalStorage
    function saveFeedback(feedback) {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        storedFeedbacks.unshift(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
    }

    // Função para atualizar o número de curtidas no LocalStorage
    function updateFeedbackLikes(name, feedbackText, likes) {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const feedbackIndex = storedFeedbacks.findIndex(fb => fb.name === name && fb.text === feedbackText);
        if (feedbackIndex !== -1) {
            storedFeedbacks[feedbackIndex].likes = likes;
            localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
        }
    }

    // Função para filtrar feedbacks com base na classificação
    function filterFeedbacks(rating) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const filteredFeedbacks = rating === 'all' ? storedFeedbacks : storedFeedbacks.filter(feedback => feedback.rating === parseInt(rating));
        
        feedbackContainer.innerHTML = ''; // Limpa o container
        filteredFeedbacks.forEach(feedback => {
            addFeedbackToDisplay(feedback, false);
        });
    }

    // Evento de clique para enviar o feedback
    document.getElementById('sendFeedback').addEventListener('click', function() {
        const nameInput = document.getElementById('nameInput').value.trim();
        const feedbackInput = document.getElementById('feedbackInput').value.trim();
        const feedbackMessage = document.getElementById('feedbackMessage');
        const currentDate = new Date().toLocaleString();

        if (nameInput && feedbackInput && selectedRating > 0) {
            const feedback = { name: nameInput, text: feedbackInput, date: currentDate, rating: selectedRating };
            addFeedbackToDisplay(feedback);
            document.getElementById('nameInput').value = ''; // Limpa o campo de nome
            document.getElementById('feedbackInput').value = ''; // Limpa o campo de feedback
            feedbackMessage.textContent = 'Feedback enviado com sucesso!';
            feedbackMessage.classList.remove('hidden');
            setTimeout(() => feedbackMessage.classList.add('hidden'), 3000);
        } else {
            feedbackMessage.textContent = 'Por favor, preencha todos os campos e selecione uma avaliação.';
            feedbackMessage.classList.remove('hidden');
            setTimeout(() => feedbackMessage.classList.add('hidden'), 3000);
        }
    });

    // Evento de clique para seleção das estrelas
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            document.querySelectorAll('.star').forEach(star => {
                star.classList.toggle('selected', parseInt(star.getAttribute('data-value')) <= selectedRating);
            });
        });
    });

    // Evento de clique para filtragem de feedbacks
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterFeedbacks(this.getAttribute('data-rating'));
        });
    });

    // Carrega feedbacks ao carregar a página
    loadFeedbacks();
});
