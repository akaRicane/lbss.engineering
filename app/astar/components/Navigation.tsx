// component: Navigation
import "../../styles/page.astar.css";

interface CallbackObject {
  target: string;
  section: string;
}

interface NavigationProps {
  callback: (data: CallbackObject) => void;
}

const Navigation: React.FC<NavigationProps> = ({ callback }) => {
  return (
    <>
      <div className="astar-title">ASTAR</div>
      <div className="astar-navigation">
        <button className="astar-navigation-btn" onClick={() => callback({ target: "navigation", section: "overview" })}>
          overview
        </button>
        {/* <button className="astar-navigation-btn" onClick={() => callback({ target: "navigation", section: "features" })}>
          features
        </button>
        <button className="astar-navigation-btn" onClick={() => callback({ target: "navigation", section: "usages" })}>
          usages
        </button>
        <button className="astar-navigation-btn" onClick={() => callback({ target: "navigation", section: "specifications" })}>
          specifications
        </button> */}
        <button className="astar-navigation-btn" onClick={() => callback({ target: "navigation", section: "download" })}>
          download
        </button>
        {/* <button className="astar-navigation-btn" onClick={() => callback({ target: "navigation", section: "more" })}>
          more
        </button> */}
      </div>
    </>
  );
};

export default Navigation;
