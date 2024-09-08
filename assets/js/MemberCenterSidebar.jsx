function MemberCenterSidebar({ subPage = "account-manage" }) {
    const menuListBox = [
        {
            title: "我的活動",
            items: [
                {
                    id: "my-ticket",
                    tcTitle: "我的票卷"
                },
                {
                    id: "fun-point",
                    tcTitle: "Fun點數"
                },
                {
                    id: "fun-coupon",
                    tcTitle: "Fun折價卷"
                }
            ]
        },
        {
            title: "帳號設定",
            items: [
                {
                    id: "account-manage",
                    tcTitle: "帳號管理"
                },
                {
                    id: "my-comment",
                    tcTitle: "我的評論"
                },
                {
                    id: "my-fav",
                    tcTitle: "我的蒐藏"
                },
                {
                    id: "messenge-manage",
                    tcTitle: "訊息管理"
                }
            ]
        },
        {
            title: "主辦中心",
            items: [
                {
                    id: "founder-center",
                    tcTitle: "帳號切換"
                }
            ]
        }
    ];
    // console.log("subPage: " + subPage);
    // 以下寫法感覺不太優雅，但暫時先這樣
    let myTicketState = subPage == "my-ticket" ? "my-ticket--active" : "my-ticket";
    let funPointState = subPage == "fun-point" ? "fun-point--active" : "fun-point";
    let funCouponState = subPage == "fun-coupon" ? "fun-coupon--active" : "fun-coupon";
    let accountManageState = subPage == "account-manage" ? "account-manage--active" : "account-manage";
    let myCommentState = subPage == "my-comment" ? "my-comment--active" : "my-comment";
    let myFavState = subPage == "my-fav" ? "my-fav--active" : "my-fav";
    let messengeManageState = subPage == "messenge-manage" ? "messenge-manage--active" : "messenge-manage";
    let founderCenterState = subPage == "founder-center" ? "founder-center--active" : "founder-center";
    return <>
        <nav className="member-center-sidebar">
            <div className="member-center-sidebar__intro">
                <div className="member-avatar-box">
                    <figure className="member-center-sidebar__avatar">
                        <img src="./assets/images/member-default-avatar.png" alt="" />
                    </figure>
                    <button type="button" className="edit-member-avatar-btn"><object
                        data="../assets/images/edit-avatar-icon.svg" type="image/svg+xml"></object></button>
                </div>
                <h3 className="member-center-sidebar__name">會員名字</h3>
                <a href="./member-center-account-manage.html" className="member-center-sidebar__edit-link">管理個人資料</a>
            </div>
            <div className="member-center-sidebar__menu">
                <div className="member-center-sidebar__list-box">
                    <h4>我的活動</h4>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${myTicketState}.svg)` }}
                        ></div>
                        <a className={myTicketState.includes("active")?"active":""} href="./member-center-my-ticket.html">我的票卷</a>
                    </div>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${funPointState}.svg)` }}
                        ></div>
                        <a className={funPointState.includes("active")?"active":""} href="./member-center-fun-point.html">Fun點數</a>
                    </div>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${funCouponState}.svg)` }}
                        ></div>
                        <a className={funCouponState.includes("active")?"active":""} href="./member-center-fun-coupon.html">Fun折價卷</a>
                    </div>
                </div>
                <div className="split-line-row"></div>
                <div className="member-center-sidebar__list-box">
                    <h4>帳號設定</h4>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${accountManageState}.svg)` }}
                        ></div>
                        <a className={accountManageState.includes("active")?"active":""} href="./member-center-account-manage.html">帳號管理</a>
                    </div>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${myCommentState}.svg)` }}
                        ></div>
                        <a className={myCommentState.includes("active")?"active":""} href="./member-center-my-comment.html">我的評論</a>
                    </div>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${myFavState}.svg)` }}
                        ></div>
                        <a className={myFavState.includes("active")?"active":""} href="./member-center-my-fav.html">我的蒐藏</a>
                    </div>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${messengeManageState}.svg)` }}
                        ></div>
                        <a className={messengeManageState.includes("active")?"active":""} href="./member-center-messenge-manage.html">訊息管理</a>
                    </div>
                </div>
                <div className="split-line-row"></div>
                <div className="member-center-sidebar__list-box">
                    <h4>主辦中心</h4>
                    <div className="member-center-sidebar__link-box">
                        <div className="icon--small"
                            style={{ backgroundImage: `url(./assets/images/member-center-sidebar-icon/${founderCenterState}.svg)` }}
                        ></div>
                        <a className={founderCenterState.includes("active")?"active":""} href="./member-center-founder-center.html">帳號切換</a>
                    </div>
                </div>

                <button className="btn-logout--large funevent-btn" type="button">登出</button>
            </div>
        </nav>
    </>
}