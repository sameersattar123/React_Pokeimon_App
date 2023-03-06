import React, { useEffect, useState } from "react";
import Card from "./Card";
import PokeiInfo from "./PokeiInfo";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [next, setNexturl] = useState();
  const [pervious, setPerviousUrl] = useState();
  const [pokeDex, setpokeDex] = useState();

  const PokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNexturl(res.data.next);
    setPerviousUrl(res.data.pervious);
    getPokemon(res.data.results);
    setLoading(false);
    // console.log(pokeData)
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a,b) => a.id > b.id? 1 : -1)
        return state;
      });
    });
  };

  useEffect(() => {
    PokeFun();
  }, [url]);

  return (
    <div className="container">
      <div className="left-content">
        <Card
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setpokeDex(poke)}
        />
        <div className="btn-group">
       

          <button
            onClick={() => {
              setPokeData([]);
              setUrl(pervious);
            }}
          >
            Pervious
          </button>
    
        
        
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(next);
            }}
          >
            Next
          </button>
        
        
         
        </div>
      </div>
      <div className="right-content">
        <PokeiInfo data={pokeDex} />
      </div>
    </div>
  );
};

export default Main;
