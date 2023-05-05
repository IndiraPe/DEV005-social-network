/**
 * @jest-environment jsdom
 */
import Login from '../../src/pages/Login.js';
import * as lgnGoogle from '../../src/lib/LoginGoogle.js';
import * as btnLogin from '../../src/lib/LoginEmail.js';

jest.mock('../../src/images.js', () => ({
  logo404: '',
  luna: '',
  vaca: '',
  goog: '',
  gg: '',
  vaca2: '',
  alien: '',
  ovni: '',
  github: '',
}));

describe('Login', () => {
  it('Debería ser una función', () => {
    expect(typeof Login).toBe('function');
  });

  it('Debería ser un botón', () => {
    const DOM = document.createElement('div');
    DOM.append(Login());
    const haveAButton = DOM.querySelector('#button-google');
    expect(haveAButton).not.toBe(undefined);
  });

  it('Debería existir una etiqueta i', () => {
    const DOM = document.createElement('div');
    DOM.append(Login());
    const haveAtagI = DOM.querySelector('i');
    expect(haveAtagI).not.toBe(undefined);
  });

  it('Icon debería cambiar de clase al dar click', (done) => {
    const DOM = document.createElement('div');
    DOM.append(Login());
    const iconEye = DOM.querySelector('.icon-eye');
    const icon = DOM.querySelector('i');
    iconEye.click();
    setTimeout(() => {
      expect(icon.classList.contains('fa-eye')).toBe(true);
      done();
    }, 0);
  });

  it('span debería cambiar el tipo del input con click', () => {
    const DOM = document.createElement('div');
    DOM.append(Login());
    const iconEye = DOM.querySelector('.icon-eye');
    const password = DOM.querySelector('#password');
    iconEye.click();
    expect(password.type).toBe('text');
    iconEye.click();
    expect(password.type).toBe('password');
  });

  it('El botón de login debería lanzar un error, si los input están vacíos', () => {
    const DOM = document.createElement('div');
    DOM.append(Login());
    const mail = DOM.querySelector('#mail');
    const password = DOM.querySelector('#password');
    const buttonLog = DOM.querySelector('#button-login');
    const errorEmail = DOM.querySelector('#errorEmail');
    const errorPassword = DOM.querySelector('#errorPassword');
    mail.value = '';
    password.value = '';
    buttonLog.click();
    expect(errorEmail.style.visibility).toBe('visible');
    expect(errorPassword.style.visibility).toBe('visible');
    expect(errorEmail.textContent).toBe('Es un campo obligatorio');
    expect(errorPassword.textContent).toBe('Es un campo obligatorio');
  });

  it('Los mensajes de error deberían desaparecer a los 5 segundos', () => {
    const DOM = document.createElement('div');
    DOM.append(Login());
    const buttonLog = DOM.querySelector('#button-login');
    const errorEmail = DOM.querySelector('#errorEmail');
    const errorPassword = DOM.querySelector('#errorPassword');
    jest.useFakeTimers();
    buttonLog.click();
    jest.advanceTimersByTime(5000);
    expect(errorEmail.style.visibility).toBe('hidden');
    expect(errorPassword.style.visibility).toBe('hidden');
    jest.useRealTimers();
  });

  it('Debería navegar a dashboard con click en botón', (done) => {
    const navigateTo = jest.fn();
    jest.spyOn(btnLogin, 'buttonLogin').mockImplementation(() => Promise.resolve({ nameUser: 'nombreee' }));
    const DOM = document.createElement('div');
    DOM.append(Login(navigateTo));
    const buttonLog = DOM.querySelector('#button-login');
    buttonLog.click();
    expect(btnLogin.buttonLogin).toHaveBeenCalled();
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledWith('/dashboard');
      done();
    }, 0);
  });

  it('Función de login con google, debería ser llamado con 2 argumentos', () => {
    const DOM = document.createElement('div');
    jest.spyOn(lgnGoogle, 'buttonLoginG');
    const navigateTo = jest.fn();
    DOM.append(Login(navigateTo));
    const btnGoogle = DOM.querySelector('#button-google');
    expect(lgnGoogle.buttonLoginG).toHaveBeenCalledWith(btnGoogle, navigateTo);
  });
});
