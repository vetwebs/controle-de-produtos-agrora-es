//  BLOCO DE ADICIONAR E DELETAR
class Produto {
    //Produtos
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
        

    }
    //SALVAR
    salvar() {
       let produto = this.lerDados();

       if(this.validaCampos(produto)){
            if(this.editId == null){
                this.adicionar(produto);
            } else{
                this.atualizar(this.editId, produto);

            }
       }

       this.listaTabela();
       this.cancelar();
    }
    //lista
    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_ações= tr.insertCell();
            
            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preço;

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick" , "produto.prepararEdição("+JSON.stringify(this.arrayProdutos[i])+")")


            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png';
            imgDelete.setAttribute("onclick" , "produto.deletar("+this.arrayProdutos[i].id +")")





            td_ações.appendChild(imgEdit);
            td_ações.appendChild(imgDelete);



        }

    }
    //Adicionar
    adicionar(produto){
        produto.preço = parseFloat(produto.preço)

        this.arrayProdutos.push(produto);
        this.id++;

    }

    //atualizar
    atualizar(id, produto){
        for (let i = 0; i < this.arrayProdutos.length; i++){

            if(this.arrayProdutos [i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preço = produto.preço;
            }

        }
    }



    //Editar produto
    prepararEdição(dados){
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preço').value = dados.preço;

        document.getElementById('btn1').innerText = 'Atualizar'

    }

    //Lê os dados
    lerDados() {
        let produto = {}
        
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preço = document.getElementById('preço').value;
            
        return produto
    }

    validaCampos(produto){
        let msg = '';

        if(produto.nomeProduto == '') {
            msg += '- Informe o nome do produto \n';
        }
        if(produto.preço == '') {
            msg += '- Informe o preço do produto \n';
        }
        if(msg != ''){
            alert(msg);
            return false
        }
        return true;
    }
    //EXCLUIR
    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('preço').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;

       
    }
    //Função deletar
    deletar(id){

        if(confirm('Deseja deletar o ID' + id)){
            let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
        }
        
        console.log(this.arrayProdutos);

    }


}

var produto = new Produto();