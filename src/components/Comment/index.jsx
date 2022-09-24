import styles from './styles.module.scss';
import { Trash, Heart } from 'phosphor-react'
import { Profile } from '../Profile';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function Comment(props) {
    const { comment, onRemoveComment, onUpdateLike } = props

    const { user } = comment

    const createdFormatted = format(comment.created, "dd 'de' LLLL 'de' u 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const createdRelativeToNow = formatDistanceToNow(comment.created, {
        locale: ptBR,
        addSuffix: true,
    })

    return (
        <div className={styles.commentArea}>
            <Profile image={user.image} />

            <div className={styles.comment}>
                <header className={styles.commentHeader}>
                    <div className={styles.userInfo}>
                        <strong>{user.name}</strong>
                        <time title={createdFormatted} dateTime={comment.created.toISOString()}>{createdRelativeToNow}</time>
                    </div>

                    <Trash size={25} className={styles.icon} onClick={onRemoveComment} />
                </header>

                <div className={styles.commentBody}>
                    <p>{comment.text}</p>
                </div>

                <div className={styles.commentFooter}>
                    <Heart 
                    size={25} 
                    className={styles.icon} 
                    onClick={onUpdateLike} 
                    color={comment.liked ? 'red' : 'gray'}
                    />
                    <span>{comment.likes}</span>
                </div>
            </div>
        </div>
    )
}