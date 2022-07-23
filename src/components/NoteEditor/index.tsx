import React, { useState, useContext } from 'react'
import styles from './index.module.scss'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Button } from '@fluentui/react-components'
import { Link } from 'react-router-dom'
import { CREATE_ARTICLE } from '../../services/graphql'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

const NoteEditor = () => {
  const [markdownText, setMarkdownText] = useState<any | null>(null)
  const [header, setHeader] = useState<string | null>(null)

  const navigate = useNavigate()
  const { user }: any = useContext(AuthContext)

  const source: string = markdownText?.replace('/\n/gi', '\n &nbsp;')

  const [createArticle] = useMutation(CREATE_ARTICLE)

  // Render Image
  // const RenderImage = (props: any) => {
  //   return <img style={{ width: "50%" }} src={props.src} alt={props.alt}></img>
  // }

  const RenderCodeBlock = ({ node, inline, className, children, ...props }: any) => {
    const match: any = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        children={String(children).replace(/\n$/, '')}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

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
          <ReactMarkdown
            className={styles.markdownPreview}
            children={source}
            components={{ code: RenderCodeBlock }}
            remarkPlugins={[remarkGfm]}
          />
        </div>
      </div>
      {header ? (
        <div className={styles.saveBox}>
          <Button
            appearance="primary"
            onClick={async () => {
              await createArticle({ variables: { title: header, markdown_detail: source, author_id: user.userId } })
              navigate('/')
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
