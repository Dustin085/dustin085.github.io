function Footer() {
    return <>
        {/*footer*/}
        <footer>
            <nav className="navigation">
                <ul className="menu">
                    <li>
                        <h3>認識FUNEVENT</h3>
                        <ul>
                            <li><a href="#">關於我們</a></li>
                            <li><a href="#">親子園地</a></li>
                            <li><a href="#">活動情報</a></li>
                        </ul>
                    </li>
                    <li>
                        <h3>購票須知</h3>
                        <ul>
                            <li><a href="#">如何訂購</a></li>
                            <li><a href="#">如何取票</a></li>
                            <li><a href="#">如何退票</a></li>
                        </ul>
                    </li>
                    <li>
                        <h3>客戶須知</h3>
                        <ul>
                            <li><a href="#">服務條款</a></li>
                            <li><a href="#">隱私權政策</a></li>
                        </ul>
                    </li>
                    <li>
                        <h3>主辦方中心</h3>
                        <ul>
                            <li><a href="#">舉辦活動</a></li>
                            <li><a href="#">上架規範</a></li>
                            <li><a href="#">廣告曝光</a></li>
                        </ul>
                    </li>
                    <li>
                        <h3>客服中心</h3>
                        <ul>
                            <li><a href="#">線上客服</a></li>
                            <li><a href="#">常見問題</a></li>
                        </ul>
                    </li>
                    <li>
                        <div className="app-box">
                            <p>下載FunEvent APP</p>
                            <div className="download">
                                <a href="#" className="google"></a>
                                <a href="#" className="iphone"></a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="split-line-row"></div>
            <div className="end-box">
                <h1><a href="./index.html"><img src="./assets/images/logo-big.svg" alt=" " /></a></h1>
                <small>COPYRIGHT &copy; 2024 FunEvent All rights reserved.</small>
                <div className="icon-box">
                    <div className="icon" style={{ backgroundImage: "url(./assets/images/fb-icon.svg)" }}></div>
                    <div className="icon" style={{ backgroundImage: "url(./assets/images/ig-icon.svg)" }}></div>
                    <div className="icon" style={{ backgroundImage: "url(./assets/images/threads-icon.svg)" }}></div>
                </div>
            </div>
            <div className="bg-color-block"></div>
        </footer>
    </>
}