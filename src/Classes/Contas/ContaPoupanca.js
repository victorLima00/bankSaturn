import app from "../../Firebase/firebaseConfig";
import { getFirestore, collection, addDoc, query, where, getDocs, setDoc } from 'firebase/firestore'
import Contas from "./Contas";

class ContaPoupanca extends Contas {
    constructor(contanumero, agencia, saldo, name, email, cpf, password, tipoconta, credito, contatransfere, valor, tipotransferencia){
        super(contanumero, agencia, saldo, name, email, cpf, password)
        this.tipoconta = tipoconta = '02'
        this.credito = credito = ''
        this.jurostransferencia = '0.7'
        this.contatransfere = contatransfere
        this.valor = valor
        this.tipotransferencia = tipotransferencia
    }

    
    async setContaPoupanca(cpf) {
        const docSnapshot = await this.buscaConta(cpf);
        if (docSnapshot) {
          const novosDados = {
            tipoconta: this.tipoconta
          };
        
          try {
            const docRef = docSnapshot.ref; // Obter a referência do documento
            await setDoc(docRef, novosDados, { merge: true });
            console.log('Novo campo "tipoconta" adicionado com sucesso!');
          } catch (error) {
            console.error('Erro ao adicionar novo campo:', error);
          }
        }
    }

    async transfereContaPoupanca(tipotransferencia, cpf, contatransfere, valor) {
        //tipotransferencia = 1 - transferencia para mesma pessoa
        //tipotransferencia = 2 - TED
        //tipotransferencia = 3 - DOC
        //tipotransferencia = 4 - PIX

        if(tipotransferencia = '1'){
            const valoratual = this.buscaConta(cpf).docRef.valor
            if(valor > valoratual) {
                return('Você não possue saldo o suficiente para realizar a transferência!')
            } else {
                const valoratualtransf = this.buscaConta(contatransfere).docRef.valor
                var valorcalculado = valoratualtransf + valor
                this.buscaConta(contatransfere).docRef.update({valor: valorcalculado})
                return('Transferência de ${valor} reais realizada com sucesso!')
            }
        }
        else if(tipotransferencia = '2') {
            const valoratual = this.buscaConta(cpf).docRef.valor
            if(valor > valoratual) {
                return('Você não possue saldo o suficiente para realizar a transferência!')
            } else {
                const valoratualtransf = this.buscaConta(contatransfere).docRef.valor
                var valorcalculado = valoratualtransf + valor
                this.buscaConta(contatransfere).docRef.update({valor: valorcalculado})
                return('Transferência de ${valor} reais realizada com sucesso!')
            }
        }
        else if(tipotransferencia = '3'){
            const valoratual = this.buscaConta(cpf).docRef.valor
            if(valor > valoratual) {
                return('Você não possue saldo o suficiente para realizar a transferência!')
            } else {
                const valoratualtransf = this.buscaConta(contatransfere).docRef.valor
                var valorcalculado = valoratualtransf + valor
                this.buscaConta(contatransfere).docRef.update({valor: valorcalculado})
                return('Transferência de ${valor} reais realizada com sucesso!')
            }
        }
        else if(tipotransferencia = '4'){
            const valoratual = this.buscaConta(cpf).docRef.valor
            if(valor > valoratual) {
                return('Você não possue saldo o suficiente para realizar a transferência!')
            } else {
                const valoratualtransf = this.buscaConta(contatransfere).docRef.valor
                var valorcalculado = valoratualtransf + valor
                this.buscaConta(contatransfere).docRef.update({valor: valorcalculado})
                return('Transferência de ${valor} reais realizada com sucesso!')
            }
        }

    }


}

export default ContaPoupanca;
