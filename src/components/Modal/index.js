import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const Container = styled.div`
  background-color: #f1f4f5;
`;
const Header = styled.div``;
const Title = styled.h1``;
const DescriptionContainer = styled.div``;
const DescriptionBox = styled.textarea``;
const Buttons = styled.div``
const Save = styled.button``;
const Cancel = styled.button``;
const Close = styled.a``;

function Modal(props) {
  // task
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [description, setDescription] = React.useState('');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal">
        <Container>
          <Header>
            <Title>{props.task.title}</Title>
          </Header>
          <Close onClick={closeModal}>X</Close>
          <DescriptionContainer>
            <h4>Description</h4>          
            <DescriptionBox
              placeholder="Add a more detailed description..."
              value={description}
              onChange={event => setDescription(event.target.value)}>
            </DescriptionBox>
            <Buttons>
              <Save>Save</Save>
              <Cancel>Cancel</Cancel>
            </Buttons>  
          </DescriptionContainer>
        </Container>
    </Modal>
  );
}

export default Modal;
