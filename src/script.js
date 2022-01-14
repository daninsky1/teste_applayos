$(document).ready(function() {
  $("#cpf").mask("000.000.000-00");
  $("#celular").mask("(00) 00000-0000");
  $("#nascimento").mask("00/00/0000");
});

let candidatos = [
  { id: "1", cpf: "42604610876", nome: "Lucas Vieira Dias", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
  { id: "2", cpf: "42604610876", nome: "Nelson Santana", celular: "11957770782", email: "lvdias98@gmail.com", sexo: "Masculino", nascimento: "01/12/1998", skills: { html: true, css: true, js: true } },
];

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

function permanent_storage_add_row()
{
  

}

function permanent_storage_remove_row()
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
  let nascimento = document.getElementById("nascimento").value.split('-').reverse().join('/');
  let sexo = document.getElementById("sexoMasculino").checked;
  let skillHtml = document.getElementById("skillHtml").checked;
  let skillCss = document.getElementById("skillCss").checked;
  let skillJs = document.getElementById("skillJs").checked;
  let skillBootstrap = document.getElementById("skillBootstrap").checked;
  
  // Fazer validações aqui
  
  // TODO(daniel): Adicionar alerta de usuário mais amigável e intuitivo.
  
  const CPF_SIZE = 11;
  const BR_PHONE_NUMBER_SIZE = 11;
  const DATE_SIZE = 10;
  const idade = nascimento.slice(-4);
  console.log(idade);
  console.log(sexo);
  
  if (cpf.length != CPF_SIZE) {
    show_custom_alert("CPF inválido.");
    return;
  }
  else if (nome.split(" ").lengh < 2) {
    show_custom_alert("Nome inválido.");
    return;
  }
  else if (celular.length != BR_PHONE_NUMBER_SIZE) {
    show_custom_alert("Número de celular inválido.");
    return;
  }
  // TODO(daniel): Fazer error checking de email mais sofisticado
  else if (!email.includes("@")) {
    show_custom_alert("Email inválido.");
    return;
  }
  else if (nascimento.length != DATE_SIZE) {
    show_custom_alert("Data inválida, usar este formato DD/MM/AAAA.");
    return;
  }
  else if (!sexo) {
    show_custom_alert("Sexo não selecionado.");
    return;
  }
  else if (!skillHtml && !skillCss && !skillJs && !skillBootstrap) {
    show_custom_alert("Você precisa informar no mínimo 1 habilidade.");
    return;
  }

  let is_valid = { fail: false, alert_msg: ""};
  if (!is_valid) { return; }

  // Fazer validações aqui

  candidato = {
    id: id!=''?id:new Date().getTime(),
    cpf: cpf,
    nome: nome,
    celular: celular,
    email: email,
    sexo: sexo?'Masculino':'Feminino',
    nascimento: nascimento,
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
    colunaCpf.setAttribute("id", "cpf-cell")
    let colunaNome = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaCelular = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaEmail = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaSexo = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaNascimento = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaSkills = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaEditar = document.createElement("td");
    //colunaCpf.setAttribute("id", "cpf-cell")
    let colunaRemover = document.createElement("td");
    
    $("#cpf-cell").mask("000.000.000-00");


    // Funcionalidades botão editar
    let botaoEditar = document.createElement("button");
    botaoEditar.innerHTML = 'Editar';
    botaoEditar.onclick = function () {
      console.log('editar');
      abrirModal(candidato);
    }

    // Funcionalidades botão remover
    let botaoRemover = document.createElement("button");
    botaoRemover.innerHTML = 'Remover';
    botaoRemover.onclick = function () {
      alert('Erro ao remover!');
    }

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
    colunaEditar.appendChild(botaoEditar);
    colunaRemover.appendChild(botaoRemover);

    linha.appendChild(colunaCpf);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCelular);
    linha.appendChild(colunaEmail);
    linha.appendChild(colunaSexo);
    linha.appendChild(colunaNascimento);
    linha.appendChild(colunaSkills);
    linha.appendChild(colunaEditar);
    linha.appendChild(colunaRemover);

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
