import React, { useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  CardDeck,
  Col,
} from "react-bootstrap";
import movieAPI from "./api";
import MovieItem from "./components/MovieItem";
import { calcRows } from "./helpers/rowCalc";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [moviesCount, setMoviesCount] = useState(10);

  const getMoviesSearch = async (query) => {
    try {
      setIsLoading(true);
      const {data} = await movieAPI.get(`/search/movie`, {
        params: {
          query,
        },
      });

      setData(data);


      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      setError(err.response);
    }
  };

  const handleOnChange = (e) => setSearchQuery(e.target.value);

  const handleSearch = () => {
    if (searchQuery.length < 2) return null;

    getMoviesSearch(searchQuery);
  };

  const handleShowMore = () => {
    const { page, total_pages } = data;
  };

  const renderMovieList = () => {
    const rows = calcRows(data.results, 10);

    return (
      <Container>
        <div className="row">
          <CardDeck className="p-4">
            {data.results.map((movie) => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <MovieItem key={movie.id} movie={movie} />
              </Col>
            ))}
          </CardDeck>
        </div>
      </Container>
    );
  };

  return (
    <>
      <Navbar bg="dark justify-content-between" variant="dark">
        <Navbar.Brand>Simple App For Movies Search</Navbar.Brand>
        <Form inline>
          <FormControl
            onChange={handleOnChange}
            type="text"
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button onClick={handleSearch} variant="outline-info">
            Search
          </Button>
        </Form>
      </Navbar>
      {data && (
        <>
          {renderMovieList()}{" "}
          <button className="btn btn-primary">Show more</button>
        </>
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
    </>
  );
};

export default App;
