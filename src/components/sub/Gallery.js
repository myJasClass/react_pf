import Layout from '../common/Layout';
import Popup from '../common/Popup';
import axios from 'axios';
import { useEffect, useState } from 'react';
const path = process.env.PUBLIC_URL;

function Gallery() {
  const base = "https://www.flickr.com/services/rest/?";
  const method1 = "flickr.interestingness.getList";
  const key = "89aae050d1d8c006bdb5bf866029199d";
  const per_page = 15;
  const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;


  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(url).then((json) => {
      console.log(json.data.photos.photo);
      setItems(json.data.photos.photo);
    });
  }, []);

  return (
    <>
      <Layout name={'gallery'}>
        <ul>
          {items.map((item, idx) => {
            return (
              <li key={idx} onClick={() => {
                setOpen(true);
                setIndex(idx);
              }}>
                <div className="inner">
                  <div className="pic">
                    <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} />
                  </div>
                  <h2>{item.title}</h2>
                </div>
              </li>
            )
          })}
        </ul>
      </Layout>

      {open ? (
        <Popup setOpen={setOpen}>
          <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} />
        </Popup>
      ) : null}
    </>
  )
}

export default Gallery