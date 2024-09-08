function FuneventTopicCard({ link = "#", title = "室內活動", bgUrl = "./assets/images/topic-pic01.jpg" }) {
    return <>
        <div className="funevent-topic-card">
            <a className="card-body" href={link} style={{backgroundImage: `url(${bgUrl})`}}>
                <div className="title">{title}</div>
            </a>
        </div>
    </>
}