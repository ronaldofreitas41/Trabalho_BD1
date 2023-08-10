let adicionar = document.getElementById('addNew');
let recarregar = document.getElementById('refresh');

adicionar.addEventListener("click", registrar);
recarregar.addEventListener("click",reload);    

function addLine(dataUser) {
    let tr = this.getTr(dataUser);
  
    const tableEl = document.getElementById("listaAnimais");
  
    tableEl.appendChild(tr);
  }
  
  function getTr(dataUser, tr = null) {
    if (tr === null) tr = document.createElement("tr");
  
    tr.dataset.user = JSON.stringify(dataUser);
  
    tr.innerHTML = `
        <td><img src=${
          dataUser.photo
        } style = "width: 50px" class="img-sqaure img-sm"></td>
        <td>${dataUser.nome}</td>
        <td>${dataUser.brinco}</td>
        <td>${dataUser.genero}</td>
        <td>${dataUser.matriz ? "On" : "Off"}</td>
        <td>
            <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-delete btn-xs btn-flat">Excluir</button>
        </td>
    `;  
    return tr;
  }
