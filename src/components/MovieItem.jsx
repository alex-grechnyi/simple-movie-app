import React from "react";
import { Card } from "react-bootstrap";

const MovieItem = ({ movie }) => {
  const { poster_path, original_title, overview, popularity } = movie;

  const renderOvierview = () =>
    overview.length > 50 ? `${overview.substring(0, 50)} ...` : overview;

  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={`${process.env.REACT_APP_IMG_URL}w342${poster_path}`}
        className="mh-50"
      />
      <Card.Body>
        <Card.Title>{original_title}</Card.Title>
        <Card.Text>{renderOvierview()}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Popularity: {popularity}</small>
      </Card.Footer>
    </Card>
  );
};

export default MovieItem;
