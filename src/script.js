$(document).ready(function() {
  $("#cpf").mask("000.000.000-00");
  $("#celular").mask("(00) 00000-0000");
  $("#nascimento").mask("00/00/0000", {placeholder: "DD/MM/AAAA"});
});

let candidatos = [];

//let testeCandidatos = [
//  { id: "1", cpf: "42604610876", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
//  { id: "2", cpf: "42604610876", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
//];


// NOTE: append local storage em candidatos
if (localStorage.getItem("localStorageCandidatos") !== null) {
  candidatos.push(...JSON.parse(localStorage.getItem("localStorageCandidatos")));
}

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
    document.getElementById("nascimento").value = candidato.nascimento;
    document.getElementById("skillHtml").checked = candidato.skills.html;
    document.getElementById("skillCss").checked = candidato.skills.css;
    document.getElementById("skillJs").checked = candidato.skills.js;
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

function showCustomAlert(alertMsg)
{
  if (document.getElementById("custom-alert")) { close_custom_alert(); }
  let customAlert = document.createElement("div");
  customAlert.setAttribute("class", "alert alert-danger alert-dismissible fade show");
  customAlert.setAttribute("id", "custom-alert");
  customAlert.setAttribute("role", "alert");
  customAlert.innerHTML = `<strong>${alertMsg}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
  let alertParent = document.getElementById("modal-popup");
  alertParent.insertBefore(customAlert, document.getElementById("modal-footer-el"));
}

function close_custom_alert()
{
  let customAlert = document.getElementById("custom-alert");
  if (customAlert) {
    customAlert.remove();
  }
}

function validateCandidato(candidato)
{
  const BR_PHONE_NUMBER_SIZE = 11;
  const DATE_STR_SIZE = 10;
  const MIN_AGE = 16;
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - MIN_AGE);   // 16 anos atrás
  
  //console.log(candidato);
  candidato["nome"] = candidato["nome"].trim();
  candidato["email"] = candidato["email"].trim();
  let nascimentoDate = new Date(`${candidato["nascimento"].substring(3,5)}/${candidato["nascimento"].substring(0,2)}/${candidato["nascimento"].substring(6)}`);
  
  // Check fields fill
  let keys = Object.keys(candidato);
  keys.pop();
  console.log(keys);
  for (let key of keys) {
    if (!candidato[key]) {
      showCustomAlert(`Campo ${key} é obrigatório.`); return;
    }
  }
  let isSkill = false;
  for (let skill in candidato["skills"]) {
    if (candidato["skills"][skill]) {
      isSkill = true;
      break;
    }
  }
  if (!isSkill) {
    showCustomAlert("Você precisa informar no mínimo 1 habilidade."); return;
  }
 /* 
  if (!cpf) {
  }
  else if (!validadeCpf(cpf)) {
    show_custom_alert("CPF inválido."); return;
  }
  
  else if (!nome) {
    show_custom_alert("Campo nome é obrigatório."); return;
  }
  else if ((nome.match(/[0-9]/)) || (nome.split(" ").length < 2)) {
    show_custom_alert("Nome inválido. Preencha nome e sobrenome."); return;
  }
  
  else if (!celular) {
    show_custom_alert("Campo celular é obrigatório."); return;
  }
  else if (celular.length != BR_PHONE_NUMBER_SIZE) {
    show_custom_alert("Número de celular inválido."); return;
  }
  
  else if (!email) {
    show_custom_alert("Campo email é obrigatório."); return;
  }
  else if (!validateEmail(email)) {
    show_custom_alert("Email inválido."); return;
  }
  
  else if (!nascimento_str) {
    show_custom_alert("Campo data é obrigatório."); return;
  }
  else if ((nascimento_str.length < DATE_STR_SIZE) || (nascimento_date == "Invalid Date")) {
    show_custom_alert("Data inválida."); return;
  }
  else if (nascimento_date > minDate) {
    show_custom_alert("Você precisa ter no mínimo 16 anos.");
  }
  
  else if (!sexo) {
    show_custom_alert("Seleção de sexo é obrigatória."); return;
  }
  */
}

function validadeCpf(cpf)
{
  // NOTE: return true if cpf is valid
  if (typeof cpf != "string") { console.log("must be string."); }
  const CPF_SIZE = 11;
  if (cpf.length != CPF_SIZE) { return false; }
  if ((cpf[7] == 1) && (cpf[8] != 0)) { return false; }
  
  let d = cpf.split("");
  d.splice(9); d.reverse();
  
  let v1 = 0;
  let v2 = 0;
  
  for (let i = 0; i < 9; ++i) {
    v1 = v1 + d[i] * (9 - (i % 10));
    v2 = v2 + d[i] * (9 - ((i + 1) % 10));
  }
  
  v1 = (v1 % 11) % 10;
  v2 = (v2 + v1 * 9) % 11 % 10;
  
  if ((v1 != cpf[9]) || (v2 != cpf[10])) return false;
  return true;
}

function validateEmail(email)
{
  if (typeof email != "string") { console.log("must be string."); }
  let re = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
  
  if (!re.text(email)) return false;
  return true;
}

function salvar() {
  let id = document.getElementById("id").value;
  
  let testeCandidato = {
    cpf: $("#cpf").cleanVal(),
    nome: document.getElementById("nome").value,
    celular: $("#celular").cleanVal(),
    email: document.getElementById("email").value,
    sexo: document.getElementById("sexoMasculino").checked,
    nascimento: document.getElementById("nascimento").value,
    skills: {
      html: document.getElementById("skillHtml").checked,
      css: document.getElementById("skillCss").checked,
      js: document.getElementById("skillJs").checked,
      bootstrap: document.getElementById("skillBootstrap").checked,
    }
  };
  
  // Fazer validações aqui
  validateCandidato(testeCandidato);
  // Fazer validações aqui

  candidato = {
    id: id!=''?id:new Date().getTime(),
    cpf: testeCandidato["cpf"],
    nome: testeCandidato["nome"],
    celular: testeCandidato["celular"],
    email: testeCandidato["email"],
    sexo: testeCandidato["sexo"]?'Masculino':'Feminino',
    nascimento: testeCandidato["nascimento"],
    skills: testeCandidato["skills"]
  };
  
  
  if(id!=''){
    let checkCandidato = candidatos.find(e=>e.id == candidato.id);
    checkCandidato.cpf = candidato.cpf;
    checkCandidato.nome = candidato.nome;
    checkCandidato.celular = candidato.celular;
    checkCandidato.email = candidato.email;
    checkCandidato.sexo = candidato.sexo;
    checkCandidato.nascimento = candidato.nascimento;
    checkCandidato.skills = candidato.skills;
    localStorage.setItem("localStorageCandidatos", JSON.stringify(candidatos));
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
    let colunaEditarRemover = document.createElement("td");
    
    colunaEditarRemover.setAttribute("colspan", "2");
    colunaEditarRemover.setAttribute("class", "d-flex btn-group align-content-between");
    colunaEditarRemover.setAttribute("id", "col-edit-remove");
    
    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.setAttribute("type", "button");
    botaoEditar.setAttribute("class", "btn btn-primary justify-content-center align-content-between");
    botaoEditar.setAttribute("id", "btn-edit");
    //botaoEditar.setAttribute("style", "background-color: lightblue;");
    botaoEditar.innerHTML = '<i class="material-icons md-36 md-right-padding">edit</i>Editar';
    botaoEditar.onclick = function () {
      abrirModal(candidato);
    }
    colunaEditarRemover.appendChild(botaoEditar);

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.setAttribute("type", "button");
    botaoRemover.setAttribute("class", "btn btn-danger");
    botaoRemover.setAttribute("id", "btn-remove");
    //botaoRemover.setAttribute("style", "background-color: lightblue;");
    botaoRemover.innerHTML = '<i class="material-icons md-36 md-right-padding">highlight_off</i>Remover';
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
  $(".cpf-col").mask("000.000.000-00");
  $(".celular-col").mask("(00) 00000-0000");
  $(".nascimento-col").mask("00/00/0000", {placeholder: "DD/MM/AAAA"});
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
