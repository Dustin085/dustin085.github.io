function FloatBtnBox() {
    // 可參考動畫：https://jqueryui.com/hide/，裡面的fold
    const { useState, useEffect, useRef, forwardRef } = React;

    // 利用jq的動畫做捲回效果
    const goTopBtnClickHandler = () => {
        $("html,body").animate({
            scrollTop: 0
        }, 1000);
        // window.scrollTo(0, 0);
    }
    // 按聊天室按鈕開關聊天室
    const chatroomSwitchHandler = () => {
        setIsChatroomActive(!isChatroomActive);
    }

    const [isChatroomActive, setIsChatroomActive] = useState(false);

    // 聊天室開關按鈕子組件
    function ChatroomSwitchBtn({ isActive = false, chatroomSwitchHandler }) {
        const bgImgUrl = isActive ? "./assets/images/chatroom-icon-active.svg" : "./assets/images/chatroom-icon.svg";
        const onMouseOverHandler = (ev) => {
            if (!isActive) {
                let hoverImgUrl = "./assets/images/chatroom-icon-hover.svg";
                ev.target.style.backgroundImage = `url(${hoverImgUrl})`;
            }
        };
        const onMouseOutHandler = (ev) => {
            ev.target.style.backgroundImage = `url(${bgImgUrl})`
        };
        return (
            <button type="button" className="chatroom-btn"
                onClick={chatroomSwitchHandler}
                onMouseOver={onMouseOverHandler}
                onMouseOut={onMouseOutHandler}
                style={{ backgroundImage: `url(${bgImgUrl})` }
                }></button>
        )
    }

    // 聊天室子組件
    function Chatroom({ isActive = false }) {
        // 處理本體顯示與否
        let displayStyleText = isActive ? "flex" : "none";
        // 處理input文字
        const [inputText, setInputText] = useState("");
        const inputOnChangeHandler = (ev) => {
            setInputText(ev.target.value);
        };

        // 抓聊天室body，用來回歸卷軸
        const crBodyRef = useRef();

        // 建立聊天訊息陣列
        const [msgList, setMsgList] = useState([]);
        // 初始化聊天訊息陣列
        useEffect(() => {
            let initMsgList = [
                {
                    avatarImgUrl: "./assets/images/member-default-avatar.png",
                    name: "FunEvent 小幫手",
                    text: "您好，我是FunEvent小幫手。<br />您今天好嗎？<br />很明顯我是用來湊字數的。<br />對於湊字數我還是略有涉略的。",
                    isFromUser: false
                },
                {
                    avatarImgUrl: "./assets/images/member-default-avatar.png",
                    name: "王曉明",
                    text: "測試訊息中的測試訊息，測試訊息中的測試訊息，測試訊息中的測試訊息，測試訊息中的測試訊息。",
                    isFromUser: true
                }
            ]
            setMsgList(initMsgList);
        }, []);

        // 傳送訊息onClick
        const sendMsgBtnClickHandler = () => {
            if (inputText != "") {
                let newMsg = {
                    avatarImgUrl: "./assets/images/member-default-avatar.png",
                    name: "王曉明",
                    text: inputText,
                    isFromUser: true
                };
                setMsgList([...msgList, newMsg]);
                setInputText("");
            }

        };
        // 輸入框內按下enter
        const inputPressEnterHandler = (ev) => {
            if (ev.key === "Enter") {
                ev.preventDefault();
                sendMsgBtnClickHandler();
            }
        };

        // 在每一次聊天訊息重新渲染完之後再捲動卷軸，否則會少計算一段訊息
        useEffect(() => {
            scrollBack(crBodyRef.current);
            // 卷軸自動回到最下方
            function scrollBack(scrollEle) {
                scrollEle.scrollTo(0, scrollEle.scrollHeight - scrollEle.clientHeight);
            }
        }, [msgList])

        return <>
            <div className="chatroom" style={{ display: displayStyleText }}>
                <div className="chatroom__topbar">
                    <div className="chatroom__icon"></div>
                    <div className="chatroom__title">
                        <p>FunEvent 客服</p>
                    </div>
                </div>
                <div id="chatroom__body" className="chatroom__body" ref={crBodyRef}>
                    {
                        msgList.map((msgItem, index) => {
                            const { avatarImgUrl, name, text, isFromUser } = msgItem;
                            const isFirstMsg = index === 0;
                            return (
                                <ChatRoomMsg
                                    key={index}
                                    avatarImgUrl={avatarImgUrl}
                                    name={name}
                                    text={text}
                                    isFromUser={isFromUser}
                                    isFirstMsg={isFirstMsg}
                                />
                            )
                        })
                    }
                    {/* <div className="chatroom__msg fromOther firstmsg">
                        <div className="avatar" style={{ backgroundImage: "url(./assets/images/member-default-avatar.png)" }}></div>
                        <div className="content--container">
                            <div className="name"><p>FunEvent 小幫手</p></div>
                            <div className="text"><p>您好，我是FunEvent小幫手。<br />您今天好嗎？<br />很明顯我是用來湊字數的。<br />對於湊字數我還是略有涉略的。</p></div>
                        </div>
                    </div>
                    <ChatRoomMsg
                        avatarImgUrl="./assets/images/member-default-avatar.png"
                        name="FunEvent 小幫手"
                        text="您好，我是FunEvent小幫手。<br />您今天好嗎？<br />很明顯我是用來湊字數的。<br />對於湊字數我還是略有涉略的。"
                        isFromUser={false}
                    /> */}
                </div>

                <div className="chatroom__footer">
                    <button type="button" className="chatroom__plusicon"></button>
                    <ChatroomInput inputText={inputText} inputOnChangeHandler={inputOnChangeHandler} onKeyPressHandler={inputPressEnterHandler} />
                    <button id="chatroom__btn" className="chatroom__btn" type="button" onClick={sendMsgBtnClickHandler}>送出</button>
                </div>
            </div>
        </>
    }
    // const Chatroom = forwardRef();


    // 聊天訊息子組件
    function ChatRoomMsg({ avatarImgUrl, name, text, isFromUser = true, isFirstMsg = false }) {
        // 回傳html string，樣式都已經在css內做好了。頭像圖片直接寫在html屬性裡
        // 判斷訊息在聊天室左邊或右邊
        let fromWho = '';
        fromWho = isFromUser ? "fromUser" : "fromOther";
        // 判斷是否是第一條訊息
        let firstMsgClassName = "";
        firstMsgClassName = isFirstMsg ? " firstmsg" : "";
        return (
            <div className={"chatroom__msg" + " " + fromWho + firstMsgClassName} >
                <div className="avatar" style={{ backgroundImage: `url(${avatarImgUrl})` }}></div>
                <div className="content--container">
                    <div className="name"><p>{name}</p></div>
                    <div className="text"><p>{
                        // 用<br />分段文字
                        text.split("<br />").map((splitText, index, arr) => {
                            return <span key={index}>
                                {splitText}
                                {index == (arr.length - 1) ? "" : <br />}
                            </span>
                        })
                    }</p></div>
                </div>
            </div >
        )
    }

    // 聊天室輸入框子組件，推測：必須與主要組件分隔開來才能獨自重新渲染
    function ChatroomInput({ inputText, inputOnChangeHandler, onKeyPressHandler }) {
        return <>
            <textarea rows="1" id="chatroom__input" className="chatroom__input"
                placeholder="想問甚麼呢？"
                value={inputText}
                onChange={inputOnChangeHandler}
                onKeyPress={onKeyPressHandler}
            ></textarea>
        </>
    }

    return <>
        <div className="float-btn-box">
            <button type="button" className="go-top-btn" onClick={goTopBtnClickHandler}></button>
            <ChatroomSwitchBtn chatroomSwitchHandler={chatroomSwitchHandler} isActive={isChatroomActive} />
            {/* <button type="button" className="chatroom-btn" onClick={chatroomSwitchHandler}></button> */}
            <Chatroom isActive={isChatroomActive} />
        </div>
    </>
}