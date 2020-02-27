//module router
export function router(){
    routie ({
        'route0': function() {
            classToggle('route0');
            console.log('Je hebt op card 1 geklikt!');
        },
        'route1': function() {
            classToggle('route1');
            console.log('Je hebt op card 2 geklikt!');
        },
        'route2': function() {
            classToggle('route2');
            console.log('Je hebt op card 3 geklikt!');
        },
    });
};

function classToggle(route) {
    //pakt alle html articles
    const articles = document.querySelectorAll('article');

    //foreach loop en removed alle classes "active"
    articles.forEach(article => {
        article.classList.remove('active');
    });

    //pakt de active article en kijkt daarnaar naar de routie 
    const activeArticle = document.querySelector(`[data-route=${route}]`);
    //hier word de class active toegevoegd aan de article die aan geklikt is
    activeArticle.classList.add('active');
};