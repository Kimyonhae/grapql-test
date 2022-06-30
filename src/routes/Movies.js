import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query{
    AllMovies {
      id
      title
      overview
    }    
  }
`;

function Movies(){
  const {data,loading,error} = useQuery(ALL_MOVIES);
  if(loading){
    return <h1>Loading...</h1>
  }
  if(error){
    return <h1>fetch is cancel... ㅠㅠㅠ :(</h1>
  }
  return <ul>
      {data.AllMovies.map((movie) => 
      <li key={movie.id}>
        <Link to={`/movies/${movie.id}`}>
        {movie.title}
        </Link>
        </li>)}
  </ul>
}
export default Movies;