// funevent活動卡片元件
// TODO => 使用props來控制活動資訊
function FuneventEventCard(props) {
    {/*所需的props有：eventImgUrl, eventState, date, category, title, location, ratingScore*/ }
    let eventImgUrl = props.eventImgUrl;
    // 包裝tags，以執行迴圈
    let tags = [];
    tags = props.tags;

    // 報名handler，暫時先只是跳轉到活動頁，之後寫判斷就可以真正進入套好的活動頁
    const onSignUpHandler = (ev) => {
        ev.preventDefault();
        location.href = "./event/event.html";
    }
    return <>
        <div className="funevent-event-card">
            <a href="./event/event.html" className="event-pic"
                style={{ backgroundImage: `url(${eventImgUrl})` }}>
                <div className="inner-card">
                    <div className="start-box">
                        <StateTag />
                        <button type="button" className="fav-btn"></button>
                    </div>
                    <div className="date">
                        <p>{props.date}</p>
                    </div>
                </div>
            </a>
            <div className="main-content">
                <p className="category">{props.category}</p>
                <h2 className="event-title"><a href="./event/event.html">{props.title}</a></h2>
                <div className="location">
                    <div className="map-pin-icon"></div>
                    <p className="location-text">{props.location}</p>
                </div>
            </div>
            <div className="tag-rating-box">
                <ul className="tag-list">
                    {/* 迴圈製造tag */}
                    {
                        tags.map((tagText, index) => {
                            return <li key={index}><a href="#" className="tag link">{tagText}</a></li>;
                        })
                    }
                </ul>
                <p className="rating-score">{props.ratingScore}</p>
            </div>
            <button className="funevent-btn sign-up-btn" type="button" onClick={onSignUpHandler}>我要報名</button>
        </div>
    </>

    // 活動狀態tag，有最新和熱門兩種
    function StateTag() {
        // props.eventState可以是new 或是 hot
        let stateTag = <></>;
        if (props.eventState == "new") {
            stateTag = <><div className="tag tag--new">最新</div></>;
        } else if (props.eventState == "hot") {
            stateTag = <><div className="tag tag--hot">熱門</div></>;
        } else {
            stateTag = <><div className="tag tag--new">未知</div></>;
        }
        return stateTag;
    }
    {/*
    return <>
    <div className="funevent-event-card">
        <a href="./event/event.html" className="event-pic"
            style={{ backgroundImage: `url(${tnImgUrl})` }}>
            <div className="inner-card">
                <div className="start-box">
                    <div className="tag tag--hot">熱門</div>
                    <button type="button" className="fav-btn"></button>
                </div>
                <div className="date">
                    <p>2024.08.11(六) 10:00</p>
                </div>
            </div>
        </a>
        <div className="main-content">
            <p className="category">戶外運動</p>
            <h2 className="event-title"><a href="./event/event.html">【夏日營隊】戶外平衡競走大挑戰，四大主題等你來挑戰！</a></h2>
            <div className="location">
                <div className="map-pin-icon"></div>
                <p className="location-text">新北 · 板橋區</p>
            </div>
        </div>
        <div className="tag-rating-box">
            <ul className="tag-list">
                <li className="tag">#競賽</li>
                <li className="tag">#團體合作</li>
            </ul>
            <p className="rating-score">4.5(151)</p>
        </div>
        <button className="funevent-btn sign-up-btn" type="button">我要報名</button>
    </div>
    </>
    */}
}