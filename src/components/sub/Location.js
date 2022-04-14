import React, { useRef, useEffect, useState } from 'react';
import Layout from '../common/Layout';

function Location() {
    const path = process.env.PUBLIC_URL;
    const container = useRef(null);
    const { kakao } = window;

    //각 지점별 정보값을 배열로 그룹핑
    const info = [
        {
            title: '삼성동 코엑스',
            latlng: new kakao.maps.LatLng(37.512714519901536, 127.06064893707484),
            imgSrc: `${path}/img/marker1.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(110, 90) },
        },
        {
            title: '광화문 정문',
            latlng: new kakao.maps.LatLng(37.57599374423426, 126.97686384130986),
            imgSrc: `${path}/img/marker2.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(110, 90) },
        },
        {
            title: '남산 타워',
            latlng: new kakao.maps.LatLng(37.55163472770302, 126.98815135296329),
            imgSrc: `${path}/img/marker3.png`,
            imgSize: new kakao.maps.Size(232, 99),
            imgPos: { offset: new kakao.maps.Point(110, 90) },
        },
    ];
    const [map, setMap] = useState(null);
    const [traffic, setTraffic] = useState(false);
    const [mapInfo, setMapInfo] = useState(info);
    //지점 순번을 관리할 state생성
    const [index, setIndex] = useState(0);

    useEffect(() => {
        //기존 지도 안쪽으 ㅣ컨텐츠를 비워서 초기화 
        container.current.innerHTML = '';
        //위치 정보값을 객체로 받아 화면에 지도표시 인스턴스 생성
        const options = {
            center: mapInfo[index].latlng,
            level: 3,
        };
        const mapInstance = new kakao.maps.Map(container.current, options);

        //마커 위치, 마커이미지 정보값을 객체로 받아서 마커표시 인스턴스 생성
        const markerPosition = mapInfo[index].latlng;
        const imgSrc = mapInfo[index].imgSrc;
        const imgSize = mapInfo[index].imgSize;
        const imgPos = mapInfo[index].imgPos;
        const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            image: markerImg,
        });

        //해당 지도인스턴에스 마커를 세팅
        marker.setMap(mapInstance);

        //지도 위치 가운데 이동 함수 
        const mapInit = () => {
            mapInstance.setCenter(mapInfo[index].latlng)
        }

        //지도 인스턴스를 최종적으로 map 스테이트에 저장
        setMap(mapInstance);


        //브라우저 리사이즈시 mapInit호출
        window.addEventListener("resize", mapInit);
        //해당 컴포넌트 사라질때 전역 window에 등록되어 있는 이벤트핸들러도 같이 삭제 
        return () => {
            window.removeEventListener("resize", mapInit);
        }

    }, [index]); //index 의존성을 추가해서 index 스테이트가 변경될때마다 맵화면 다시 출력

    useEffect(() => {
        handleTraffic();
    }, [traffic]);

    const handleTraffic = () => {
        if (map) {
            traffic
                ? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
                : map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
        }
    };

    return (
        <Layout name={'location'}>
            <div id='map' ref={container}></div>
            <button onClick={() => setTraffic(!traffic)}>
                {traffic ? 'Traffic OFF' : 'Traffic On'}
            </button>

            <ul className='branch'>
                {/* mapInfo를 통해 동적으로 버튼 생성 */}
                {mapInfo.map((info, idx) => {
                    return (
                        <li
                            key={idx}
                            onClick={() => {
                                setIndex(idx);
                            }}>
                            {info.title}
                        </li>
                    );
                })}
            </ul>
        </Layout>
    );
}










export default Location;