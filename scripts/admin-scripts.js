import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const loginForm = document.getElementById('login-form');
const projectForm = document.getElementById('new-project-form');
const projectList = document.getElementById('project-list');

// Login de administrador
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target[0].value;
  const password = e.target[1].value;

  try {
    // Firebase Authentication - Login com e-mail e senha
    const userCredential = await signInWithEmailAndPassword(window.firebase.auth, email, password);
    // Login bem-sucedido
    window.location.href = "dashboard.html"; // Redirecionar para o painel
  } catch (error) {
    // Tratar erro
    alert("Erro de autenticação: " + error.message);
  }
});

// Adicionar um novo projeto ao Firestore
projectForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const projectTitle = e.target[0].value;
  const projectImage = e.target[1].files[0];
  
  // Simulação de URL da imagem
  const imageUrl = URL.createObjectURL(projectImage);

  try {
    await addDoc(collection(window.firebase.db, "projects"), {
      title: projectTitle,
      imageUrl: imageUrl
    });

    alert("Projeto adicionado com sucesso!");
    e.target.reset(); // Limpar o formulário
    listProjects(); // Atualizar a lista de projetos
  } catch (error) {
    console.error("Erro ao adicionar projeto: ", error);
  }
});

// Listar projetos existentes
async function listProjects() {
  projectList.innerHTML = ''; // Limpar a lista existente
  const querySnapshot = await getDocs(collection(window.firebase.db, "projects"));
  
  querySnapshot.forEach((doc) => {
    const project = doc.data();
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <strong>${project.title}</strong>
      <img src="${project.imageUrl}" alt="${project.title}" style="width: 100px; height: auto;">
    `;
    projectList.appendChild(listItem);
  });
}

listProjects();
