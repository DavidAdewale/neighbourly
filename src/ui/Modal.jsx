import { styled } from 'styled-components';
import { createPortal } from 'react-dom';
import { cloneElement, createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

import { useOutsideClick } from '../hooks/useOutsideClick';

const overlayVariants = {
  init: { opacity: 0 },
  animate: { opacity: 1 },
};

const windowVariants = {
  init: { opacity: 0 },
  animate: { opacity: 1 },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-overlay);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
    rgba(0, 0, 0, 0.05) 0px 5px 10px;
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-form-btn);
  border-radius: 0.8rem;
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-danger);
  }

  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay variants={overlayVariants} initial="init" animate="animate">
      <StyledModal variants={windowVariants} ref={ref}>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
