import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Navbar, Container, Button, Image, Form } from "react-bootstrap";
import logo from "../../img/3889855_20230428145240.png";
import { useState } from "react";
import styles from "./header.module.css";
import { useDispatch } from "react-redux";
import { setNotate } from "../../store/notationSlice";
import { nanoid } from "nanoid";

export const Header = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [nameTask, setNameTask] = useState(null);
  const [description, setDescription] = useState(null);
  const [status, setStatus] = useState(null);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Image src={logo} alt="LOGO" fluid></Image>
        </Navbar.Brand>
        <Button
          variant="success"
          style={{ marginLeft: "50px" }}
          onClick={handleShowModal}
          size="lg"
        >
          Add Notate
        </Button>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>New notate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.cont_form}>
            <label htmlFor="task" className={styles.label_form}>
              Name task
              <input
                type="text"
                id="task"
                placeholder="call to Mom"
                className={styles.input_form}
                onChange={(evt) => {
                  setNameTask(evt.currentTarget.value);
                }}
              />
            </label>
            <label htmlFor="description" className={styles.label_form}>
              Description
              <textarea
                name="desc"
                id="description"
                cols="50"
                rows="5"
                placeholder="In 16:00 call to my Mom"
                className={styles.area_form}
                onChange={(evt) => {
                  setDescription(evt.currentTarget.value);
                }}
              ></textarea>
            </label>
            <label htmlFor="radio" className={styles.label_form}>
              Status
              <div className={styles.cont_form_status}>
                <Form.Check
                  type="radio"
                  id="radio"
                  name="status"
                  label="Done"
                  checked={status === "Done"}
                  onChange={() => setStatus("Done")}
                />
                <Form.Check
                  type="radio"
                  id="radio"
                  name="status"
                  label="Not Done"
                  checked={status === "Not Done"}
                  onChange={() => setStatus("Not Done")}
                />
              </div>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModal();
              setDescription(null);
              setNameTask(null);
              setStatus(null);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (nameTask === null || nameTask === "") {
                alert("Please write a name for the task");
                return;
              }
              if (status === "" || status === null) {
                alert("Plz choose status");
                return;
              }

              dispatch(
                setNotate({
                  name: nameTask,
                  description,
                  status,
                  id: nanoid(),
                })
              );

              handleCloseModal();
              setDescription(null);
              setNameTask(null);
              setStatus(null);
            }}
          >
            Add notate
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};
