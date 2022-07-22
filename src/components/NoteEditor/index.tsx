import React, { useState } from 'react'
import styles from './index.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@fluentui/react-components'
import { Link } from 'react-router-dom'
import { CREATE_ARTICLE } from '../../services/graphql'
import { useMutation } from '@apollo/client'

const NoteEditor = () => {
  const [markdownText, setMarkdownText] = useState<any | null>(null)
  const [header, setHeader] = useState<string | null>(null)

  const source: string = markdownText?.replace('/\n/gi', '\n &nbsp;')

  if (markdownText === '') {
    setMarkdownText(null)
  }
  if (markdownText === '') {
    setHeader(null)
  }

  const [createArticle] = useMutation(CREATE_ARTICLE)

  return (
    <>
      <div className={styles.articleHeader}>
        <input
          className={styles.headerInput}
          type="text"
          onChange={(e) => setHeader(e.target.value)}
          placeholder="header"
        />
      </div>
      <div className={styles.markdownContainer}>
        <div className={styles.markdown}>
          <h3>Markdown</h3>
          <textarea
            className={styles.markdownInput}
            placeholder="Type Anything Here!"
            onChange={(e) => setMarkdownText(e.target.value)}
          />
        </div>
        <div className={styles.preview}>
          <h3>Preview</h3>
          <ReactMarkdown className={styles.markdownPreview} children={source} remarkPlugins={[remarkGfm]} />
        </div>
      </div>
      {header != null ? (
        <div className={styles.saveBox}>
          <Button
            appearance="primary"
            onClick={() => {
              createArticle({ variables: { title: header, markdown_detail: source } })
            }}
          >
            Save
          </Button>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button>Dismiss</Button>
          </Link>
        </div>
      ) : null}
    </>
  )
}

export default NoteEditor
