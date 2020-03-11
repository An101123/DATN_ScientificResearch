import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const ModalConfirm = ({ isShowModal, clickOk, toggleModal }) => {
  return (
    <div>
      <Modal isOpen={isShowModal} toggle={toggleModal}>
        <ModalBody>Are you sure you want to delete this field?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={clickOk}>
            Ok
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
