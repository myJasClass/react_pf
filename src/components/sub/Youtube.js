import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Youtube() {
    const [items, setItems] = useState([]);
    const key = "AIzaSyBvsp8axuv6QfSbIxwPL5NdNozqiGpaecU";
    const playListId = "PL8fxtyu_25VFJ9aL0jqt5QtL8FCc6dQXu";
    const num = 6;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

    useEffect(() => {
        axios.get(url).then((json) => {
            console.log(json.data.items);
            setItems(json.data.items);
        });
    }, []);
    return (
        <Layout name={'youtube'}>
            <ul className="playList">
                {
                    items.map((item, idx) => {
                        let tit = item.snippet.title;
                        let desc = item.snippet.description;
                        let date = item.snippet.publishedAt;
                        if (tit.length > 36) tit = tit.substring(0, 36) + '...';
                        // if (desc.length > 40) desc = desc.substring(0, 40) + '...';
                        // date = date.split("T")[0].replace(/-/g, '.');



                        return (


                            <li key={idx}>
                                <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                                <h2>{tit}</h2>
                                <p>{desc.length > 150 ? desc.substr(0, 150) + '...' : desc}</p>
                                <span>{date.split('T')[0]}</span>
                            </li>
                        )
                    })
                }
            </ul>
        </Layout>
    )
}

export default Youtube