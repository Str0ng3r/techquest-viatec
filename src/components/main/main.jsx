import { Container, ListGroup, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from './main.module.css';

export const Main = () => {
  const [tasks, setTasks] = useState([]);
  const notates = useSelector((state) => state.notations);

  useEffect(() => {
    setTasks(notates);
    console.log(notates);
  }, [notates]);
  return (
    <Container>
      <ListGroup horizontal style={{flexWrap:'wrap',gap:'10px',alignItems:'center',justifyContent:'center'}}>
        {tasks.map((el) => (
          <ListGroup.Item key={el.id} className={styles.card_item}>
            <Card style={{ width: "18rem" }} >
              <Card.Body>
                <div>
                    <button className={styles.button_edit}></button>
                    <button className={styles.button_delete}></button>
                </div>
                <Card.Title>{el.name}</Card.Title>
                <Card.Text>{el.description}</Card.Text>
            <div className={el.status === "Done" ? styles.div_status_undeline_done : styles.div_status_undeline_notdone}></div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
