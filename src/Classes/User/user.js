import app from "../../Firebase/firebaseConfig";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
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

    async getUsuario() {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            return JSON.parse(storedUser);
        } else {
            return null;
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
        } else {
            try {
                const auth = getAuth(app);
                // Criar usuário de autenticação
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log('Novo usuário de autenticação criado:', user);
    
                // Inserir detalhes no Firestore
                const dataBank = getFirestore(app);
                const userCollection = collection(dataBank, "user");
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
    
    
}

const usuarioLogado = new Usuario();

export { Usuario as default, usuarioLogado };
