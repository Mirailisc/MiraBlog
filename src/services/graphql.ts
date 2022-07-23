import { gql } from '@apollo/client'

const GET_ARTICLES = gql`
  query getArticles {
    articles {
      title
      author {
        first_name
        last_name
      }
      markdown_detail
      createdAt
    }
  }
`

const CREATE_ARTICLE = gql`
  mutation createArticle($title: String, $markdown_detail: String!, $author_id: String) {
    createArticle(title: $title, markdown_detail: $markdown_detail, author_id: $author_id) {
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
