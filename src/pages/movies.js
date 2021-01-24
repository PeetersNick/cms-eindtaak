import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {
  Wrapper,
  Image,
  BottomEdgeDown,
  BottomEdgeUp,
  Movie,
} from "../pageStyles/pageStyles"
import { COLORS } from "../constants"

const MoviesPage = () => {
  const {
    wpcontent: {
      page: {
        moviesMeta: { moviesPageBanner, moviesPageDescription },
      },
      movies: { edges: movies },
    },
  } = useStaticQuery(graphql`
    query {
      wpcontent {
        page(id: "movies", idType: URI) {
          moviesMeta {
            moviesPageDescription
            moviesPageBanner {
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
        movies {
          edges {
            node {
              movie {
                rating
                title
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
              slug
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Movies" />
      <Wrapper moviesColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
        <div className="banner">
          <Image
            fluid={moviesPageBanner.imageFile.childImageSharp.fluid}
            alt={moviesPageBanner.altText}
          />
          <BottomEdgeDown color={COLORS.SECONDARY} />
        </div>
        <div className="description">
          <h2>Movie reviews</h2>
          <p>{moviesPageDescription}</p>
          <BottomEdgeUp color={COLORS.BLACK} />
        </div>
        <div className="movies">
          <h2>Movies</h2>
          <div className="movie-items">
            {movies.map(({ node: { movie, slug } }) => (
              <Movie to={`/${slug}`} key={slug}>
                <Image
                  fluid={movie.poster.imageFile.childImageSharp.fluid}
                  alt={movie.poster.altText}
                />
                <div className="movie-info">
                  <p>{movie.title}</p>
                  <p>{movie.rating}</p>
                </div>
              </Movie>
            ))}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default MoviesPage
