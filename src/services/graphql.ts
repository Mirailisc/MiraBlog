import { gql } from '@apollo/client'

const GET_ARTICLES = gql`
  query getArticles {
    articles {
      title
      author_id
      markdown_detail
    }
  }
`

const CREATE_ARTICLE = gql`
  mutation createArticle($title: String, $markdown_detail: String!) {
    createArticle(title: $title, markdown_detail: $markdown_detail) {
      title
      markdown_detail
    }
  }
`

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        email
        name
        token
      }
    }
  }
`

export { GET_ARTICLES, CREATE_ARTICLE, LOGIN_USER }
