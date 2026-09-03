// Troca a imagem do ícone no cabeçalho ao passar o mouse pelo menu
function mudaFoto(foto) {
    var icone = document.getElementById("icone");
    if (icone) {
        icone.src = foto;
    }
}

// Torna o mapa de imagem clicável (specs.html) responsivo.
// As coordenadas de <area> são fixas em pixels, então quando a imagem
// encolhe em telas menores, as áreas clicáveis precisam ser recalculadas
// na mesma proporção.
function ajustaMapaResponsivo() {
    var imagem = document.getElementById("mapa-componentes");
    if (!imagem) return; // só existe em specs.html

    function recalcular() {
        var escala = imagem.clientWidth / imagem.naturalWidth;
        var areas = document.querySelectorAll("#meumapa area");
        areas.forEach(function (area) {
            var original = area.getAttribute("data-coords").split(",");
            var novasCoords = original
                .map(function (valor) {
                    return Math.round(parseFloat(valor) * escala);
                })
                .join(",");
            area.setAttribute("coords", novasCoords);
        });
    }

    if (imagem.complete) {
        recalcular();
    } else {
        imagem.addEventListener("load", recalcular);
    }
    window.addEventListener("resize", recalcular);
}

document.addEventListener("DOMContentLoaded", ajustaMapaResponsivo);
