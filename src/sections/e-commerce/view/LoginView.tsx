/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../../login1/style.css';

export default function LoginView() {
  return (
    <>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form
              action=""
              //
              // autocomplete="off"

              className="sign-in-form"
            >
              <div className="logo">
                <img
                  src="./img/logo.jpg"
                  alt=""
                />
                <h3>bookstore</h3>
              </div>

              <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Chưa đăng ký?</h6>
                <a
                  href="#"
                  className="toggle"
                >
                  Sign up
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    // autocomplete="off"
                    required
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    className="input-field"
                    // autocomplete="off"
                    required
                  />
                  <label>Password</label>
                </div>

                <input
                  type="submit"
                  value="Sign In"
                  className="sign-btn"
                />

                <p className="text">
                  Quên mật khẩu?
                  <a href="#">Get help</a>
                </p>
              </div>
            </form>

            <form
              action=""
              // autocomplete="off"
              className="sign-up-form"
            >
              <div className="logo">
                <img
                  src="./img/logo.jpg"
                  alt=""
                />
                <h3>bookstore</h3>
              </div>

              <div className="heading">
                <h2>Get Started</h2>
                <h6>Bạn đã có tài khoản?</h6>
                <a
                  href="#"
                  className="toggle"
                >
                  Sign in
                </a>
              </div>

              <div className="actual-form">
                <div className="input-wrap">
                  <input
                    type="text"
                    className="input-field"
                    // autocomplete="off"
                    required
                  />
                  <label>Name</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="email"
                    className="input-field"
                    // autocomplete="off"
                    required
                  />
                  <label>Email</label>
                </div>

                <div className="input-wrap">
                  <input
                    type="password"
                    className="input-field"
                    // autocomplete="off"
                    required
                  />
                  <label>Password</label>
                </div>

                <input
                  type="submit"
                  value="Sign Up"
                  className="sign-btn"
                />

                <p className="text">
                  By signing up, I agree to the <a href="#">Terms of Services</a> and
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </form>
          </div>

          <div className="carousel">
            <div className="images-wrapper">
              {/* <!-- <img src="./img/img2.jpg" alt="" className="image img-1" /> --> */}
            </div>

            <div className="text-slider"></div>
          </div>
        </div>
      </div>
    </>
  );
}
