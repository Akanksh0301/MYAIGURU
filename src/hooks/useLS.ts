import {useEffect,useState} from 'react';
export function useLS<T>(k:string,init:T):[T,(v:T|((p:T)=>T))=>void]{
  const read=():T=>{try{const x=localStorage.getItem(k);return x?JSON.parse(x):init}catch{return init}};
  const [v,setV]=useState<T>(read);
  useEffect(()=>{const h=()=>setV(read());window.addEventListener('ls:'+k,h);return()=>window.removeEventListener('ls:'+k,h)},[k]);
  const set=(n:T|((p:T)=>T))=>{const nv=typeof n==='function'?(n as (p:T)=>T)(read()):n;localStorage.setItem(k,JSON.stringify(nv));window.dispatchEvent(new Event('ls:'+k))};
  return [v,set];
}
