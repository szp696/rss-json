function trimDom(str) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(str, "text/html");
    let txt = doc.body.innerText;
    return txt.substring(0, 255) + "...";
}

function readNews() {
    fetch("rss.json")
        .then((r) => r.json())
        .then(renderNews);
}

function renderNews(news) {
    let items = news.items;
    for (let item of items) {
        renderItem(item);
    }
}

function renderItem(item) {
    let box = document
        .createElement('div');
        box.className = "article";
    let title = document
        .createElement('h1');

    let desc = document
        .createElement('p');

    title
        .innerText = item.title;
        
    desc.innerText = trimDom(item.summary);

        box.append(title, desc);
        document
        .getElementById('rss')
        .append(box);
    }
    
    window.addEventListener('load', readNews);
