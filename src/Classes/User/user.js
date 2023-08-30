import app from "../../Firebase/firebaseConfig";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
} from 'firebase/firestore';

class Usuario {
    constructor(usuarioName, usuarioEmail, usuarioCPF, usuarioPassword) {
        this.name = usuarioName;
        this.email = usuarioEmail;
        this.cpf = usuarioCPF;
        this.password = usuarioPassword;
        this.auth = getAuth(app);
    }

    async setUser(cpf) {
        const db = getFirestore();
    
        const contaQuery = query(collection(db, 'user'), where('cpf', '==', cpf));
        const contaSnapshot = await getDocs(contaQuery);
    
        contaSnapshot.forEach((doc) => {
            const data = doc.data(); // Dados do documento
            const { name, cpf, email, password } = data; // Desestruturação dos dados
    
            // Inserir as informações no localStorage
            localStorage.setItem('conta', JSON.stringify({
                userName: name,
                userCPF: cpf,
                userEmail: email,
                userPassword: password
            }));
        });
    }      

    async getUsuario() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            return JSON.parse(storedUser);
        } else {
            return null;
        }
    }

    async VerificarUsuarioPorEmail(email) {
        const auth = getAuth();

        console.log(email)
        
        try {
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);
          return signInMethods.length > 0; // Retorna true se o e-mail já estiver cadastrado
        } catch (error) {
          console.error("Erro ao verificar e-mail:", error);
          return false;
        }
      }
    

    async LoginUsuario(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            this.user = userCredential.user;
    
            const dataBank = getFirestore(app);
            const userCollection = collection(dataBank, "user");
            const userQuery = query(userCollection, where("userEmail", "==", email));
            const querySnapshot = await getDocs(userQuery);
    
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
    
                localStorage.setItem('user', JSON.stringify({
                    email: userData.userEmail,
                    name: userData.userName,
                    cpf: userData.userCPF
                }));
            } else {
                console.error("Usuário não encontrado no Firestore");
                return false;
            }
    
            return true;
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            return false;
        }
    }
     

    async CreateUsuario(name, email, cpf, password) {
        if (!name || !email || !cpf || !password) {
            return 'Todos os campos devem estar preenchidos!';
        } else if(password.length < 6){
            return 'A senha deve possuir no mínimo 6 caracteres!'
        } else if(this.isValidCPF(cpf) === false) {
            return 'CPF informado é inválido!'
        } 
         else {
            try {

            const dataBank = getFirestore(app);
            const userCollection = collection(dataBank, 'user');
            
            // Verificar se o CPF já está cadastrado
            const cpfQuery = query(userCollection, where('userCPF', '==', cpf));
            const cpfQuerySnapshot = await getDocs(cpfQuery);
            if (!cpfQuerySnapshot.empty) {
                return 'CPF já está cadastrado!';
            }
            
            // Verificar se o e-mail já está cadastrado
            const emailQuery = query(userCollection, where('userEmail', '==', email));
            const emailQuerySnapshot = await getDocs(emailQuery);
            if (!emailQuerySnapshot.empty) {
                return 'E-mail já está cadastrado!';
            }

                const auth = getAuth(app);
                // Criar usuário de autenticação
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Novo usuário de autenticação criado:', user);
    
                // Inserir detalhes no Firestore
                const docRef = await addDoc(userCollection, {
                    userName: name,
                    userCPF: cpf,
                    userEmail: email,
                    userPassword: password
                });
    
                console.log('Detalhes do usuário inseridos no Firestore:', docRef.id);
    
                return 'Usuário criado com sucesso!';
            } catch (error) {
                console.error("Erro ao criar usuário:", error);
                return 'Erro ao criar usuário.';
            }
        }
    }
    
    isValidCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); 
        if (cpf.length !== 11) return false;
    
        if (/^(\d)\1+$/.test(cpf)) return false;
    
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
    
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
    
        if (remainder !== parseInt(cpf.charAt(9))) return false;
    
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
    
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
    
        if (remainder !== parseInt(cpf.charAt(10))) return false;
    
        return true;
    }
    
    
}

const usuarioLogado = new Usuario();

export { Usuario as default, usuarioLogado };
