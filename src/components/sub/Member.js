import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Member() {
    const path = process.env.PUBLIC_URL;
    const [members, setMembers] = useState([]);

    useEffect(() => {
        axios.get(`${path}/DB/member.json`).then((json) => {
            console.log(json.data.data);
            setMembers(json.data.data);
        });
    }, []);

    return (
        <Layout name={'member'}>
            {/* <button onClick={() => {
                const newMembers = [...members];
                newMembers[0].name = 'Jane';
                setMembers(newMembers);
            }}>멤버정보 변경</button> */}
            <ul className="memberList">
                {members.map((member, idx) => {
                    return (
                        <li key={idx}>
                            <img src={`${path}/img/${member.pic}`} alt="" />
                            <h2>{member.name}</h2>
                            <p>{member.position}</p>
                        </li>
                    )
                })}
            </ul>
        </Layout>
    )
}

export default Member