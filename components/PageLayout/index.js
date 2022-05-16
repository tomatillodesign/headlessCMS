import Navbar from "../Nav"
import TitleComp from "./Title"
import styles from "../../styles/Home.module.css"


function index({children}) {
  return (
      <div>
        <Navbar/>
        <div className={styles.wpChildren}>
          {children}

        </div>
        <footer className="bg-gray-200 text-center lg:text-left">
            <div className="text-gray-700 text-center p-4 bg-gray-100">
                © 2022 Copyright:
                <a className="text-gray-800 p-5" target="_blank" href="https://codethedream.org/" rel="noreferrer">Code The Dream</a>
                &
                <a className="text-gray-800 p-5" target="_blank" href="https://www.tomatillodesign.com/" rel="noreferrer">Tomatillo Design</a>
            </div>
        </footer>
      </div>
  )
}

export default index