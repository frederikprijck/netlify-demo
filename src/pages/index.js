import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout";
import SEO from "../components/seo";
import { useStaticQuery, graphql } from "gatsby";

const IndexPage = () => {
  const {
    allMarkdownRemark: { edges },
  } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              html
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
              }
            }
          }
        }
      }
    `
  )

  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    fetch("/.netlify/functions/hello")
  .then(response => response.json())
  .then(console.log)
  }

  const Posts = edges
    .map(({node}) => (
      <div>
        <h2>
          <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />

        <button onClick={handleClick}>Clap</button>
      </div>
    ))

  return (
    <Layout>
      <SEO title="Home" />
      {Posts}
    </Layout>
  )
}

export default IndexPage
