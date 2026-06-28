// TEST BÁSICO - SOLO PARA VER SI FUNCIONA

console.log("JS cargado correctamente");

const canams = document.querySelectorAll(".canam");

console.log("Can-Am encontrados:", canams.length);

canams.forEach(c => {

    c.addEventListener("click", () => {

        alert("Funciona el click del Can-Am 🚙");

    });

});
