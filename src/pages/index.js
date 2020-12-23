import React from "react"
import { Link, useStaticQuery, graphql} from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, Movie, BottomEdgeDown, BottomEdgeUp} from "./pageStyles/pageStyles"
import {COLORS} from '../constants'

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homePageMeta: {
          homePage,
          homePageTitle,
          homePageBanner,
          homePageFeaturedMovies,
          homePageDescription,
        }
      }
    }
  } =  useStaticQuery(graphql`
  query {
  wpcontent {
    page(id: "home", idType: URI) {
      homePageMeta {
        homePageTitle
        homePage
        homePageDescription
        homePageBanner {
          altText
          sourceUrl
          imageFile{
            childImageSharp{
              fluid(quality: 100){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homePageFeaturedMovies {
          ... on WPGraphql_Movie {
            id
            movie {
              title
              poster {
                altText
                sourceUrl
                imageFile{
                  childImageSharp{
                    fluid(quality: 100){
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `)

  return   (
  <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image fluid={homePageBanner.imageFile.childImageSharp.fluid} altText={homePageBanner.altText}/>
        <div className="inner-div">
          <p className="header-title">{homePageTitle}</p>
          <p className="header-description">{homePage}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}/>
      </div>
      <div className="description">
      <p>{homePageDescription}</p>
      <BottomEdgeUp color={COLORS.PRIMARY}/>
      </div>
      <div className="movies">
        <h2>Featured Movies</h2>
        <div className="movie-items">
          {homePageFeaturedMovies.map(({movie, title}) => (
            <Movie to={`/${title}`}>
              <Image fluid={movie.poster.imageFile.childImageSharp.fluid} altText={movie.poster.altText}/>
              <div className="movie-info">
              <p>{movie.title}</p>
              </div>
            </Movie>
          ))}
        </div>
      </div>
    </Wrapper>
  </Layout>
  )
}

export default IndexPage
