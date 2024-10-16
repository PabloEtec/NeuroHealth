document.addEventListener('DOMContentLoaded', function() {
    let selectedRating = 0;

    
    function loadFeedbacks() {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        
        feedbackContainer.innerHTML = '';
        storedFeedbacks.forEach(feedback => {
            addFeedbackToDisplay(feedback);
        });
    }

   
    function createFeedbackElement(feedback) {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';

        
        const feedbackAuthor = document.createElement('div');
        feedbackAuthor.className = 'feedback-author';
        feedbackAuthor.textContent = `Por: ${feedback.name}`;

        const feedbackTime = document.createElement('div');
        feedbackTime.className = 'feedback-time';
        feedbackTime.textContent = `Em: ${feedback.date}`;

       
        const feedbackText = document.createElement('p');
        feedbackText.textContent = feedback.text;

       
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


    function addFeedbackToDisplay(feedback, saveToStorage = true) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const feedbackItem = createFeedbackElement(feedback);
        
        feedbackContainer.prepend(feedbackItem); // Adiciona ao topo

        if (saveToStorage) {
            saveFeedback(feedback);
        }
    }


    function saveFeedback(feedback) {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        storedFeedbacks.unshift(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
    }

    function updateFeedbackLikes(name, feedbackText, likes) {
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const feedbackIndex = storedFeedbacks.findIndex(fb => fb.name === name && fb.text === feedbackText);
        if (feedbackIndex !== -1) {
            storedFeedbacks[feedbackIndex].likes = likes;
            localStorage.setItem('feedbacks', JSON.stringify(storedFeedbacks));
        }
    }

   
    function filterFeedbacks(rating) {
        const feedbackContainer = document.getElementById('feedbackContainer');
        const storedFeedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        const filteredFeedbacks = rating === 'all' ? storedFeedbacks : storedFeedbacks.filter(feedback => feedback.rating === parseInt(rating));
        
        feedbackContainer.innerHTML = ''; 
        filteredFeedbacks.forEach(feedback => {
            addFeedbackToDisplay(feedback, false);
        });
    }


    document.getElementById('sendFeedback').addEventListener('click', function() {
        const nameInput = document.getElementById('nameInput').value.trim();
        const feedbackInput = document.getElementById('feedbackInput').value.trim();
        const feedbackMessage = document.getElementById('feedbackMessage');
        const currentDate = new Date().toLocaleString();

        if (nameInput && feedbackInput && selectedRating > 0) {
            const feedback = { name: nameInput, text: feedbackInput, date: currentDate, rating: selectedRating };
            addFeedbackToDisplay(feedback);
            document.getElementById('nameInput').value = '';
            document.getElementById('feedbackInput').value = ''; 
            feedbackMessage.textContent = 'Feedback enviado com sucesso!';
            feedbackMessage.classList.remove('hidden');
            setTimeout(() => feedbackMessage.classList.add('hidden'), 3000);
        } else {
            feedbackMessage.textContent = 'Por favor, preencha todos os campos e selecione uma avaliação.';
            feedbackMessage.classList.remove('hidden');
            setTimeout(() => feedbackMessage.classList.add('hidden'), 3000);
        }
    });

    
    document.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            document.querySelectorAll('.star').forEach(star => {
                star.classList.toggle('selected', parseInt(star.getAttribute('data-value')) <= selectedRating);
            });
        });
    });

    
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterFeedbacks(this.getAttribute('data-rating'));
        });
    });

 
    loadFeedbacks();
});
