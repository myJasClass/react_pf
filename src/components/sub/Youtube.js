import Layout from '../common/Layout';
import Popup from '../common/Popup';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Youtube() {
    const [items, setItems] = useState([]);
    //팝업생성유무를 관리하는 state생성
    const [open, setOpen] = useState(false);
    //article 클릭시 클릭한 리스트의 순서값이 담길 state
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const key = "AIzaSyBvsp8axuv6QfSbIxwPL5NdNozqiGpaecU";
        const playListId = "PL8fxtyu_25VFJ9aL0jqt5QtL8FCc6dQXu";
        const num = 6;
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;
        axios.get(url).then((json) => {
            console.log(json.data.items);
            setItems(json.data.items);
        });
    }, []);

    return (
        <>
            <Layout name={'youtube'}>
                {
                    items.map((item, idx) => {
                        let tit = item.snippet.title;
                        let desc = item.snippet.description;
                        let date = item.snippet.publishedAt;
                        if (tit.length > 36) tit = tit.substring(0, 36) + '...';
                        // if (desc.length > 40) desc = desc.substring(0, 40) + '...';
                        // date = date.split("T")[0].replace(/-/g, '.');

                        return (
                            //클릭이벤트 발생시 open값 true로 변경 

                            <article key={idx} onClick={() => {
                                setOpen(true);
                                setIndex(idx);
                            }}>
                                <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                                <h2>{tit}</h2>
                                {/* <p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p> */}
                                <p>{desc}</p>
                                <span>{date.split('T')[0]}</span>
                            </article>
                        )
                    })
                }

            </Layout>
            {/* open state값이 true일때 팝업이 보이고 그렇지 않으면 없앰 */}
            {open
                ?
                <Popup setOpen={setOpen}>
                    <iframe src={'https://www.youtube.com/embed/' + items[index].snippet.resourceId.videoId} frameBorder="0"></iframe>
                </Popup>
                :
                null}
        </>
    )
}



export default Youtube