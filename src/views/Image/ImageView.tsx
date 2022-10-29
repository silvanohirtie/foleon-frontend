import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ImagesApi } from "../../api/ImagesApi";
import { Form, Button } from "react-bootstrap";
import { ImageInterface } from "../../interfaces/Image";

import "./style.css";
export default function ImageView() {
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [image, setImage] = useState<ImageInterface>({});
  const [error, setError] = useState(false);
  const imagesApi = new ImagesApi();
  const params = useParams() as any;
  const id = params.id;

  const confirmValues = () => {
    const payload: ImageInterface = {
      name: newName,
    };
    imagesApi
      .updateById(image.id!, payload)
      .then(() => {
        alert("Image Updated!");
        window.location.reload();
      })
      .catch((err) => {
        alert("Cannot update page");
      });
  };
  useEffect(() => {
    imagesApi
      .getById(id)
      .then((response: ImageInterface) => {
        setImage(response);
        setNewName(response.name!);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {!error && loading && <h1>Loading...</h1>}
      {error && <h1>Error getting the image...</h1>}
      {!error && image && (
        <div className="infoWrapper">
          <img src={image.url}></img>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Type image name..."
          ></input>
          <Button disabled={!newName} onClick={confirmValues} variant="primary">
            Update
          </Button>
        </div>
      )}
    </div>
  );
}
