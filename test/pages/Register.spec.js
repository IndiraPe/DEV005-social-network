/**
 * @jest-environment jsdom
 */
import Register from '../../src/pages/Register.js';
import * as lgnGoogle from '../../src/lib/LoginGoogle.js';
import * as btnRegis from '../../src/lib/RegisterEmail.js';

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

describe('Register', () => {
  it('Debería ser una función', () => {
    expect(typeof Register).toBe('function');
  });

  it('Debería ser un botón', () => {
    const DOM = document.createElement('div');
    DOM.append(Register());
    const btnGoogle = DOM.querySelector('.btnG');
    expect(btnGoogle).not.toBe(undefined);
  });

  it('Debería existir una etiqueta i', () => {
    const DOM = document.createElement('div');
    DOM.append(Register());
    const icon = DOM.querySelector('i');
    expect(icon).not.toBe(undefined);
  });

  it('Icon debería cambiar de clase al dar click', () => {
    const DOM = document.createElement('div');
    DOM.append(Register());
    const iconEye = DOM.querySelector('.icon-eye');
    const icon = DOM.querySelector('i');
    iconEye.click();
    expect(icon.classList.contains('fa-eye')).toBe(true);
  });

  it('span debería cambiar el tipo del input con click', () => {
    const DOM = document.createElement('div');
    DOM.append(Register());
    const iconEye = DOM.querySelector('.icon-eye');
    const inputPassword = DOM.querySelector('#inputPassword');
    iconEye.click();
    expect(inputPassword.type).toBe('text');
    iconEye.click();
    expect(inputPassword.type).toBe('password');
  });

  it('El botón de register debería lanzar un error, si los input están vacíos', () => {
    const DOM = document.createElement('div');
    DOM.append(Register());
    const inputEmail = DOM.querySelector('#inputEmail');
    const inputPassword = DOM.querySelector('#inputPassword');
    const btnRegister = DOM.querySelector('.btnRegister');
    const errorEmail = DOM.querySelector('#errorEmail');
    const errorPassword = DOM.querySelector('#errorPassword');
    inputEmail.value = '';
    inputPassword.value = '';
    btnRegister.click();
    expect(errorEmail.style.visibility).toBe('visible');
    expect(errorPassword.style.visibility).toBe('visible');
    expect(errorEmail.textContent).toBe('Es un campo obligatorio');
    expect(errorPassword.textContent).toBe('Es un campo obligatorio');
  });

  it('Los mensajes de error deberían desaparecer a los 5 segundos', () => {
    const DOM = document.createElement('div');
    DOM.append(Register());
    const btnRegister = DOM.querySelector('.btnRegister');
    const errorEmail = DOM.querySelector('#errorEmail');
    const errorPassword = DOM.querySelector('#errorPassword');
    jest.useFakeTimers();
    btnRegister.click();
    jest.advanceTimersByTime(5000);
    expect(errorEmail.style.visibility).toBe('hidden');
    expect(errorPassword.style.visibility).toBe('hidden');
    jest.useRealTimers();
  });

  it('Debería navegar a dashboard con click en botón', (done) => {
    const navigateTo = jest.fn();
    jest.spyOn(btnRegis, 'buttonRegister').mockImplementation(() => Promise.resolve({ nameUser: 'nombreee' }));
    const DOM = document.createElement('div');
    DOM.append(Register(navigateTo));
    const btnRegister = DOM.querySelector('.btnRegister');
    btnRegister.click();
    expect(btnRegis.buttonRegister).toHaveBeenCalled();
    setTimeout(() => {
      expect(navigateTo).toHaveBeenCalledWith('/dashboard');
      done();
    }, 0);
  });

  it('Función de login con google, debería ser llamado con 2 argumentos', () => {
    const DOM = document.createElement('div');
    jest.spyOn(lgnGoogle, 'buttonLoginG');
    const navigateTo = jest.fn();
    DOM.append(Register(navigateTo));
    const btnGoogle = DOM.querySelector('.btnG');
    expect(lgnGoogle.buttonLoginG).toHaveBeenCalledWith(btnGoogle, navigateTo);
  });
});
