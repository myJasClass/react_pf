import { Route, Switch } from 'react-router-dom';

import './scss/style.scss';
//common 컴포넌트 

import Header from './components/common/Header';
import Footer from './components/common/Footer';

//main 컴포넌트 
import Visual from './components/main/Visual';
import Content from './components/main/Content';

//sub 컴포넌트 
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Location from './components/sub/Location';
import Join from './components/sub/Join';



function App() {
  return (
    <>
      {/* Switch 같은 경로의 router연결시 구체적인 라우터 하나만 적용 */}
      <Switch>
        <Route exact path='/'>
          {/* 메인에만 적용되는 header */}
          <Header type={'main'} />
          <Visual />
          <Content />
        </Route>

        <Route path='/'>
          {/* 서브에만 적용되는 header */}
          <Header type={'sub'} />
        </Route>
      </Switch>

      <Route exact path='/youtube' component={Youtube} />
      <Route exact path='/gallery' component={Gallery} />
      <Route exact path='/member' component={Member} />
      <Route exact path='/location' component={Location} />
      <Route exact path='/join' component={Join} />


      <Footer />
    </>
  );
}

export default App;
