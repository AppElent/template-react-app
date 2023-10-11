import { useState } from 'react';

const useModal = (initialMode = false, initialData) => {
  const [modalOpen, setModalOpen] = useState(initialMode);
  const [data, setData] = useState(initialData);
  const setModalState = (state) => {
    setModalOpen(state);
    if (state === false) {
      setData(undefined);
    }
  };
  return {
    modalOpen,
    data,
    setData,
    setModalState,
  };
};

export default useModal;
