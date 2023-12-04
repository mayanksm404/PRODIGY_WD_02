
import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [lap, setLap] = useState([]);
  const [lapDiff, setLapDiff] = useState([]);
  //const lap=null;
  useEffect(() => { 
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 10)
      }, 10)
    }
    else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerOn])

  function lapHandler() {
    if (lapDiff.length >= 1) {
      const diff = timer - lap[lap.length - 1];
      setLapDiff((prev) => [...prev, diff]);
    }
    else {
      setLapDiff((prev) => [...prev, timer]);
    }
    setLap((prev) => [...prev, timer]);
    console.log(lapDiff);
    console.log(lap);
  }

  return (
    <div className="App w-full min-h-screen back">
      <div className='flex flex-col justify-center items-center'>
        <div className='mt-10 uppercase font-bold text-3xl text-cyan-100'>Stopwatch</div>
        <div className='back1 shadow-2xl shadow-black font-semibold rounded-lg mt-10 text-3xl w-[400px] py-2 text-cyan-100 flex justify-center items-center'>
        <span className=' w-[90px]'>{("0" + Math.floor((timer / 360000))).slice(-2)}</span>
          <span className=' w-[10px]'>:</span>
          <span className=' w-[90px]'>{("0" + Math.floor((timer / 60000) % 60)).slice(-2)}</span>
          <span className=' w-[10px]'>:</span>
          <span className='w-[90px]'>{("0" + Math.floor((timer / 1000) % 60)).slice(-2)}</span>
          <span className='w-[10px]'>:</span>
          <span className='w-[90px]'>{("0" + ((timer / 10) % 100)).slice(-2)}</span>
        </div>
        <div className='mt-10 w-[300px] gap-8 flex justify-center'>
          {
            !timerOn && timer === 0 && (
              <button onClick={() => setTimerOn(true)} className='px-3 border  text-cyan-100 uppercase font-semibold rounded-md py-[0.15rem] text-lg'>Start</button>
            )
          }
          {
            timerOn && (
              <button onClick={() => setTimerOn(false)} className='px-3 border  text-cyan-100 uppercase font-semibold rounded-md py-[0.15rem] text-lg'>Pause</button>
            )
          }
          {
            !timerOn && timer !== 0 && (
              <button onClick={() => setTimerOn(true)} className='px-3 border  text-cyan-100 uppercase font-semibold rounded-md py-[0.15rem] text-lg'>Resume</button>
            )
          }
          {
            timer > 0 && (
              <button onClick={() => {
                setTimer(0);
                setTimerOn(false);
                setLap(() => []);
                setLapDiff(() => [])
              }}
                className='px-3 border  text-cyan-100 uppercase font-semibold rounded-md py-[0.15rem] text-lg'>Reset</button>
            )
          }
          {
            timerOn && (
              <button onClick={lapHandler} className='px-3 border text-cyan-100 uppercase font-semibold rounded-md py-[0.15rem] text-lg'>Lap</button>
            )
          }
        </div>
        {
          lap.length>0 && (
            <div className='flex fon justify-center items-center gap-10 mt-10 back1 text-2xl text-cyan-100 px-5 py-3 mb-10 rounded-xl'>
          <div>
          <div  className=' text-emerald-400 fon font-semibold uppercase mb-2'  >Lap</div>
            {
              lap.map((lap,index)=>(
                <div className='mb-2'
                >{`${index+1}`}</div>
              ))
            }
          </div>
          <div>
          <div  className=' text-emerald-400 fon font-semibold uppercase mb-2'>Lap Time</div>
            {
              lapDiff.map((time) => (
                <div className='mb-2'>
                  <span>{("0" + Math.floor((timer / 360000))).slice(-2)}:</span>
                  <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                  <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                  <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div>
              ))
            }
          </div>
          <div>
          <div className=' text-emerald-400 fon font-semibold uppercase mb-2'>Total time</div>
            {
              lap.map((time) => (
                <div className='mb-2'>
                  <span>{("0" + Math.floor((timer / 360000))).slice(-2)}:</span>
                  <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                  <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
                  <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                </div>
              ))
            }
          </div>
        </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
