import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div style={{ marginTop: "2.5rem" }} data-testid="not-found-container">
      <h1>We could not find this page</h1>
      <p>Have you checked if this is the correct link?</p>
      <p>
        Alternatively you can use the search bar above to search for your
        article.
      </p>
    </div>
  </Layout>
)

export default NotFoundPage
