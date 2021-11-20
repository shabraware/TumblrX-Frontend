import React, { useState, useEffect } from "react";

import styles from "../Account.module.css";
import pen from "../../../assets/Images/pencil-64x64.png";
import axios from "axios";

/**
 * Component to render the Password  Section in the Accountsettings in the Settings page
 * @author Abdalla Mahmoud
 *
 * @component
 */

function PasswordSection(props) {
  const [passwordInfo, updateInfo] = useState({
    password: "",
    confirmedPassword: "",
    newPassword: "",
    newConfirmedPassword: "",
  });
  /**
   * retreive the data from the backend when the component mounteds
   * @type {function}
   * @param {void}
   * @returns {void}
   *
   */
  const componentDidMount = () => {
    axios
      .get("http://localhost:3000/users/1")
      .then((response) => {
        updateInfo({ ...passwordInfo, password: response.data.password });
        console.log(passwordInfo);
      })
      .catch();
  };
  useEffect(componentDidMount, []);

  /**
   * this function handle the click on the save button in the email section
   * @type {function}
   * @param {*} event
   * @returns {void} return nothing , it just a click event handler
   */
  let formAction = (event) => {
    /**
     *  get save buttons
     * @type {Array<Element>}
     *
     */
    let saveButtons = document.getElementsByClassName(
      `${styles["save-button"]}`
    );

    if (event.target === saveButtons[1]) {
      if (passwordInfo.confirmedPassword !== passwordInfo.password) {
        document.getElementsByClassName(
          `${styles["error-current-password"]}`
        )[0].style.visibility = "unset";
      } else if (
        passwordInfo.newPassword.length < 10 ||
        passwordInfo.password === passwordInfo.newPassword
      ) {
        // one condition for test
        if (passwordInfo.newPassword.length < 10)
          document.getElementsByClassName(
            `${styles["error-new-password"]}`
          )[0].style.visibility = "unset";
        else
          document.getElementsByClassName(
            `${styles["error-new-password"]}`
          )[1].style.visibility = "unset";
      } else if (
        passwordInfo.newPassword !== passwordInfo.newConfirmedPassword
      ) {
        document.getElementsByClassName(
          `${styles["error-confirm-password"]}`
        )[0].style.visibility = "unset";
      } else {
        let sentData = { password: passwordInfo.newPassword };
        props.sendData(sentData);
      }
    }
  };

  /**
   * this function handle the event handler on cancel button on the editing email section
   * @type {function}
   * @param {*} event  it takes the click item as an event
   * @return {void} returns nothing it just an event handler
   */

  let cancelButtonClick = (event) => {
    document.querySelectorAll(".error-message").forEach((element) => {
      element.style.visibility = "hidden";
      element.style.transition = "none";
    });
    /**
     * all cancel buttons
     * @type {Array<Element>}
     *
     */
    let allButtons = document.querySelectorAll(`.${styles["cancel-button"]}`);
    if (event.target === allButtons[1]) {
      document.getElementsByClassName(`${styles["dots"]}`)[0].style.display =
        "block";
      document
        .querySelectorAll(`.${styles["password-box"]} input`)
        .forEach((element) => {
          element.classList.toggle(`${styles.hidden}`);
          // if you click on the Email or on the Edit icon the Email box will apear and the confirm password box will appear too
          //How I select this element? as regular selector .classX .classY{} then forEach one of them toggle the hidden class
        });

      document
        .getElementsByTagName("img")[1]
        .classList.toggle(`${styles.hidden}`);

      document
        .querySelector(`#password-section-buttons`)
        .classList.toggle(`${styles.hidden}`);
    }
    document.querySelectorAll(`form >div`).forEach((element) => {
      element.style.opacity = "1";
    });

    document.querySelectorAll(`form >div`).forEach((element) => {
      element.style.opacity = "1";
    });

    document.querySelectorAll(`form`)[0].style.pointerEvents = "all";
  };

  /**
   * this function handle the event handler on edit button icon
   * @type {function}
   * @param {*} event
   * @return {void} return nothing it just an event handler
   */
  let iconClick = (event) => {
    document.querySelectorAll(".error-message").forEach((element) => {
      element.style.transition = "0.5s .1s linear";
    });
    /**
     * get all icon images
     * @type {Array<Element>}
     *
     */
    let imgs = document.querySelectorAll(`.${styles["icon-photo"]}`);
    if (
      event.target === imgs[1] ||
      event.target.className === `${styles["dots"]}` ||
      event.target.parentElement.className === `${styles["dots"]}`
    ) {
      document.getElementsByClassName(`${styles["dots"]}`)[0].style.display =
        "none";
      document
        .querySelectorAll(`.${styles["password-box"]} .${styles.hidden}`)
        .forEach((element) => {
          element.classList.toggle(`${styles.hidden}`);
          // if you click on the Email or on the Edit icon the Email box will apear and the confirm password box will appear too
          //How I select this element? as regular selector .classX .classY{} then forEach one of them toggle the hidden class
        });
      document
        .getElementsByClassName(`${styles["icon-photo"]}`)[1]
        .classList.toggle(`${styles.hidden}`);
      /**
       * the form of the Account
       * @type {Element}
       *
       */
      let entireForm = document.getElementsByTagName("form")[0];
      entireForm.style.pointerEvents = "none";
      document.querySelectorAll(`form >div`).forEach((element) => {
        element.style.opacity = "0.5";
      });
      /**
       * get the section for changing password
       * @type {Array<Element>}
       *
       */
      let changePasswordSection = document.getElementsByClassName(
        `${styles["password-box"]}`
      )[0];
      changePasswordSection.style.pointerEvents = "all";
      changePasswordSection.style.opacity = "1";
    }
  };

  /**
   * this function handle any change in the states
   * @type {function}
   * @param {*} event
   * @returns {void}
   */
  let changeInput = (event) => {
    document.querySelectorAll(".error-message").forEach((element) => {
      // if the user enter invalid input then try to enter new values
      element.style.visibility = "hidden";
    });
    document.querySelectorAll(".error-message").forEach((element) => {
      // if the user enter invalid input then try to enter new values
      element.style.visibility = "hidden";
    });
    if (event.target.id === "currentpassword") {
      updateInfo({ ...passwordInfo, confirmedPassword: event.target.value });
    } else if (event.target.id === "newpassword") {
      updateInfo({ ...passwordInfo, newPassword: event.target.value });
    } else if (event.target.id === "confirmpassword") {
      updateInfo({ ...passwordInfo, newConfirmedPassword: event.target.value });
    } else {
      updateInfo({ ...passwordInfo, confirmedPassword: event.target.value });
    }
    console.log(passwordInfo);
  };

  return (
    <>
      <div data-testid="password-section" className={styles["password-box"]}>
        <div className={styles["title"]}>Password</div>
        <div className={styles["dots"]} onClick={iconClick} data-testid="dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div
          className={`${styles["input-fields"]} ${styles.hidden}`}
          data-testid="password-section-input-field"
        >
          <input
            id="currentpassword"
            type="password"
            name=""
            placeholder="Current Password"
            value={passwordInfo.confirmedPassword}
            onChange={changeInput}
            data-testid="currentpassword-box"
            className={`${styles["input-box"]}`}
          />
          <div className={`${styles["error-current-password"]} error-message `}>
            Please Enter your password Correctly
          </div>
          <input
            id="newpassword"
            type="password"
            placeholder="New Password"
            value={passwordInfo.newPassword}
            onChange={changeInput}
            data-testid="newpassword-box"
            className={`${styles["input-box"]}`}
          />
          <div className={`${styles["error-new-password"]} error-message`}>
            Please Enter Strong Password
          </div>
          <div className={`${styles["error-new-password"]} error-message`}>
            Please Don't enter you previous Password
          </div>
          <input
            id="confirmpassword"
            type="password"
            placeholder="Confirm Password"
            value={passwordInfo.newConfirmedPassword}
            onChange={changeInput}
            data-testid="confirmpassword-box"
            className={`${styles["input-box"]}`}
          />
          <div className={`${styles["error-confirm-password"]} error-message`}>
            Please Enter Identical Passwords
          </div>

          <div id="password-section-buttons">
            <button
              onClick={cancelButtonClick}
              className={styles["cancel-button"]}
              type="button"
            >
              cancel
            </button>
            <button
              type="button"
              onClick={formAction}
              className={styles["save-button"]}
            >
              save
            </button>
          </div>
        </div>

        <img
          src={pen}
          onClick={iconClick}
          className={styles["icon-photo"]}
          alt=" can't load "
          data-testid="password-edit-button"
        />
      </div>
      <hr />
    </>
  );
}

export default PasswordSection;
