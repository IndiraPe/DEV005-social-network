import Footer from '../templates/Footer';

const Error404 = () => {
  const viewError = `
  <article id= "boxCointaing404">
    <img id="alien" src= "./img/404logo.png" alt="Imagen del Alien "/>
    <h1 id= "pageNotFoundText">Página no encontrada</h1>
    <img id="alien2" src= "./img/imgLuna.png" alt="Imagen del Alien con la Luna "/>     
  </article>
    `;
  // const root = document.getElementById('root');
  // root.innerHTML = viewError;
  const mainError = document.createElement('div');
  mainError.classList.add('main-error');
  mainError.innerHTML = viewError;
  const footer = document.querySelector('#footer');
  footer.innerHTML = Footer();
  return mainError;
};
export default Error404;
