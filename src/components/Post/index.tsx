import styles from './styles.module.scss';
import { FormEvent, useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Profile } from '../Profile';
import { Comment, CommentProps } from '../Comment';

export interface UserProps {
    name:string,
    role:string,
    coverImage:string,
    image:string,
}

export interface PostProps {
    uuid: number,
    user: UserProps,
    content: string,
    created: Date,
    commentListProp: CommentProps[],
}

export function Post({ user, created, commentListProp, content }: PostProps) {
    const [isCommentAreaVisible, setIsCommentAreaVisible] = useState(false)
    const [commentList, setCommentList] = useState([...commentListProp])
    const [commentText, setCommentText] = useState('')

    const createdFormatted = format(created, "dd 'de' LLLL 'de' u 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const createdRelativeToNow = formatDistanceToNow(created, {
        locale: ptBR,
        addSuffix: true,
    })

    const handleClick = (event: FormEvent) => {
        event.preventDefault()

        setIsCommentAreaVisible(true)
    }

    const removeComment = ({uuid}: CommentProps) => {
        const commentListTemp = commentList.filter(comment => comment.uuid !== uuid)

        setCommentList(commentListTemp)
    }

    const updateLike = ({uuid}: CommentProps) => {
        const commentTemp = commentList.find(comment => comment.uuid === uuid)!
        const commentListTemp = [...commentList]
        const commentIndex = commentList.findIndex(comment => comment.uuid === commentTemp.uuid)


        commentTemp.liked = !commentTemp.liked
        if(commentTemp.liked){
            commentTemp.likes += 1
        }else {
            commentTemp.likes -= 1
        }

        commentListTemp[commentIndex] = commentTemp

        setCommentList(commentListTemp)
        
    }

    const submitComment = (event: FormEvent) => {
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
            liked: false
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

                <time title={createdFormatted} dateTime={created.toISOString()} className={styles.publishDate}>
                    {createdRelativeToNow}
                </time>
            </header>

            <div className={styles.postBody}>
                <p>{content}</p>
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
                    commentList.map((comment: CommentProps) => (
                        <Comment 
                        key={comment.uuid} 
                        onRemoveComment={() => removeComment(comment)} 
                        onUpdateLike={() => updateLike(comment)}
                        {...comment}
                        />
                    ))
                }

                
            </footer>
        </article>
    )
}