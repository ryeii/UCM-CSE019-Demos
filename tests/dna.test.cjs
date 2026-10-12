const {test}=require('node:test');
const assert=require('node:assert/strict');
const M=require('../demos/dna-model.js'),D=require('../demos/data/hbb-data.js');
test('candidate ORF follows the start frame and includes the stop in its slice',()=>{
 const dna='CCGTAATGAAATGCGGTTAACCGTACG',trace=M.scanORF(dna),result=trace.at(-1);
 assert.equal(result.start,5);assert.equal(result.end,20);assert.equal(result.result,'ATGAAATGCGGTTAA');
 assert.deepEqual(trace.filter(s=>s.phase==='stop').map(s=>s.i),[8,11,14,17]);
 assert.equal(dna.slice(6,9),'TGA'); // Out-of-frame stop must be ignored.
});
test('missing start, missing stop, incomplete triplets, and start at zero',()=>{
 for(const s of ['','A','AT','CCCCCC','CCGTAATGAAATGCGGTCCACCGTACG'])assert.equal(M.scanORF(s).at(-1).result,'');
 assert.equal(M.scanORF('ATGTAACC').at(-1).result,'ATGTAA');
 assert.equal(M.scanORF('ATGCCCTA').at(-1).end,null);
 for(const stop of M.stops)assert.equal(M.scanORF('ATGCCC'+stop).at(-1).result,'ATGCCC'+stop);
});
test('search includes the final possible slice and retains multiple hits',()=>{
 assert.deepEqual(M.exactMatches('AAACAA','AA'),[0,1,4]);
 assert.deepEqual(M.exactMatches('AAC','AAC'),[0]);
 assert.deepEqual(M.exactMatches('AAC','TTT'),[]);
});
test('real marker uniquely locates the annotated reverse-strand HBB site in this region',()=>{
 assert.equal(D.sequence.length,30000);assert.equal(D.marker.length,30);
 assert.equal(M.reverseComplement(D.marker),D.needle);
 assert.deepEqual(M.exactMatches(D.sequence,D.needle),[16991]);
 assert.deepEqual([D.regionStart+D.span[0],D.regionStart+D.span[1]-1],[5225464,5227071]);
});
test('reverse complement and annotated splicing recreate the complete HBB transcript and CDS',()=>{
 const gene=M.reverseComplement(D.sequence.slice(...D.span));assert.equal(gene.length,1608);
 const transcript=D.orientedExons.map(([a,b])=>gene.slice(a,b)).join('');
 assert.equal(transcript,D.transcript);assert.equal(transcript.length,628);
 const cds=transcript.slice(...D.cdsSlice);assert.equal(cds.length,444);assert.equal(cds.slice(0,3),'ATG');assert.equal(cds.slice(-3),'TAA');
 assert.equal(cds.slice(18,21),'GAG');const hbs=cds.slice(0,19)+'T'+cds.slice(20);assert.equal(hbs.slice(18,21),'GTG');assert.equal(hbs.length,cds.length);
 assert.equal([...cds].filter((b,i)=>b!==hbs[i]).length,1);
 assert.equal(M.reverseComplement(M.reverseComplement(D.sequence)),D.sequence);
});
