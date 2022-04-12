
import React, { useState, useEffect } from 'react';
import './styles.css';


const QuoteArray = (props) => {
  const { data } = props;

  return (
    <div>
      <ul>
        {data.map((item) => (
          <p>
            {item.quote} ( {item.author} )
          </p>
        ))}
      </ul>
    </div>
  );
};

const GetData = () => {
  const [quotes, setQuotes] = useState(null)
  useEffect(() => {
    fetch("https://api.jsonbin.io/b/5e9ef7272940c704e1dc1099")
      .then((results) => {
        console.log("fetched");
        return results.json();
        
      })
      .then((data) => {
        console.log(data.quotes)
        setQuotes(data.quotes)
      });
  }, [])

  return (
    <>
      {
        quotes ?
          <QuoteArray quotes={quotes} />
          : <div>Nothing here.Fething data...</div>
      }
    </> 
  );
}; 




const App = () => {

  return (
    <>
    <button>Button</button>
    </>
  )}

export default App;
