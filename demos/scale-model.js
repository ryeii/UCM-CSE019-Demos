(function(root){
  const size=19;
  function neighbors(i){const x=i%size,y=Math.floor(i/size);return [x>0?i-1:-1,x<size-1?i+1:-1,y>0?i-size:-1,y<size-1?i+size:-1].filter(n=>n>=0)}
  function group(board,start){const color=board[start],stones=new Set([start]),liberties=new Set(),stack=[start];while(stack.length){for(const n of neighbors(stack.pop())){if(board[n]===0)liberties.add(n);else if(board[n]===color&&!stones.has(n)){stones.add(n);stack.push(n)}}}return {stones,liberties}}
  function goScore(board,i){if(board[i])return {legal:false,reason:'occupied'};const next=board.slice();next[i]=1;let captured=0;for(const n of neighbors(i)){if(next[n]!==2)continue;const g=group(next,n);if(g.liberties.size===0){captured+=g.stones.size;for(const s of g.stones)next[s]=0}}const own=group(next,i);if(!own.liberties.size)return {legal:false,reason:'suicide'};return {legal:true,score:captured*100+own.liberties.size,captured,liberties:own.liberties.size}}
  function board(){const b=Array(size*size).fill(0);for(const [x,y,c] of [[9,8,2],[8,8,1],[10,8,1],[9,7,1],[8,9,2],[8,10,1],[7,9,1],[10,9,2],[11,9,1],[10,10,1],[9,10,2],[9,11,1]])b[y*size+x]=c;for(const [x,y,c] of [[3,3,1],[4,3,1],[3,4,2],[4,4,2],[5,4,2],[5,3,1],[14,3,2],[15,3,2],[14,4,1],[15,4,1],[16,4,2],[3,14,2],[4,14,1],[3,15,2],[4,15,1],[5,15,1],[14,14,1],[15,14,2],[14,15,1],[15,15,2],[16,15,2],[2,8,1],[3,8,2],[15,9,1],[16,9,2]])b[y*size+x]=c;return b}
  const bases=['123456','password','qwerty','letmein','welcome','abc123','monkey','dragon','football','sunshine','princess','admin','login','hello','secret','master','summer','winter','baseball','iloveyou'];
  const passwords=[...bases];for(let suffix=0;passwords.length<6000;suffix++)for(const base of bases){if(passwords.length<6000)passwords.push(base+String(suffix).padStart(3,'0'))}
  const products=Array.from({length:600},(_,i)=>({name:'Bottle '+String(i+1).padStart(3,'0'),cents:1200+((i*7919+1237)%7800)}));products[547].cents=899;
  const api={size,neighbors,group,goScore,board,passwords,products};root.LargeDemo=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
