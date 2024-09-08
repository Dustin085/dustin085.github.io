function Topbar({ isAltColor, noLocationSelector }) {
    const { useState, useEffect } = React;
    const [logoEnUrl, setLogoEnUrl] = useState("./assets/images/logo-en.svg");
    const [logoTcUrl, setLogoTcUrl] = useState("./assets/images/logo-tc.svg");
    const [isLoginBoardActive, setIsLoginBoardActive] = useState(false);
    useEffect(() => {
        // logo改換成另外色
        if (isAltColor) {
            setLogoEnUrl("./assets/images/logo-en-alt-color.svg");
            setLogoTcUrl("./assets/images/logo-tc-alt-color.svg");
        }
    }, [])

    // 登入按鈕事件處理
    const loginBtnClickHandler = () => {
        location.href = "./member-center-my-ticket.html";
        // setIsLoginBoardActive(true);
    };
    // 搜尋按鈕事件處理
    const searchBtnClickHandler = () => {
        location.href = "./search.html";
    };
    // 關閉overlay處理
    const closeOverlayHandler = (ev) => {
        console.log(ev);
        // setIsLoginBoardActive(false);
    }

    function LocationSelector() {
        let result = (
            <div className="topbar__location">
                <figure className="topbar__map-pin-icon"><img src="./assets/images/map-pin-icon.svg" alt="地圖圖釘icon" />
                </figure>
                <p>雙北</p>
            </div>
        );
        if (noLocationSelector) {
            result = <></>;
        }
        return (
            result
        )
    }

    return <>
        <header id="topbar">
            <div className="topbar__start-box">
                <h1 className="logo">
                    <a href="./index.html">
                        <figure className="logo-en"><img src={logoEnUrl} alt="" /></figure>
                        <figure className="logo-tc"><img src={logoTcUrl} alt="" /></figure>
                    </a>
                </h1>
                <LocationSelector />
            </div>
            <div className="topbar__end-box">
                <nav className="navigation">
                    <ul className="topbar-menu">
                        <li className="topbar-menu__item">
                            <button type="button" className="topbar-menu__btn" id="topbar-search-btn" onClick={searchBtnClickHandler}>
                                <div className="topbar-menu__icon"><img src="./assets/images/search-icon.svg" alt="" /></div>
                                <p>找活動</p>
                            </button>
                        </li>
                        <li className="topbar-menu__item">
                            <button type="button" className="topbar-menu__btn" id="login-btn" onClick={loginBtnClickHandler}>
                                <div className="topbar-menu__icon"><img src="./assets/images/login-icon.svg" alt="" /></div>
                                <p>註冊/登入</p>
                            </button>
                        </li>
                        <li className="topbar-menu__item">
                            <button type="button" className="topbar-menu__btn" id="create-new-event-btn">
                                <div className="topbar-menu__icon"><img src="./assets/images/ticket-icon.svg" alt="" /></div>
                                <p>辦活動</p>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <LoginOverlay isActive={isLoginBoardActive} closeOverlayHandler={closeOverlayHandler} />
        </header>
    </>
}

function LoginOverlay({ isActive = false, closeOverlayHandler }) {
    const { useEffect } = React;
    // 判斷點擊位置是否在黑底上
    useEffect(() => {
        let loginBoardEle = document.querySelector(".login-board");
        function isWithinEle(ele, pos) {
            const { } = pos;
        }
    }, [])
    if (!isActive) {
        return <></>;
    }
    return <>
        <div className="login-overlay" onClick={closeOverlayHandler}>
            <div className="login-board">
                <form className="login">
                    <div className="login-text-all">
                        <h3 className="login-text">登入/註冊</h3>
                        <p className="login-text">立即登入，隨時收到獨家優惠</p>
                    </div>
                    <div className="email-and-phone">
                        <p style={{ color: "var(--primary-2)", fontWeight: "bold" }}><a href="#"></a>電子信箱</p>
                        <p><a href="#"></a>手機號碼</p>
                    </div>
                </form>
                <div className="split-line-row-hr"></div>
                <form className="login">
                    <div className="email-icon-input">
                        <input className="email-input" type="text" placeholder="請輸入電子信箱" />
                        <div className="e-mail"></div>
                    </div>
                    <button className="login-btn">傳送驗證碼</button>
                    <small> <a href="#"></a>或使用手機號碼登入</small>
                </form>

                <div className="quick-login-all">
                    <div className="quick-login">
                        <hr /><span>快速登入</span>
                        <hr />
                    </div>
                    <div className="social-media">
                        <div className="google"></div>
                        <div className="line"></div>
                        <div className="apple"></div>
                        <div className="facebook"></div>
                    </div>
                </div>
                <small className="social-media-info">註冊或登入即表示您了解並同意FunEvent服務條款與隱私權政策</small>
            </div>
        </div>
    </>
}