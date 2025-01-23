import { StrictMode, useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import messages from './messages';

function App(){
  const [buttonStatus, setButtonStatus] = useState({status:false, class:'startButton'});
  const [rotatingStatus, setRotatingStatus] = useState('fortune-wheel');
  const [arrowStatus, setArrowStatus] = useState('fa-solid fa-play arrow');
  const [arrcStatus, setArrcStatus] = useState('arrow-container');
  const [displayMessage, setDisplayMessage] = useState({status:false, message:''});
  const wheel = useRef(null);
  const randomAngle = Math.floor(Math.random()*720) + 1800;

  const handleSpin = () => {
    if(buttonStatus.status) return;

    setButtonStatus({status:true, class:'startButton disabledButton'});
    setRotatingStatus('fortune-wheel stopWheel');
    setArrowStatus('fa-solid fa-play arrow moveArrow');
    setArrcStatus('arrow-container arrcMove');

    setTimeout(()=>{
      wheel.current.style.transform = `rotate(${randomAngle}deg)`;
    },1);

    setTimeout(()=>{
      setArrowStatus('fa-solid fa-play arrow');
      setArrcStatus('arrow-container');
    },4500);

    setTimeout(()=>{
      setDisplayMessage({status:true, message: messages[Math.floor(Math.random()*messages.length)].message});
    },4900);
  }

  const nextSpin = () => {
    setDisplayMessage({status:false, message:''});
    setButtonStatus({status: false, class:'startButton disabledButton'});
    wheel.current.style.transform = `rotate(0deg)`;
    setRotatingStatus('fortune-wheel');
  }

  return (
    <>
      <h1 className='title'>FORTUNE WHEEL</h1>
      <div className='app'>
        <div ref={wheel} className={rotatingStatus}>
        </div>
        <div className={arrcStatus}><i className={arrowStatus}></i></div>
        <button className={buttonStatus.class} onClick={()=>handleSpin()}>SPIN</button>
      </div>
      {displayMessage.status && (
        <div className='message'>
          <h1>{displayMessage.message}</h1>
          <button onClick={()=>nextSpin()}>EXIT</button>
        </div>
      )}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
