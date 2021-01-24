import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from "./templateStyles/movieStyles"

const MoviesTemplate = ({
  data: {
    wpcontent: {
      movie: {
        movie,
        genres: { edges: genres },
      },
    },
  },
}) => {
  return (
    <Layout>
      <SEO title="Movie" />
      <Wrapper>
        <div className="movie-container">
          <div className="movie-image">
            <Image fluid={movie.poster.imageFile.childImageSharp.fluid} />
            <div className="genres">
              {genres.map(({ node: genre }) => (
                <div className="genre">{genre.name}</div>
              ))}
            </div>
          </div>
          <div className="movie-info">
            <h2>{movie.title}</h2>
            <h3>Rating - {movie.rating}</h3>
            <p className="info">
              <strong>Director: </strong>
              {movie.director}
            </p>
            <p className="info">
              <strong>Lead Actors: </strong>
              {movie.leadRoles}
            </p>
            <p className="info">
              <strong>Description: </strong>
              {movie.description}
            </p>
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MoviesTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      movie(id: $id, idType: ID) {
        genres {
          edges {
            node {
              name
            }
          }
        }
        movie {
          description
          director
          leadRoles
          title
          rating
          poster {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
