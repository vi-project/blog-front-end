import * as React from 'react';
import ContainerBox from '../component/Container';
import '../public/style/index.css';

interface IHomeProps {
  Component: React.ElementType
  [key: string] : any
}

const App: React.FunctionComponent<IHomeProps> = ({Component, pageProps}) =>{
    return <ContainerBox>
        <Component {...pageProps} />
    </ContainerBox>;
};

export default App;
