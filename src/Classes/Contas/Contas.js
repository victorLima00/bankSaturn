import app from "../../Firebase/firebaseConfig";
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import Usuario from "../../Classes/User/user"; // Importa a classe Usuario

class Contas extends Usuario { // Estende a classe Usuario
    constructor(contanumero, agencia, saldo){
        super(); // Chama o construtor da classe Usuario
        this.contanumero = contanumero;
        this.agencia = agencia || '0001';
        this.saldo = saldo || '0';
        this.valor = '0';
    }
    
      async setConta(cpf) {
        const db = getFirestore();
    
        const contaQuery = query(collection(db, 'contas'), where('cpf', '==', cpf));
        const contaSnapshot = await getDocs(contaQuery);
    
        if (contaSnapshot.size === 0) {
          this.contanumero = '000001';
        } else {
          let maxNumero = 0;
          contaSnapshot.forEach((doc) => {
            const numero = parseInt(doc.data().contanumero, 10);
            if (numero > maxNumero) {
              maxNumero = numero;
            }
          });
    
          this.contanumero = (maxNumero + 1).toString().padStart(6, '0');
        }
    
        await addDoc(collection(db, 'contas'), {
          cpf: cpf,
          contanumero: this.contanumero,
          agencia: this.agencia,
          saldo: this.saldo,
        });

        localStorage.setItem('conta', JSON.stringify({
          cpf: this.cpf,
          contanumero: this.contanumero,
          agencia: this.agencia,
          saldo: this.saldo,
        }));

      }    

      async getConta(cpf) {
        const conta = await this.buscaConta(cpf);
      
        if (conta) {
          return conta.data();
        } else {
          return null;
        }
      }
      

      async buscaConta(cpf) {
        const db = getFirestore();
        const collectionName = 'contas';
        const campoBusca = 'cpf';
        const valorCampoBusca = cpf;
      
        try {
          const contaQuery = query(collection(db, collectionName), where(campoBusca, '==', valorCampoBusca));
          const contaSnapshot = await getDocs(contaQuery);

          if (!contaSnapshot.empty) {
            let encontrado = null; // Armazenar o documento encontrado
      
            contaSnapshot.forEach((doc) => {
              encontrado = doc; // Armazenar o valor do documento
            });
      
            return encontrado; // Retornar o documento encontrado após o loop
          } else {
            console.log('Nenhum documento encontrado com o valor fornecido.');
            return null;
          }
        } catch (error) {
          console.error('Erro ao buscar e atualizar o documento:', error);
          return null;
        }
      }
      

      async depositaConta(cpf, valor) {
        const docSnapshot = await this.buscaConta(cpf);
    
        if (docSnapshot.exists()) { // Verifica se o documento existe
            const saldoatual = docSnapshot.data().saldo;
            const saldoatualizado = parseFloat(valor) + parseFloat(saldoatual);
    
            const novosDados = {
                saldo: saldoatualizado
            };
    
            await updateDoc(docSnapshot.ref, novosDados);
            console.log('Saldo atualizado com sucesso!');
        }
    }
    
    
      
      
      async saqueConta(cpf, valor){
        const docRef = await this.buscaConta(cpf);
        if (docRef) {
          const saldoatual = docRef.saldo;
          if(valor > saldoatual){
            return('Você não possui saldo suficiente para realizar o saque!');
          } else {
            var saldoatualizado = saldoatual - valor;

            const novosDados = {
              saldo: saldoatualizado
            };

            await updateDoc(docRef, novosDados);
            return(`Saque realizado, ${valor} retirado do saldo total!`);
          }
        } else {
          return 'Erro ao buscar a conta.';
        }
      }
      
}

export default Contas;
