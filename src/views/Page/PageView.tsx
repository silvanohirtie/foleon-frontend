import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImagesApi } from "../../api/ImagesApi";
import { PagesApi } from "../../api/PagesApi";
import { Form, Button } from "react-bootstrap";
import { PageInterface } from "../../interfaces/Page";
import { ImageInterface } from "../../interfaces/Image";

import "./style.css";
export default function PageView() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<PageInterface>({});
  const [images, setImages] = useState<ImageInterface[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [newTitle, setNewTitle] = useState<string | null>(null);
  const [newParagraph, setNewParagraph] = useState<string | null>(null);
  const [newQuote, setNewQuote] = useState<string | null>(null);
  const [newImageId, setNewImageId] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const imagesApi = new ImagesApi();
  const pagesApi = new PagesApi();
  const params = useParams() as any;
  const id = params.id;

  useEffect(() => {
    pagesApi
      .getById(id)
      .then((response: PageInterface) => {
        setPage(response);
        setNewTitle(response.title!);
        setNewParagraph(response.paragraph!);
        setNewQuote(response.quote!);
        setNewImageId(response.image_id!);
        imagesApi.getAll().then((response) => {
          setImages(response);
        });
        if (response.image_id)
          imagesApi
            .getById(response.image_id)
            .then((response) => setImageUrl(response.url));
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const makeOption = function (image: ImageInterface) {
    return (
      <option key={image.id} value={image.id}>
        {image.name}
      </option>
    );
  };

  const confirmValues = function () {
    const payload: PageInterface = {
      title: newTitle || null,
      paragraph: newParagraph || null,
      quote: newQuote || null,
      image_id: newImageId || null,
    };
    pagesApi
      .update(page.id!, payload)
      .then(() => {
        alert("Page Updated!");
        window.location.reload();
      })
      .catch((err) => {
        alert("Cannot update page");
      });
  };
  return (
    <div className="root">
      {!error && loading && <div>Loading...</div>}
      {error && <h1>Error getting the page...</h1>}
      {!error && page && (
        <div className="infoWrapper">
          <input
            className="title"
            onChange={(e: any) => setNewTitle(e.target.value)}
            value={newTitle || ""}
            placeholder="Insert Title..."
            type="text"
          ></input>
          <input
            className="paragraph"
            onChange={(e: any) => setNewParagraph(e.target.value)}
            value={newParagraph || ""}
            placeholder="Insert Paragraph..."
            type="text"
          ></input>
          {imageUrl ? (
            <img src={imageUrl}></img>
          ) : (
            <h4 style={{ color: "red" }}>Missing/Invalid image</h4>
          )}
          <input
            className="quote"
            onChange={(e: any) => setNewQuote(e.target.value)}
            value={newQuote || ""}
            placeholder="Insert Quote..."
            type="text"
          ></input>
          <Form.Label htmlFor="image">Change Image</Form.Label>
          <Form.Select
            value={newImageId || "null"}
            onChange={(e) => setNewImageId(parseInt(e.target.value))}
            id="image"
            aria-label="Default select example"
          >
            <option value="null">No image</option>

            {images && images.map(makeOption)}
          </Form.Select>

          <Button onClick={confirmValues} variant="primary">
            Update
          </Button>
        </div>
      )}
    </div>
  );
}
