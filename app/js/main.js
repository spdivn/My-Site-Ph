document.addEventListener('DOMContentLoaded', function (params) {
    var template = (data) => `<div class="cell small-12 medium-6 large-3">
    <a href="${data}" data-lightbox="roadtrip" >
    <img src="${data}" alt="Boh">
    </a>
    </div>`,
        portfolio = document.querySelector('#portfolio');

    fetch('../myjsonfile.json')
        .then((resp) => resp.json())
        .then(function (elm) {
            for (const key in elm.table) {
                portfolio.innerHTML += template(elm.table[key].url);
            }
        });

    lightbox.option({
        'disableScrolling': true,
        'albumLabel': '%1/%2',
        'alwaysShowNavOnTouchDevices': true,
        'wrapAround': true
    });
})
