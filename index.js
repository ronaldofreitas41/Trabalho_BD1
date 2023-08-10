const corteBtn = document.getElementById("corte-btn");
const leiteBtn = document.getElementById("leite-btn");
const NBL = document.getElementById("box-animal-createL");
const UBL = document.getElementById("box-animal-updateL");
const NBC = document.getElementById("box-animal-createL");
const UBC = document.getElementById("box-animal-updateL");
let cont = 0;
let cont2 = 0;

leiteBtn.addEventListener("click", leite);
corteBtn.addEventListener('click', corte);

function leite(){
    if (NBC.style.display == "block" || UBC.style.display == "block"){
        NBC.style.display = "none" 
        UBC.style.display = "none"
    }
    let leiteController = new LeiteController("form-animal-createL", "form-animal-updateL", "table-animal", cont);
    cont++;
}

function corte() {
    if (NBL.style.display == "block" || UBL.style.display == "block"){
        NBL.style.display = "none" 
        UBL.style.display = "none"
    }
    let corteController = new CorteController("form-animal-createC", "form-animal-updateC", "table-animal", cont2);
    cont2++;
}

