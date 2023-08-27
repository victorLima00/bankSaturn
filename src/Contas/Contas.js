import app from "../Firebase/firebaseConfig";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import Usuario from "../User/user";

class Contas extends Usuario {
    constructor(contanumero, agencia, saldo, name, email, cpf, password){
        super(name, email, cpf, password)
        this.contanumero = contanumero
        this.agencia = agencia = '0001'
        this.saldo = saldo = '0'
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
      }    

      async getConta(cpf) {
        const db = getFirestore();
    
        const contaQuery = query(collection(db, 'contas'), where('cpf', '==', cpf));
        const contaSnapshot = await getDocs(contaQuery);
    
        if (contaSnapshot.size === 0) {
          return null;
        } else {
          const contaData = contaSnapshot.docs[0].data();
          return {
            contanumero: contaData.contanumero,
            agencia: contaData.agencia,
            saldo: contaData.saldo,
          };
        }
      }
 
}

export default Contas;
