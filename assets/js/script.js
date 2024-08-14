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
    const apiKey = 'b5851b515f021a17742f1e16094eb745';
    const api = `https://gnews.io/api/v4/search?q=example&apikey=${apiKey}`
    const apiLatest=  `${api}&pageSize=5&page=2`;
    const apiTop =  `${api}&pageSize=5&page=1`;
    try{
        // latest fetch
        const response = await fetch(apiLatest);
        const data = await response.json();
        const articles = data.articles
        console.log(articles)

        // top fetch
        const topUrl = apiTop
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
                <div class="in-latest-news before-style">
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
                <div class="in-latest-news top-style">
                    <small><small>10 minutes ago</small></small>
                    <p>${description}</p>
                </div>
            `;
            topInLatest.appendChild(topLatestNews);
        })

        // img-in-between
        const imgTop = document.querySelector('.img-top');
        const imgTopDiv = document.createElement('div')
        imgTopDiv.innerHTML=`
            <div class="latest-img">
                <img class="" src="${articles[0].image}" alt="img-main">
                <h1>${articles[0].description}</h1>
            </div>
        `;
        imgTop.appendChild(imgTopDiv)
        
    }catch(error){
        console.log('Error fetching news', error)
    }
  
}
fetchNews();