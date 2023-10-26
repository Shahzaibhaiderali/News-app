const div = document.querySelector('.newsInfo');
const apiKey = '7bf7846dda9a4787a5c95579b130a331';

document.querySelector('.getNews').addEventListener('click', () => {
    const news = document.querySelector('.inputNews').value;

    axios.get(`https://newsapi.org/v2/everything?q=${news}&apiKey=${apiKey}`)
        .then((response) => {
            const data = response.data;

            if (data.status === 'error') {
                alert('News not found. Please check the News name.');
                return;
            }

            const articles = data.articles;
            if (articles.length === 0) {
                alert('No articles found for the given query.');
                return;
            }

            div.innerHTML = '';

            articles.forEach((article, index) => {
                const newsCard = document.createElement('div');
                newsCard.className = 'newsCard';
                newsCard.onclick = () => showEnlargedImage(article.urlToImage);

                const image = document.createElement('img');
                image.src = article.urlToImage ? article.urlToImage : 'placeholder-image.jpg';
                image.alt = 'News Image';

                const cardContent = document.createElement('div');
                cardContent.className = 'cardContent';

                const newsTitle = document.createElement('h2');
                newsTitle.className = 'newsTitle';
                newsTitle.textContent = article.title;

                const newsDescription = document.createElement('p');
                newsDescription.className = 'newsDescription';
                newsDescription.textContent = article.description ? article.description : 'No description available.';

                cardContent.appendChild(newsTitle);
                cardContent.appendChild(newsDescription);

                newsCard.appendChild(image);
                newsCard.appendChild(cardContent);

                div.appendChild(newsCard);
            });
        })
        .catch((error) => {
            console.error(error);
            alert('Error fetching News data.');
        });
});

function showEnlargedImage(imageSrc) {
    const enlargedImage = document.querySelector('.enlargedImage');
    const imageOverlay = document.querySelector('.imageOverlay');
    
    enlargedImage.src = imageSrc;
    imageOverlay.style.display = 'block';
}

function hideEnlargedImage() {
    const imageOverlay = document.querySelector('.imageOverlay');
    imageOverlay.style.display = 'none';
}