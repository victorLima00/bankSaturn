import app from "../Firebase/firebaseConfig";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'

class Usuario {
    constructor(usuarioName, usuarioEmail, usuarioCPF, usuarioPassword){
        this.name = usuarioName
        this.email = usuarioEmail
        this.cpf = usuarioCPF
        this.password = usuarioPassword
    }

    getUsuario(){
        return {
            usuarioName: this.name,
            usuarioEmail: this.email,
            usuarioCPF: this.CPF,
            usuarioPassword: this.password
        }
    }

    async CreateUsuario(name, email, cpf, password) {
        if (!name || !email || !cpf || !password) {
            return 'Todos os campos devem estar preenchidos!';
        } else {
            console.log(name, email, cpf, password);
            const retorno = await this.DataBankFireCria(name, email, cpf, password);
            return retorno;
        }
    }
    
    

       // Função para cadastro no banco de dados Firestore
       async DataBankFireCria(userName, userEmail, userCPF, userPassword) {
        try {
            // Buscar os usuários no banco
            const dataBank = getFirestore(app)
            const userCollection = collection(dataBank, "user")

            // Verificar a existência
            // CPF
            const CPFQuery = query(userCollection, where("userCPF","==", userCPF))
            const CPFQuerySnapShot = await getDocs(CPFQuery)
            // email
            const emailQuery = query(userCollection, where("userEmail","==", userEmail))
            const emailQuerySnapShot = await getDocs(emailQuery)

            if(!CPFQuerySnapShot.empty) {
                let frase = 'CPF já existente na base de dados!'
                return(frase)
            } else if (!emailQuerySnapShot.empty) {
                let frase = 'e-mail já existente na base de dados!'
                return(frase)
            } else {
                const docRef = await addDoc(collection(dataBank,"user"), {userName, userCPF, userEmail, userPassword})
                let frase = 'Usuário Criado com sucesso!'
                return(frase)
            }
        } catch(error) {
            console.error("Erro ao inserir os dados:", error)
        }
    }

    LoginUsuario(){
        const retorno = this.DataBankFireVerifica(this.email, this.password)
        return retorno
    }

    // Função para cadastro no banco de dados Firestore
    async DataBankFireVerifica(userEmail, userPassword) {
        try {
            const dataBank = getFirestore(app)
            const userCollection = collection(dataBank, "user")
    
            const querySnapshot = await getDocs(userCollection)
    
            for (const doc of querySnapshot.docs) {
                const userData = doc.data()
                if (userData.email === userEmail && userData.password === userPassword) {
                    return true
                }
            }
    
            return false;
    
        } catch (error) {
            console.error("Erro ao encontrar os dados do usuário:", error)
            return false
        }
    }
 
}

export default Usuario;
