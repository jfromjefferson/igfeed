import styles from './styles.module.scss';

export function Profile(props) {
    const { isSidebar, image, hasBorder} = props

    const classList = [
        styles.avatar,
        hasBorder ? styles.avatarWithBorder : '',
    ]

    return (
        <div className={isSidebar ? styles.sidebarProfile : styles.profile}>
            <img className={classList.join(' ')} src={image} />
        </div>
    )
}