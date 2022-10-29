import { useState } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { PageInterface } from "../interfaces/Page";
import { ImageInterface } from "../interfaces/Image";
export default function CratePageModal({
  handleCreatePageModalClose,
  images,
  handlePageCreation,
}: any) {
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [quote, setQuote] = useState("");
  const [imageId, setImageId] = useState("");

  const makeOption = function (image: ImageInterface) {
    return (
      <option key={image.id} value={image.id}>
        {image.name}
      </option>
    );
  };

  const confirmValues = () => {
    const payload: PageInterface = {
      title: title || null,
      paragraph: paragraph || null,
      quote: quote || null,
      image_id: isNaN(parseInt(imageId)) ? null : parseInt(imageId),
    };
    handlePageCreation(payload);
  };
  return (
    <Modal show={true} animation={true}>
      <Modal.Header>
        <Modal.Title>Create Page</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label htmlFor="title">Title</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            aria-describedby="title-input"
          />
        </InputGroup>
        <Form.Label htmlFor="paragraph">Paragraph</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            id="paragraph"
            aria-describedby="paragraph-input"
          />
        </InputGroup>
        <Form.Label htmlFor="quote">Quote</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            id="quote"
            aria-describedby="quote-input"
          />
        </InputGroup>
        <Form.Label htmlFor="image">Image</Form.Label>
        <Form.Select
          value={imageId}
          onChange={(e) => setImageId(e.target.value)}
          id="image"
          aria-label="Default select example"
        >
          <option value="null">No image</option>
          {images && images.map(makeOption)}
        </Form.Select>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCreatePageModalClose} variant="secondary">
          Close
        </Button>
        <Button onClick={confirmValues} variant="primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
