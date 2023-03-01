import React, { useEffect, useCallback } from 'react';
import c from './Modal.module.css';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/todoSlice';

const modalRoot = document.querySelector('#modal');

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const handleCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      return handleClose();
    }
  };

  const handleClose = useCallback(() => {
    dispatch(toggleModal());
  }, [dispatch]);

  useEffect(() => {
    const closeModalByEscape = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', closeModalByEscape);
    return () => {
      window.removeEventListener('keydown', closeModalByEscape);
    };
  }, [handleClose]);

  return createPortal(
    <div className={c.Overlay} onClick={handleCloseBackdrop}>
      <div className={c.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
