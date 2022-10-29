import { useState, useEffect } from "react";
import { ImagesApi } from "../../api/ImagesApi";
import { PagesApi } from "../../api/PagesApi";
import { Form, Button, Card } from "react-bootstrap";
import CreatePageModal from "../../components/CreatePageModal";
import CreateImageModal from "../../components/CreateImageModal";

import { PageInterface } from "../../interfaces/Page";
import { ImageInterface } from "../../interfaces/Image";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function HomeView() {
  const [imagesData, setImagesData] = useState<ImageInterface[]>([]);
  const [pagesData, setPagesData] = useState<PageInterface[]>([]);
  const [createPageModalShow, setCreatePageModalShow] = useState(false);
  const [createImageModalShow, setCreateImageModalShow] = useState(false);
  const [viewContent, setViewContent] = useState("images");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const imagesApi = new ImagesApi();
  const pagesApi = new PagesApi();

  useEffect(() => {
    imagesApi
      .getAll()
      .then((response: ImageInterface[]) => setImagesData(response))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));

    pagesApi
      .getAll()
      .then((response: PageInterface[]) => setPagesData(response))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const handlePageCreation = (payload: PageInterface) => {
    pagesApi
      .create(payload)
      .then((response: PageInterface) => {
        payload.id = response.id;
        payload.created_at = response.created_at;
        alert("page created");
        setPagesData([...pagesData, payload]);
      })
      .catch((err) => {
        alert("cannot create the page");
        console.log(err);
      })
      .finally(() => {
        handleCreatePageModalClose();
      });
  };

  const handleImageCreation = (payload: ImageInterface) => {
    imagesApi
      .create(payload)
      .then((response: ImageInterface) => {
        payload.id = response.id;
        payload.created_at = response.created_at;
        alert("image created");
        setImagesData([...imagesData, payload]);
      })
      .catch((err) => {
        alert("cannot create the image");
        console.log(err);
      })
      .finally(() => {
        handleCreateImageModalClose();
      });
  };

  const handleImageDelete = (id: number) => {
    imagesApi
      .deleteById(id)
      .then(() => {
        alert("image deleted!");
        setImagesData(
          imagesData.filter((image: ImageInterface) => image.id !== id)
        );
      })
      .catch((err) => {
        alert(err.response.data.error_message);
      });
  };

  const handlePageDelete = (id: number) => {
    pagesApi
      .deleteById(id)
      .then(() => {
        alert("page deleted!");
        setPagesData(pagesData.filter((page: PageInterface) => page.id !== id));
      })
      .catch((err) => {
        alert(err.response.data.error_message);
      });
  };

  const handleCreatePageModalShow = () => setCreatePageModalShow(true);

  const handleCreatePageModalClose = () => setCreatePageModalShow(false);

  const handleCreateImageModalShow = () => setCreateImageModalShow(true);

  const handleCreateImageModalClose = () => setCreateImageModalShow(false);

  const uploadFile = (file: any) => {};

  return (
    <div className="centerDiv App">
      {loading && <div>Loading Data...</div>}
      {error && <div>{`Error while getting images - ${error}`}</div>}
      <div>
        <Form.Select
          onChange={(e) => setViewContent(e.target.value)}
          defaultValue="images"
          aria-label="Select data type"
        >
          <option value="images">Images</option>
          <option value="pages">Pages</option>
        </Form.Select>
      </div>
      {createPageModalShow && (
        <CreatePageModal
          handleCreatePageModalClose={handleCreatePageModalClose}
          images={imagesData}
          handlePageCreation={handlePageCreation}
        />
      )}

      {createImageModalShow && (
        <CreateImageModal
          handleCreateImageModalClose={handleCreateImageModalClose}
          handleImageCreation={handleImageCreation}
        />
      )}

      <div className="contentWrapper">
        {viewContent === "images" ? (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Upload new image</Card.Title>

              <Button onClick={handleCreateImageModalShow} variant="success">
                Upload
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Create new page</Card.Title>

              <Button onClick={handleCreatePageModalShow} variant="success">
                Create
              </Button>
            </Card.Body>
          </Card>
        )}

        {viewContent === "images" &&
          imagesData.length &&
          imagesData.map((image: ImageInterface) => (
            <Card key={image.id} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={image.url} />
              <Card.Body>
                <Card.Title>{image.name}</Card.Title>

                <Button
                  onClick={() => handleImageDelete(image.id!)}
                  variant="danger"
                >
                  Delete
                </Button>
                <a
                  href={`/images/${image.id}`}
                  className="btn btn-success"
                  role="button"
                >
                  View image
                </a>
              </Card.Body>
            </Card>
          ))}

        {viewContent === "pages" &&
          pagesData.length &&
          pagesData.map((page: PageInterface) => (
            <Card key={page.id} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{page.title || "No title"}</Card.Title>

                <Button
                  onClick={() => handlePageDelete(page.id!)}
                  variant="danger"
                >
                  Delete
                </Button>
                <a
                  href={`/pages/${page.id}`}
                  className="btn btn-success"
                  role="button"
                >
                  View page
                </a>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default HomeView;
