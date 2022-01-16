$(document).ready(function() {
  $("#cpf").mask("000.000.000-00");
  $("#celular").mask("(00) 00000-0000");
  $("#nascimento").mask("00/00/0000", {placeholder: "DD/MM/AAAA"});
  
  $(".cpf-col").mask("000.000.000-00");
  $(".celular-col").mask("(00) 00000-0000");
  $(".nascimento-col").mask("00/00/0000", {placeholder: "DD/MM/AAAA"});
});

let candidatos = [
  { id: "1", cpf: "42604610876", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  { id: "2", cpf: "42604610876", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
];


// NOTE: append local storage em candidatos
candidatos.push(...(localStorage.getItem("localStorageCandidatos") !== null)
  ? JSON.parse(localStorage.getItem("localStorageCandidatos")) : []);

function abrirModal(candidato) {
  if (candidato) {
    document.getElementById("id").value = candidato.id;
    document.getElementById("cpf").value = candidato.cpf;
    document.getElementById("nome").value = candidato.nome;
    document.getElementById("celular").value = candidato.celular;
    document.getElementById("email").value = candidato.email;
    if(candidato.sexo=='Masculino'){
      document.getElementById("sexoMasculino").checked = true;
    }else{
      document.getElementById("sexoFeminino").checked = true;
    }
    document.getElementById("nascimento").value = candidato.nascimento.split('/').reverse().join('-');
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;

    mask_form();
  }

  $('#candidatoModal').modal('show');
}

function fecharModal() {
  $('#candidatoModal').modal('hide');
  $('body').removeClass('modal-open');
  $('body').removeAttr('style');
  $('.modal-backdrop').remove();

  document.getElementById("id").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("email").value = "";
  document.getElementById("sexoMasculino").checked = true;
  document.getElementById("nascimento").value = '';
  document.getElementById("skillHtml").checked = false;
  document.getElementById("skillCss").checked = false;
  document.getElementById("skillJs").checked = false;
}

function show_custom_alert(alert_msg)
{
  if (document.getElementById("custom-alert")) { close_custom_alert(); }
  let custom_alert = document.createElement("div");
  custom_alert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
  custom_alert.setAttribute("id", "custom-alert");
  custom_alert.setAttribute("role", "alert");
  custom_alert.innerHTML = `<strong>${alert_msg}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  let alert_parent = document.getElementById("modal-popup");
  alert_parent.insertBefore(custom_alert, document.getElementById("modal-footer-el"));
}

function local_storage_add_candidato()
{
  localStorage.setItem("candidato")
  

}

function local_storage_remove_candidato()
{

}

function close_custom_alert()
{
  let custom_alert = document.getElementById("custom-alert");
  if (custom_alert) {
    custom_alert.remove();
  }
}

function salvar() {
  let id = document.getElementById("id").value;
  let cpf = $("#cpf").cleanVal();
  let nome = document.getElementById("nome").value;
  let celular = $("#celular").cleanVal();
  let email = document.getElementById("email").value;
  let nascimento_str = $("#nascimento").cleanVal();
  let nascimento_date = new Date(nascimento_str);
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;
  let skillBootstrap = document.getElementById("skillBootstrap").checked;
  
  // Fazer validações aqui
  const CPF_SIZE = 11;
  const BR_PHONE_NUMBER_SIZE = 11;
  const DATE_SIZE = 8;
  const MIN_AGE = 16;
  const idade = new Date().getFullYear() - nascimento_date.getFullYear();
  console.log(idade);
  console.log(nascimento_date);
  console.log(sexo);
  
  if (cpf.length == 0) {
    show_custom_alert("Campo CPF é obrigatório."); return;
  }
  else if (cpf.length != CPF_SIZE) {
    show_custom_alert("CPF inválido."); return;
  }
  
  else if (nome.length == 0) {
    show_custom_alert("Campo nome é obrigatório."); return;
  }
  else if ((nome.split(" ").lengh < 2)) {
    show_custom_alert("Nome inválido. Preencha nome e sobrenome."); return;
  }
  
  else if (celular.length == 0) {
    show_custom_alert("Campo celular é obrigatório."); return;
  }
  else if (celular.length != BR_PHONE_NUMBER_SIZE) {
    show_custom_alert("Número de celular inválido."); return;
  }
  
  else if (nascimento_str.length == 0) {
    show_custom_alert("Campo data é obrigatório."); return;
  }
  else if ((nascimento_str.length < DATE_SIZE) || isNaN(nascimento_date.getTime())) {
    show_custom_alert("Data inválida."); return;
  }
  
  else if (idade.length == 0) {
    show_custom_alert("Campo idade é obrigatório."); return;
  }
  else if (idade < MIN_AGE) {
    show_custom_alert(`Você precisa ter no mínimo ${MIN_AGE} anos.`); return;
  }
  
  else if (email.length == 0) {
    show_custom_alert("Campo email é obrigatório."); return;
  }
  else if (!email.includes("@")) {
    show_custom_alert("Email inválido."); return;
  }
  
  else if (!sexo) {
    show_custom_alert("Seleção de sexo é obrigatória."); return;
  }
  else if (!skillHtml && !skillCss && !skillJs && !skillBootstrap) {
    show_custom_alert("Você precisa informar no mínimo 1 habilidade."); return;
  }


  // Fazer validações aqui

  candidato = {
    id: id!=''?id:new Date().getTime(),
    cpf: cpf,
    nome: nome,
    celular: celular,
    email: email,
    sexo: sexo?'Masculino':'Feminino',
    nascimento: nascimento_str,
    skills: {
      html: skillHtml,
      css: skillCss,
      js: skillJs,
      bootstrap: skillBootstrap
    }
  };
  
  console.log(typeof candidato.cpf);

  if(id!=''){
    let checkCandidato = candidatos.find(e=>e.id == candidato.id);
    checkCandidato.cpf = candidato.cpf;
    checkCandidato.nome = candidato.nome;
    checkCandidato.celular = candidato.celular;
    checkCandidato.email = candidato.email;
    checkCandidato.sexo = candidato.sexo;
    checkCandidato.nascimento = candidato.nascimento;
    checkCandidato.skills = candidato.skills;
  }else{
    candidatos.push(candidato);
    localStorage.setItem("localStorageCandidatos", JSON.stringify(candidatos));
  }

  fecharModal();
  listarCandidatos();
}

function listarCandidatos() {
  let tabela = document.getElementById("table-body");
  tabela.innerHTML = '';

  for (let candidato of candidatos) {
    let linha = document.createElement("tr");

    let colunaCpf = document.createElement("td");
    colunaCpf.setAttribute("data-label", "cpf")
    colunaCpf.setAttribute("class", "cpf-col")
    let colunaNome = document.createElement("td");
    colunaNome.setAttribute("data-label", "nome")
    let colunaCelular = document.createElement("td");
    colunaCelular.setAttribute("data-label", "celular")
    colunaCelular.setAttribute("class", "celular-col")
    let colunaEmail = document.createElement("td");
    colunaEmail.setAttribute("data-label", "email")
    let colunaSexo = document.createElement("td");
    colunaSexo.setAttribute("data-label", "sexo")
    let colunaNascimento = document.createElement("td");
    colunaNascimento.setAttribute("data-label", "nascimento")
    colunaNascimento.setAttribute("class", "nascimento-col")
    let colunaSkills = document.createElement("td");
    colunaSkills.setAttribute("data-label", "skills")
    let colunaEditar = document.createElement("td");
    let colunaRemover = document.createElement("td");
    
    let colunaEditarRemover = document.createElement("td");
    colunaEditarRemover.setAttribute("colspan", "2");
    colunaEditarRemover.setAttribute("id", "col-edit-remove");
    
    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.setAttribute("type", "button");
    botaoEditar.setAttribute("class", "btn");
    botaoEditar.setAttribute("id", "btn-edit");
    botaoEditar.setAttribute("style", "background-color: lightblue;");
    botaoEditar.innerHTML = '<i class="material-icons md-36" style="background-color: pink;">edit</i>';
    colunaEditarRemover.appendChild(botaoEditar);
    botaoEditar.onclick = function () {
      console.log('editar');
      abrirModal(candidato);
    }

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.setAttribute("type", "button");
    botaoRemover.setAttribute("class", "btn");
    botaoRemover.setAttribute("id", "btn-remove");
    botaoRemover.setAttribute("style", "background-color: lightblue;");
    botaoRemover.innerHTML = '<i class="material-icons md-36" style="background-color:pink;">highlight_off</i>';
    botaoRemover.onclick = function () {
      candidatos.splice(candidatos.indexOf(candidato), 1);
      localStorage.setItem("localStorageCandidatos", JSON.stringify(candidatos));
      listarCandidatos();
    }
    colunaEditarRemover.appendChild(botaoRemover);
    
    let arrSkills = [];
    if(candidato.skills.html){
      arrSkills.push('HTML');
    }
    if(candidato.skills.css){
      arrSkills.push('CSS');
    }
    if(candidato.skills.js){
      arrSkills.push('JS');
    }
    if(candidato.skills.js){
      arrSkills.push('Bootstrap');
    }

    colunaCpf.appendChild(document.createTextNode(candidato.cpf));
    colunaNome.appendChild(document.createTextNode(candidato.nome));
    colunaCelular.appendChild(document.createTextNode(candidato.celular));
    colunaEmail.appendChild(document.createTextNode(candidato.email));
    colunaSexo.appendChild(document.createTextNode(candidato.sexo));
    colunaNascimento.appendChild(document.createTextNode(candidato.nascimento));
    colunaSkills.appendChild(document.createTextNode(arrSkills.join(', ')));
    colunaEditarRemover.appendChild(botaoEditar);
    colunaEditarRemover.appendChild(botaoRemover);
    //colunaEditar.appendChild(botaoEditar);
    //colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditarRemover);
    //linha.appendChild(colunaEditar);
    //linha.appendChild(colunaRemover);

    tabela.appendChild(linha);
  }
}

listarCandidatos();


//Trecho resposável pelo filtro da tabela
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#candidatos tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
