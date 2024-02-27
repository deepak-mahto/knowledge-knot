import "./Navbar.css";
import { Link } from "react-router-dom";
import { useQuiz, useAuth, useFilter } from "../../context";
import { debounce } from "lodash";

export const Navbar = ({route}) => {
  const {
    // eslint-disable-next-line
    quizState: { currentCategory },
    quizDispatch
  } = useQuiz();

  const {
    // eslint-disable-next-line
    state: { userName }, user, logout
  } = useAuth();

  const { filterDispatch } = useFilter();

  const handleInput = debounce((e) => {
    filterDispatch({
      type: "SEARCH",
      payload: e.target.value
    });
  }, 500);

  const logoutHandler = () => {
    logout();
    quizDispatch({
      type: "END_GAME"
    })
  }

  const handleNewQuizClick = () => {
    quizDispatch({
      type: "END_GAME"
    })
    localStorage.clear();
  }

  return (
    <header className="heading d-flex grow1-shrink1-basisauto align-center fixed top-0 left-0">
      <div className="heading-title-icon d-flex align-center">
        <h1 className="heading-title">
        {route === "quiz" || route === "result" ? (
            "Groovy Quiz"
          ) : (
            <Link className="link nav-options" to="/">
              KnowledgeKnot
            </Link>
          )}
        </h1>
      </div>
      {route === "home" && (
        <div className="search-box-container relative">
          <input
            className="search-box padding-all-8"
            type="text"
            placeholder="Search"
            onChange={(e) => handleInput(e)}
          />
          <span class="material-icons-outlined search-icon absolute">
            search
            </span>
        </div>
      )}
      <nav className="navigation">
      <ul className="list-non-bullet">
          {user && <li className="list-item-inline">
              Hey!
          </li>}
          {route === "rules" || route === "home" || route === "signup" ? (
            <li className="list-item-inline link nav-options cursor" onClick={logoutHandler}>
              
              {user ? "Logout" : "Login"}
              
            </li>
          ) : route === "result" ? (
            <>
              <li className="list-item-inline">
                <button onClick={logoutHandler}
                  className=" button link nav-options cursor"
                >
                  Logout
                </button>
              </li>
              <li className="list-item-inline">
                <Link
                  to="/"
                  className="link nav-options cursor"
                  onClick={handleNewQuizClick}
                >
                  New Quiz
                </Link>
              </li>
            </>
          ) : route === "login" && (
            <li className="list-item-inline">
              <Link to="/signup" className="link nav-options cursor">
                Signup
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
