/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Dashboard.module.scss';
import showPosts from './DashBoardController';
import fetchPost from './DashBoardService';
import {
  setPosts, incrementPageNum, decrementPageNum,
  setIsInfinite, setExploreBlogs, setIsMounted, setPageNum,
} from '../../redux/DashBoardReducer';

const Dashboard = function () {
  const {
    posts, pageNum, isInfinte, ismounted, exploreBlogs,
  } = useSelector((state) => state.DashBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPost();
    dispatch(setIsMounted(1));
    console.log('mounted done');
  }, []);

  return (
    <div className={styles.parent}>
      <div className={styles.mainClass}>
        <div className={styles.Navbar} data-testid="testNavbar" />
        <div className={`${styles.container} ${styles.row}`}>
          {/* --------------- Start posts ---------------------- */}
          <div className={styles.posts} data-testid="testPostContainer">
            <div className={`${styles.insertPost} ${styles.row}`}>
              <div className={styles.insertLogo} />
              <div className={styles.insertPostDetails}>
                insertPost
              </div>
            </div>
            { ismounted && showPosts(posts, pageNum, isInfinte)}
            <div className={`${styles.navigate_btns} ${styles.row}`}>
              {
                  (pageNum !== 1 && !isInfinte)
                  && (
                    <button
                      className={styles.previous_btn}
                      onClick={() => dispatch(decrementPageNum())}
                    >
                      &lt; Previous
                    </button>
                  )
              }
              {
                  // eslint-disable-next-line no-mixed-operators
                  (pageNum * 10 < posts.length || posts.length === 0)
                    // eslint-disable-next-line eqeqeq
                    && !isInfinte
                && (
                <button
                  className={styles.next_btn}
                  onClick={() => { dispatch(incrementPageNum()); console.log(pageNum); }}
                >
                  Next &gt;
                </button>
                )
              }
            </div>
          </div>
          {/* --------------- End posts ---------------------- */}

          {/* --------------- Start explore  ---------------------- */}
          <div className={styles.explore} data-testid="testExplore">
            <div className={styles.checkBlogs}>
              Check Theses Blogs
              <hr />
              <div className={`${styles.exploreBlog} ${styles.row}`}>
                <div className={styles.blogAvatar}>
                  ava
                </div>
                <div className={styles.blogTitle}>
                  <h4> Blog Title </h4>
                  <p className={styles.p}> Fav1 Fav2 Fav3 </p>
                </div>
                <div className={styles.blogFollow}>
                  <button className={styles.follow}> Follow </button>
                </div>
                <div className={styles.blogExit}>
                  <button className={styles.exit}> &times; </button>
                </div>
              </div>

              <div className={`${styles.exploreBlog} ${styles.row}`}>
                <div className={styles.blogAvatar}>
                  ava
                </div>
                <div className={styles.blogTitle}>
                  <h4> Blog Title </h4>
                  <p className={styles.p}> Fav1 Fav2 Fav3 </p>
                </div>
                <div className={styles.blogFollow}>
                  <button className={styles.follow}> Follow </button>
                </div>
                <div className={styles.blogExit}>
                  <button className={styles.exit}> &times; </button>
                </div>
              </div>

              <div className={`${styles.exploreBlog} ${styles.row}`}>
                <div className={styles.blogAvatar}>
                  ava
                </div>
                <div className={styles.blogTitle}>
                  <h4> Blog Title </h4>
                  <p className={styles.p}> Fav1 Fav2 Fav3 </p>
                </div>
                <div className={styles.blogFollow}>
                  <button className={styles.follow}> Follow </button>
                </div>
                <div className={styles.blogExit}>
                  <button className={styles.exit}> &times; </button>
                </div>
              </div>
              <div className={`${styles.exploreBlog} ${styles.row}`}>
                <div className={styles.blogAvatar}>
                  ava
                </div>
                <div className={styles.blogTitle}>
                  <h4> Blog Title </h4>
                  <p className={styles.p}> Fav1 Fav2 Fav3 </p>
                </div>
                <div className={styles.blogFollow}>
                  <button className={styles.follow}> Follow </button>
                </div>
                <div className={styles.blogExit}>
                  <button className={styles.exit}> &times; </button>
                </div>
              </div>
            </div>
            <div className={styles.radar}>
              Radar
              <hr />
            </div>
          </div>
          {/* --------------- End explore  ---------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
