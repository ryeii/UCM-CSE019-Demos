/* Pure algorithms shared by the visualizer and its checks. */
(function(root){
 const stops=['TAA','TAG','TGA'];
 function reverseComplement(dna){const complement={A:'T',T:'A',C:'G',G:'C'};return [...dna].reverse().map(b=>complement[b]).join('')}
 function scanORF(dna){
  const steps=[{phase:'ready',i:null,start:null,end:null,lines:[0,1],title:'Find the first ATG',detail:'Read this synthetic DNA strand from 5′ to 3′.'}];
  let start=null,end=null;
  for(let i=0;i<dna.length-2;i++){
   const triplet=dna.slice(i,i+3),found=triplet==='ATG';
   if(found)start=i;
   steps.push({phase:'start',i,start,end,lines:found?[2,3,4,5]:[2,3],title:found?'ATG found · set the reading frame':'Slide by one base',detail:`dna[${i}:${i+3}] = "${triplet}"${found?'; the next codon starts at '+(i+3)+'.':'; keep looking.'}`});
   if(found)break;
  }
  if(start!==null){
   for(let i=start+3;i<dna.length-2;i+=3){
    const triplet=dna.slice(i,i+3),found=stops.includes(triplet);if(found)end=i+3;
    steps.push({phase:'stop',i,start,end,lines:found?[7,8,9,10,11]:[7,8,9],title:found?'In-frame stop found':'Advance by three bases',detail:`dna[${i}:${i+3}] = "${triplet}"${found?'; end = '+end+' excludes the next base.':'; stay in the ATG reading frame.'}`});
    if(found)break;
   }
  }
  steps.push({phase:'done',i:steps.at(-1).i,start,end,lines:[12],title:end!==null?'Slice the candidate ORF':start===null?'No ATG found':'No complete ORF found',detail:end!==null?`dna[${start}:${end}] contains ${end-start} bases, including the stop codon.`:start===null?'This first-ATG scan returns an empty string.':'The first ATG has no following in-frame stop in this sequence.',result:end!==null?dna.slice(start,end):''});
  return steps;
 }
 function exactMatches(dna,needle){const hits=[];for(let i=0;i<=dna.length-needle.length;i++)if(dna.slice(i,i+needle.length)===needle)hits.push(i);return hits}
 const api={stops,reverseComplement,scanORF,exactMatches};root.DNA_MODEL=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
