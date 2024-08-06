const newDate = new Date();
const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
}
let formatDate = newDate.toLocaleDateString('en-Us', options);
document.getElementById('currentDate').textContent = formatDate

async function fetchNews(){
    const apiKey = '8a42509e81124c1db54a222d1a2aefba';
    const api = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`
    const apiLatest=  `${api}&pageSize=5`;
    const apiTop =  `${api}&pageSize=`;
    const pages = [6,7,8,9,10]
    try{
        // latest fetch
        const response = await fetch(apiLatest);
        const data = await response.json();
        const articles = data.articles
        console.log(articles)

        // top fetch
        const topUrl = apiTop+pages
        const topResponse = await fetch(topUrl);
        const topData = await topResponse.json()
        const topArticles = topData.articles
        console.log(topArticles)


        // latest news
        const htmlInLatest = document.querySelectorAll('.latest-news')[0];
        articles.forEach(article=>{
            let {description} =article;
            if(description){
                description=description.split(' ').slice(0,11).join(' ')
            }
            const inLatestNews = document.createElement('div');
            inLatestNews.innerHTML =`
                <div class="in-latest-news">
                    <small><small>10 minutes ago</small></small>
                    <p>${description}</p>
                </div>
            `;
            htmlInLatest.appendChild(inLatestNews);
        })
        // top news
        const topInLatest = document.querySelectorAll('.latest-news')[1];
        topArticles.forEach(topArticle=>{
            let {description} = topArticle;
            if(description){
                description=description.split(' ').slice(0,11).join(' ')
            }
            const topLatestNews = document.createElement('div');
            topLatestNews.innerHTML =`
                <div class="in-latest-news">
                    <small><small>10 minutes ago</small></small>
                    <p>${description}</p>
                </div>
            `;
            topInLatest.appendChild(topLatestNews);
        })
        
    }catch(error){
        console.log('Error fetching news', error)
    }
  
}
fetchNews();