import { Header } from "./components/Header";
import styles from './App.module.scss';
import { Sidebar } from "./components/Sidebar";

export function App() {

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        
        <main>
          feed area
        </main>
      </div>
    </>
  )
}
