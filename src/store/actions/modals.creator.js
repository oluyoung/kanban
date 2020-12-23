import * as actions from './constants';

export function getModalName(modalName) {
  return {
    type: actions.SET_MODAL_NAME,
    modalName
  };
}
