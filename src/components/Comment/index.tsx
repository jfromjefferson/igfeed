import styles from './styles.module.scss';
import { Trash, Heart } from 'phosphor-react'
import { Profile } from '../Profile';
import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { UserProps } from '../Post';

export interface CommentProps {
    user: UserProps
    created: Date,
    text: string,
    likes: number,
    liked: boolean,
    uuid: number,
    onRemoveComment?: (comment: CommentProps) => void,
    onUpdateLike?: (comment: CommentProps) => void,
}

export function Comment({onRemoveComment, onUpdateLike, ...rest}: CommentProps) {

    const { created, user, text, liked, likes } = rest

    const createdFormatted = format(created, "dd 'de' LLLL 'de' u 'às' HH:mm'h'", {
        locale: ptBR,
    })

    const createdRelativeToNow = formatDistanceToNow(created, {
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
                        <time title={createdFormatted} dateTime={created.toISOString()}>{createdRelativeToNow}</time>
                    </div>

                    <Trash size={25} className={styles.icon} onClick={onRemoveComment} />
                </header>

                <div className={styles.commentBody}>
                    <p>{text}</p>
                </div>

                <div className={styles.commentFooter}>
                    <Heart 
                    size={25} 
                    className={styles.icon} 
                    onClick={onUpdateLike} 
                    color={liked ? 'red' : 'gray'}
                    />
                    <span>{likes}</span>
                </div>
            </div>
        </div>
    )
}