import { vaca } from '../images.js';

const Home = (navigateTo) => {
  const viewHome = `
    <h1 id="tittleLogo">Frikis del Espacio</h1>
    <img id="logo" src= "${vaca}" alt="Imagen del logo "/>  
    <div id="btns">
      <button id="btn-login">Iniciar Sesión</button>
      <button id="btn-register">Registrarse</button>
    </div>
    `;

  const mainContainer = document.createElement('div');
  mainContainer.classList.add('main-container');
  mainContainer.innerHTML = viewHome;

  const btnLogin = mainContainer.querySelector('#btn-login');

  btnLogin.addEventListener('click', () => {
    navigateTo('/login');
  });
  const btnRegister = mainContainer.querySelector('#btn-register');
  btnRegister.addEventListener('click', () => {
    navigateTo('/register');
  });
  return mainContainer;
};
export default Home;
