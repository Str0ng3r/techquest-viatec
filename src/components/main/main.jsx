import {
  Container,
  ListGroup,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import modalstyle from "../header/header.module.css";
import styles from "./main.module.css";
import del from "../../img/delete.png";
import edit from "../../img/edit.png";
import { setUpdateNotate } from "../../store/notationSlice";
export const Main = () => {
  const [tasks, setTasks] = useState([]);
  const notates = useSelector((state) => state.notations);
  const [currentId, setCurrentId] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const [currentDescription, setCurrentDescription] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);




  const editCardFunc = () => {
    const cardIndex = tasks.findIndex(el => el.id === currentId);



    if (currentName === null || currentName === "") {
      alert('Please write a name for the task');
      return;
    }

  
      const updatedCard = {
        name: currentName,
        description: currentDescription,
        status: currentStatus,
        id: currentId
      };



const updatedTasks = [
  ...tasks.slice(0, cardIndex),
  updatedCard,
  ...tasks.slice(cardIndex + 1)
];

dispatch(setUpdateNotate(updatedTasks))

handleCloseModal();
    }


  const modalFunction = (id) => {
    const curCard = tasks.find((el) => el.id === id);
    setCurrentId(curCard.id);
    setCurrentDescription(curCard.description);
    setCurrentName(curCard.name);
    setCurrentStatus(curCard.status);
    handleShowModal();
  };


  const dispatch = useDispatch();
  const deleteElement = (id) => {
    const updateArray = tasks.filter((el) => el.id !== id);
    dispatch(setUpdateNotate(updateArray));
  };

  useEffect(() => {
    setTasks(notates);
  }, [notates]);
  return (
    <Container>
      <ListGroup
        horizontal
        style={{
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {tasks.map((el) => (
          <ListGroup.Item key={el.id} className={styles.card_item}>
            <Card style={{ width: "18rem", paddingTop: "20px" }}>
              <Card.Body>
                <div className={styles.div_buttons}>
                  <button
                    className={styles.button_edit}
                    data-id={el.id}
                    onClick={(evt) => {
                      deleteElement(evt.currentTarget.dataset.id);
                    }}
                  >
                    <img
                      src={del}
                      alt="delete"
                      className={styles.img_service}
                    />
                  </button>
                  <button
                    className={styles.button_delete}
                    data-id={el.id}
                    onClick={(evt) => {
                      modalFunction(evt.currentTarget.dataset.id);
                    }}
                  >
                    <img src={edit} alt="edit" className={styles.img_service} />
                  </button>
                </div>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.description}</Card.Text>
                <div
                  className={
                    el.status === "Done"
                      ? styles.div_status_undeline_done
                      : styles.div_status_undeline_notdone
                  }
                ></div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={modalstyle.cont_form}>
            <label htmlFor="task" className={modalstyle.label_form}>
              Name task
              <input
                type="text"
                id="task"
                value={currentName}
                placeholder="call to Mom"
                className={modalstyle.input_form}
                onChange={(evt) => {
                  setCurrentName(evt.currentTarget.value);
                }}
              />
            </label>
            <label htmlFor="description" className={modalstyle.label_form}>
              Description
              <textarea
                name="desc"
                id="description"
                cols="60"
                value={currentDescription}
                rows="5"
                placeholder="In 16:00 call to my Mom"
                className={modalstyle.area_form}
                onChange={(evt) => {
                  setCurrentDescription(evt.currentTarget.value);
                }}
              ></textarea>
            </label>
            <label htmlFor="radio" className={modalstyle.label_form}>
              Status
              <div className={modalstyle.cont_form_status}>
                <Form.Check
                  type="radio"
                  id="radio"
                  name="status"
                  label="Done"
                  checked={currentStatus === "Done"} // Проверка на выбор Done
                  onChange={() => setCurrentStatus("Done")}
                />
                <Form.Check
                  type="radio"
                  id="radio"
                  name="status"
                  label="Not Done"
                  checked={currentStatus === "Not Done"}
                  onChange={() => setCurrentStatus("Not Done")}
                />
              </div>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary" onClick={editCardFunc}>Edit notate</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
