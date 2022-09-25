import { Header } from "./components/Header";
import styles from './App.module.scss';
import { Sidebar } from "./components/Sidebar";
import { Post } from './components/Post'

export function App() {
  const user = {
    'name': 'Jefferson Silva',
    'role': 'Full stack developer',
    'coverImage': 'https://images.unsplash.com/photo-1524860769472-246b6afea403?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGFja2VyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=250&q=40',
    'image': 'https://avatars.githubusercontent.com/u/42497861?v=4'
  }

  const commentListProp = []

  for(let i = 0; i < Math.floor(Math.random()*8); i++){
    commentListProp.push({
      uuid: Math.floor(Math.random()*999999999999999),
      user,
      created: new Date(),
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mollis ipsum.',
      likes: Math.floor(Math.random()*20),
      liked: false,
    })
  }

  const postList = []

  for(let i = 0; i < Math.floor(Math.random()*200); i++){
    postList.push({
      uuid: Math.floor(Math.random()*999999999999999),
      user,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mollis ipsum. Etiam sagittis, arcu nec suscipit condimentum, turpis neque iaculis massa, sit amet ultrices est lectus facilisis ex. Aenean porttitor mollis libero, in pulvinar neque tempor eget. Suspendisse commodo purus ligula, eu consectetur arcu luctus eget.',
      created: new Date(),
      commentListProp,
    })
  }

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar {...user} />
        
        <main>
          {
            postList.map((post) => (
              <Post key={post.uuid} {...post} />
            ))
          }
        </main>
      </div>
    </>
  )
}
