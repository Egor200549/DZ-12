const news = document.querySelector('#news');
const buttons = document.querySelector('#buttons');

type TNews = {
    title: string;
    author: string;
    description: string;
    urlToImage: string;
    sourse: TSourse;
}

type TSourse = {
    id: string;
    name: string;
}

type Source = {
    category: string
    country: string
    description: string
    id: string
    language: string
    name: string
    url: string
}

let apiUrl = "https://newsapi.org/v2/";
let apiSources = "https://newsapi.org/v2/sources"
let apiKey = "01843b55d84b49b5883c9120e5448843";

const fetchNews = async (source: string) => {
    let response = await fetch(`${apiUrl}everything?apiKey=${apiKey}&sources=${source}`);
    let object = await response.json();
    renderNews(object.articles);
}

const fetchSources = async () => {
    let response = await fetch(`${apiSources}?apiKey=${apiKey}`)
    let object = await response.json();
    renderSources(object.sources);
}

fetchSources();

const renderSources = (sources: Source[]) => {
    sources?.forEach(element => {
        const button = document.createElement('button');
        button.classList.add('button__source');
        button.textContent = element.name;
        button.addEventListener('click', () => fetchNews(element.id));
        buttons!.append(button);
    });

}

const renderNews = (newsArray: TNews[]) => {
    news!.innerHTML = ``;
    newsArray?.forEach(newsItem => {
        const listItem = document.createElement('div');
        listItem.className = "news__item";
        news?.appendChild(listItem);

        const imgItem = document.createElement('img');
        imgItem.className = 'image';
        imgItem.src = newsItem.urlToImage;
        listItem.appendChild(imgItem);

        const titleItem = document.createElement('h2');
        titleItem.innerHTML = newsItem.title;
        listItem.appendChild(titleItem);

        const descriptionItem = document.createElement('p');
        descriptionItem.innerHTML = newsItem.description;
        listItem.appendChild(descriptionItem);

        const authorItem = document.createElement('h3');
        authorItem.innerHTML = newsItem.author;
        listItem.appendChild(authorItem);
    });
}