(function(root){
function shuffle(items,rng=Math.random){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function round(questions,rng=Math.random){const pool=questions.filter(q=>q.editorial_status==='Da testare nel quiz'),uncleCount=2+Math.floor(rng()*3),publics=shuffle(pool.filter(q=>q.answer==='public'),rng).slice(0,10-uncleCount),used=new Set(publics.map(q=>q.pair_id)),uncles=shuffle(pool.filter(q=>q.answer==='uncle'&&!used.has(q.pair_id)),rng).slice(0,uncleCount);if(publics.length+uncles.length!==10)throw Error('Domande insufficienti');return shuffle([...publics,...uncles],rng)}
root.DUS_CORE={shuffle,round};
})(typeof window==='undefined'?globalThis:window);
