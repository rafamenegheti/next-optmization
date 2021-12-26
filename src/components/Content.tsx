import { MovieCard } from "./MovieCard";
import { List, ListRowRenderer } from "react-virtualized";
import React, { useEffect, useState } from "react";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  };

  movies: Movies[];
}

interface Movies {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const [newMovies, setNewMovies] = useState<Movies[][]>([]);

  const CARDS_PER_ROW = 3;

  function numberOfRows(cardsPerRow: number) {
    return Math.ceil(movies.length / cardsPerRow);
  }

  const rows = numberOfRows(CARDS_PER_ROW)

  function restCeil(cardsPerRow: number) {
    console.log(movies.length % cardsPerRow);
  }

  function concatArrays(cardsPerRow: number) {
    let newArray = [];
    for (let i = 0; i < movies.length; i += 3) {
      let tempArray = [];
      movies[i] && tempArray.push(movies[i]);
      movies[i + 1] && tempArray.push(movies[i + 1]);
      movies[i + 2] && tempArray.push(movies[i + 2]);
      newArray.push(tempArray);
    }
    setNewMovies(newArray);
  }

  useEffect(() => {
    concatArrays(CARDS_PER_ROW);
  }, [movies]);

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    console.log(index);
    console.log(newMovies);

    return (
      <div key={key} style={style} >
        <div className="movies-list">
          {newMovies[index]?.map((movie) => {
            return(
            <MovieCard
              key={Math.random()}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
            )
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>

          {newMovies && (
            <List
              height={2000}
              rowHeight={400}
              width={900}
              overscanRowCount={5}
              rowCount={rows}
              rowRenderer={rowRenderer}
            />
          )}

      </main>
    </div>
  );
}
