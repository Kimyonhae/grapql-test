import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DETAIL_MOVIE = gql`
    query getMovie($movieId : String!){
        Movie(id : $movieId){
            title
            overview
            backdrop_path
            isLiked @client
        }
    }
`;
function Movie(){
    const {id} = useParams();
    const history = useNavigate();
    const client = useApolloClient();
    const {data,loading} = useQuery(DETAIL_MOVIE,{
        variables : {
            movieId : id,
        }
    })
    if(loading){
        return <h1>Fetching ...</h1>
    }
    const BackEventClick = () => {
        history(`/`);
    }
    const onClickhandle = () => {
        client.cache.writeFragment({
            id :`Movie:${id}`,
            fragment : gql`
            fragment MovieFragment on Movie{
                    isLiked
                }
            `,
            data : {
                Movie : {
                    isLiked : true,
                }
            }
        })
    };
    return(
    <>
        <h1>{data.Movie.title}</h1>
        <div>
            <img src={`https://image.tmdb.org/t/p/w300/${data.Movie.backdrop_path}`}/>
            <p>{data.Movie.overview}</p>
            <span onClick={onClickhandle}>{data.Movie.isLiked ? "unLiked..😭" : "Liked! 😍"}</span>
        </div>
        <button onClick={BackEventClick}>Back</button>
    </>
    )
}
export default Movie;