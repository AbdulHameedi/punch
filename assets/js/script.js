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
            let {description,title,urlToImage} = article;
            if(title){
                title=title.split(' ').slice(0,11).join(' ')
            }
            const inLatestNews = document.createElement('div');
            inLatestNews.innerHTML =`
                <div class="in-latest-news before-style">
                    <small><small>10 minutes ago</small></small>
                    <p>${title}</p>
                </div>
            `;
            htmlInLatest.appendChild(inLatestNews);

            // METRO PLUS
            let metroTitle = article.title;
            if (metroTitle) {
                metroTitle = metroTitle.split(' ').slice(0, 7).join(' ');
            }
            const getMetroTexts = document.querySelector('.get-metro-texts');
            const getMetroTextsDiv = document.createElement('div');
            getMetroTextsDiv.innerHTML = `
                <div>
                    <img src="${urlToImage}" alt="">
                    <p>${metroTitle}</p>
                </div>
            `;
            getMetroTexts.appendChild(getMetroTextsDiv)
        })
        // top news
        const topInLatest = document.querySelectorAll('.latest-news')[1];
        const topVideo = document.querySelector('.top-videos-img');
        topArticles.forEach(topArticle=>{
            let {description,urlToImage,title} = topArticle;
            if(title){
                title=title.split(' ').slice(0,11).join(' ')
            }
            const topLatestNews = document.createElement('div');
            topLatestNews.innerHTML =`
                <div class="in-latest-news top-style">
                    <small><small>10 minutes ago</small></small>
                    <p>${title}</p>
                </div>
            `;
            topInLatest.appendChild(topLatestNews);

            // top-videos
            const topVideoDiv = document.createElement('div');
            topVideoDiv.innerHTML=`
                <div>
                    <img src="${urlToImage}" alt="topVideos">
                    <p class="top-video-overlay"></p>
                    <p class="top-video-text">${title}</p>
                </div>
            `;
            topVideo.appendChild(topVideoDiv)
        })

        // img-in-between
        const imgTop = document.querySelector('.img-top');
        const imgTopDiv = document.createElement('div')
        imgTopDiv.innerHTML=`
            <div class="latest-img">
                <img class="" src="${articles[0].urlToImage}" alt="img-main">
                <h1>${articles[0].description}</h1>
            </div>
        `;
        imgTop.appendChild(imgTopDiv)
        
        //metroplus first container
        let metroHeading = articles[2].title;
        if(metroHeading){
            metroHeading= metroHeading.split(' ').slice(0,7).join(' ')
        }
        const firstMetro = document.querySelector('.first-metro');
        const firstMetroDiv = document.createElement('div')
        firstMetroDiv.innerHTML=`
            <img src="${articles[2].urlToImage}" alt="metroplus">
                <h2>${metroHeading}</h2>
                <p>${articles[2].description}</p>
        `;
        // console.log(`This is articles[2]: ${articles[2].title}`)
        firstMetro.appendChild(firstMetroDiv)

        
    }catch(error){
        console.log('Error fetching news', error)
    }
  
}
fetchNews();