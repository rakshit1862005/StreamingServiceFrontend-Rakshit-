import Link from "next/link";

function Sidebar() {
  return (
    <div className="sidebar">
      <div id="ham">
        <img src="/assets/Images/menu.svg" loading="lazy" alt="Menu" />
        <p>Menu</p>
      </div>
      <br />

      <div className="cont">
        <Link href="/home" legacyBehavior>
          <a>
            <div>
              <img src="/assets/Images/home.svg" alt="Home" />
              <p>Home</p>
            </div>
          </a>
        </Link>

        <Link href="/search" legacyBehavior>
          <a>
            <div>
              <img src="/assets/Images/search.svg" alt="Search" />
              <p>Search</p>
            </div>
          </a>
        </Link>

        <Link href="/explore" legacyBehavior>
          <a>
            <div>
              <img src="/assets/Images/explore.svg" alt="Explore" />
              <p>Explore</p>
            </div>
          </a>
        </Link>

        <Link href="/watchlist" legacyBehavior>
          <a>
            <div>
              <img src="/assets/Images/bmark.svg" alt="Watchlist" />
              <p>Watch List</p>
            </div>
          </a>
        </Link>

        <Link href="/account" legacyBehavior>
          <a>
            <div>
              <img src="/assets/Images/acc.svg" alt="Account" />
              <p>My Account</p>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
