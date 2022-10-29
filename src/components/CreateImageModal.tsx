import { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";

import { ImageInterface } from "../interfaces/Image";

export default function CreateImageModal({
  handleCreateImageModalClose,
  handleImageCreation,
}: any) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const confirmValues = () => {
    const payload: ImageInterface = {
      name,
      url,
    };
    handleImageCreation(payload);
  };
  return (
    <Modal show={true} animation={true}>
      <Modal.Header>
        <Modal.Title>Create Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="title">Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="title"
            aria-describedby="title-input"
          />
        </InputGroup>
        <Form.Label htmlFor="paragraph">Url</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            id="paragraph"
            aria-describedby="paragraph-input"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCreateImageModalClose} variant="secondary">
          Close
        </Button>
        <Button
          disabled={!name || !url}
          onClick={confirmValues}
          variant="primary"
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
