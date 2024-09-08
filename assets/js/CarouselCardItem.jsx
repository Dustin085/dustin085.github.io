function CarouselCardItem({
    title = "【活動講座】繪本辦桌秀一下!親子活動-台中國家歌劇院",
    imgUrl = "./assets/images/demo-event-pic/for-bot-caro-pic1.jpg" }) {
    return <>
        <a href="./event/event.html" className="carousel-card">
            <figure className="fig"><img src={imgUrl} alt="" /></figure>
            <h3 className="title">{title}</h3>
        </a>
    </>
}