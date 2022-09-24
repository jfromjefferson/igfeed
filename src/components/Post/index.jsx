import styles from './styles.module.scss';
import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Profile } from '../Profile';
import { Comment } from '../Comment';

export function Post({ post }) {
    const [isCommentAreaVisible, setIsCommentAreaVisible] = useState(false)
    const [commentList, setCommentList] = useState([...post.commentList])
    const [commentText, setCommentText] = useState('')

    const { user } = post

    const createdFormatted = format(post.created, "dd 'de' LLLL 'de' u 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const createdRelativeToNow = formatDistanceToNow(post.created, {
        locale: ptBR,
        addSuffix: true,
    })

    const handleClick = (event) => {
        event.preventDefault()

        setIsCommentAreaVisible(true)
    }

    const removeComment = ({uuid}) => {
        const commentListTemp = commentList.filter(comment => comment.uuid !== uuid)

        setCommentList(commentListTemp)
    }

    const updateLike = ({uuid}) => {
        const commentTemp = commentList.find(comment => comment.uuid === uuid)


        if(commentTemp.color === 'grey'){
            commentTemp.likes += 1
            commentTemp.color = 'red'
        }else {
            commentTemp.likes -= 1
            commentTemp.color = 'grey'
        }

        setCommentList([commentTemp, ...commentList.filter(comment => comment.uuid !== uuid)])
        
    }

    const submitComment = (event) => {
        event.preventDefault()

        if(commentText.trim() === '') {
            alert('Please enter a comment')
            setCommentText('')

            return
        }

        const commentTemp = { 
            uuid: Math.floor(Math.random()*999999999999999),
            user,
            created: new Date(),
            text: commentText,
            likes: 0,
            color: 'grey'
          }

        setCommentList([commentTemp, ...commentList])

        setCommentText('')
    }

    return (
        <article className={styles.post}>
            <header className={styles.postHeader}>
                <div className={styles.profile}>
                    <Profile hasBorder={true} image={user.image} />

                    <div className={styles.userInfo}>
                        <strong>{user.name}</strong>
                        <span>{user.role}</span>
                    </div>
                </div>

                <time title={createdFormatted} dateTime={post.created.toISOString()} className={styles.publishDate}>
                    {createdRelativeToNow}
                </time>
            </header>

            <div className={styles.postBody}>
                <p>{post.content}</p>
            </div>

            <hr />

            <footer className={styles.postFooter}>
                {
                    !isCommentAreaVisible ? (
                        <a href="" onClick={handleClick}>Escrever comentário</a>
                    ) : <></>
                }


                {
                    isCommentAreaVisible ?
                        (
                            <form onSubmit={submitComment}>
                                <textarea 
                                placeholder='Escreva um comentário..'
                                onChange={(event) => setCommentText(event.target.value)}
                                value={commentText}
                                required
                                ></textarea>


                                <footer>
                                    <button type="submit">Publicar</button>
                                </footer>

                            </form>
                        ) : <></>
                }

                {
                    commentList.map(comment => (
                        <Comment 
                        key={comment.uuid} 
                        comment={comment} 
                        onRemoveComment={() => removeComment(comment)} 
                        onUpdateLike={() => updateLike(comment)}
                        />
                    ))
                }

                
            </footer>
        </article>
    )
}