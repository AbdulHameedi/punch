const newDate = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
};
let formatDate = newDate.toLocaleDateString('en-US', options);
document.getElementById('currentDate').textContent = formatDate;

async function fetchNews() {
    const apiKey = '8a42509e81124c1db54a222d1a2aefba';
    const apiBase = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
    const apiLatest = `${apiBase}&pageSize=5`;
    const apiTop = `${apiBase}&pageSize=5&page=2`; // Fetching from a different page for top news

    try {
        // Fetch the latest news
        const latestResponse = await fetch(apiLatest);
        const latestData = await latestResponse.json();
        const articles = latestData.articles;

        console.log("Latest articles:", articles);

        // Fetch top news
        const topResponse = await fetch(apiTop);
        const topData = await topResponse.json();
        const topArticles = topData.articles;

        console.log("Top articles:", topArticles);

        // Display the latest news
        const htmlInLatest = document.querySelectorAll('.latest-news')[0];
        if (articles && articles.length) {
            articles.forEach(article => {
                let { description } = article;
                if (description) {
                    description = description.split(' ').slice(0, 11).join(' ');
                }
                const inLatestNews = document.createElement('div');
                inLatestNews.innerHTML = `
                    <div class="in-latest-news before-style">
                        <small><small>10 minutes ago</small></small>
                        <p>${description}</p>
                    </div>
                `;
                htmlInLatest.appendChild(inLatestNews);
            });
        } else {
            console.error("No latest articles found.");
        }

        // Display the top news
        const topInLatest = document.querySelectorAll('.latest-news')[1];
        if (topArticles && topArticles.length) {
            topArticles.forEach(topArticle => {
                let { description } = topArticle;
                if (description) {
                    description = description.split(' ').slice(0, 11).join(' ');
                }
                const topLatestNews = document.createElement('div');
                topLatestNews.innerHTML = `
                    <div class="in-latest-news top-style">
                        <small><small>10 minutes ago</small></small>
                        <p>${description}</p>
                    </div>
                `;
                topInLatest.appendChild(topLatestNews);
            });
        } else {
            console.error("No top articles found.");
        }

    } catch (error) {
        console.log('Error fetching news:', error);
    }
}

fetchNews();
