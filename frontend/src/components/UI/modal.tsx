import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { setUserName } from "../../redux/features/canvasSlice";
import { useRef, useState } from "react";

function MyModal() {
  const [showModal, setShowModal] = useState<boolean>(true);
  const nameRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleCLick = () => {
    dispatch(setUserName(nameRef.current?.value));
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={() => {}}>
      <Modal.Header>
        <Modal.Title>Enter your name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input type="text" ref={nameRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            handleCLick();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
