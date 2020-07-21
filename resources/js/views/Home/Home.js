import React from 'react'
import { withRouter } from 'react-router-dom'
import Layout from '~/components/Layout'

function Home () {
  return (
    <Layout>
      Home :)
    </Layout>
  )
}
export default withRouter(Home)
