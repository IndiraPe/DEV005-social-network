/**
 * @jest-environment jsdom
 */
import * as FIREBASE from 'firebase/auth';
import Dashboard from '../../src/pages/Dashboard.js';
// import * as emailCutter from '../../src/pages/Dashboard.js';
import * as savePostF from '../../src/lib/Posts.js';
import { deletePost } from '../../src/lib/firebase.js';

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

jest.mock('../../src/lib/firebase.js');
jest.mock('firebase/auth');

describe('Dashboard', () => {
  it('Debería ser una función', () => {
    expect(typeof Dashboard).toBe('function');
  });
  it('Have a buttom', () => {
    FIREBASE.onAuthStateChanged.mockImplementation(() => {

    });
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    const haveAbutton = DOM.querySelector('#button-signOut');
    expect(haveAbutton).not.toBe(undefined);
  });
  test('After click button signOut return call function navigateTo', (done) => {
    FIREBASE.signOut.mockImplementation(() => Promise.resolve());
    const DOM = document.createElement('div');
    const navigateTo = jest.fn();
    DOM.append(Dashboard(navigateTo));
    const buttonSignOut = DOM.querySelector('#button-signOut');
    buttonSignOut.click();
    // expect(navigateTo).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(navigateTo).toHaveBeenLastCalledWith('/');
      done();
    }, 0);
  });
  test('snapshot of Dashboard', () => {
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    expect(DOM).toMatchSnapshot();
  });
  test.skip('After click "NO" Modal display change to none', () => {
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    const not = DOM.querySelector('#not');
    const myModal = DOM.querySelector('#myModal');
    not.click();
    expect(myModal.style.display).toBe('none');
  });
  it.skip('botón de borrar, debería eliminar post con click', (done) => {
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    // jest.spyOn(savePostF, 'savePostFire');
    const btnsDelete = DOM.querySelectorAll('.btn-delete');
    const myModal = DOM.querySelector('#myModal');
    const yes = DOM.querySelector('#yes');
    btnsDelete[0].click();
    expect(myModal.style.display).toBe('block');
    yes.click();
    expect(deletePost).toHaveBeenCalledTimes(1);
    done();
  });
  it('botón de postear, debería guardar post con click', (done) => {
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    jest.spyOn(savePostF, 'savePostFire');
    const btnPost = DOM.querySelector('#button-post');
    const postText = DOM.querySelector('#post-text');
    btnPost.click();
    expect(savePostF.savePostFire).toHaveBeenCalledWith(postText);
    done();
  });
  it('boton de postear debería avisar que se posteó con éxito', () => {
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    const btnPost = DOM.querySelector('#button-post');
    const msgPosT = DOM.querySelector('#msg-post');
    msgPosT.style.display = 'block';
    jest.useFakeTimers();
    btnPost.click();
    jest.advanceTimersByTime(2000);
    expect(msgPosT.style.display).toBe('none');
    jest.useRealTimers();
  });
  it('botón deberia editar al botón, textArea y mensaje ', () => {
    const DOM = document.createElement('div');
    DOM.append(Dashboard());
    const btnPost = DOM.querySelector('#button-post');
    const postText = DOM.querySelector('#post-text');
    const msgPosT = DOM.querySelector('#msg-post');
    jest.useFakeTimers();
    btnPost.click();
    expect(btnPost.innerHTML).toBe('Publicar');
    expect(postText.value).toBe('');
    expect(msgPosT.style.display).toBe('block');
    jest.advanceTimersByTime(3000);
    expect(msgPosT.style.display).toBe('none');
    jest.useRealTimers();
  });
});
