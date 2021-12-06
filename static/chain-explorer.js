var gateway = "//ipfs.arching-kaos.com/ipfs/"
var stellarExpert = "https://stellar.expert/explorer/public/account/"
var stellarOperation = "https://stellar.expert/explorer/public/tx/"
var ipns = "//ipfs.arching-kaos.com/ipns/"
function getProfileURL(address){
	return "https://horizon.stellar.org/accounts/"+address+"/data/config"
}
var some=""
var template=""
var mixtapes=[]
var datas=[]
var indexedZBLOCK=[]
var indexedLTX=[]
function gurl(ipfs){
	return gateway.concat(ipfs)
}
function staccurl(a){
	return stellarExpert.concat(a)
}
function sttx(a){
	return stellarOperation.concat(a)
}
function ipnser(a) {
	return ipns.concat(a)
}
function returnIFrame(src){
	let base = document.querySelector(".news-container")
	template = `<iframe src="${src.attributes.link.nodeValue}" id="the-frame"></iframe>`
	base.innerHTML+=template
	document.selectElementById("the-frame").color("#000")
}
function toggleDetails(t){
	(t.children[2].hidden===true?t.children[2].hidden=false:t.children[2].hidden=true)
}
function b64_to_utf8( str ) {
	return decodeURIComponent(escape(window.atob( str )));
}
async function IPNSfetcher(ipns) {
	try {
		let response = await fetch(ipnser(ipns))
		.then(response => {
			const contentType = response.headers.get('content-type');
			if (!contentType || !contentType.includes('application/json')) {
				if (contentType.includes('text/plain')){
					if (!response){
						return response.text()
					}
					else {
						return "text "+response.text()
					}
				}
				//throw new TypeError("lol");
			}
			return response.json()
		})
		.then(v=>(v?console.log("Nickname found: ", v.profile.nickname):console.log("error?")))
	}
	catch (error) {
		console.log(error)
	}
}
async function getNickname(address){
	try {
		//console.log("We are going to ask for this: "+getProfileURL(address))
		let response = await fetch(getProfileURL(address))
		.then(response => {
			const contentType = response.headers.get('content-type');
			if (!contentType || !contentType.includes('application/json')) {
				if (contentType.includes('text/plain')){
					if(!response){
						return "GOT: text/plain... "+response.text()
					}
					else {
						return "Text/plain: "+response.text()
					}
				}
//				throw new TypeError("NotJSON");
			}
			return response.json()
		})
		.then(v=>(v?IPNSfetcher(b64_to_utf8(v.value)):console.log("unknown error"+address+" "+v.text())))
	}
	catch (error) {
		console.log(error)
	}

}

async function doThis(previous_zblock){
//	console.log(previous_zblock)
	try {
		let res = fetch(gurl(previous_zblock))
		.then(response => {
			const contentType = response.headers.get('content-type');
			if (!contentType || !contentType.includes('application/json')) {
				if (contentType.includes('text/plain')){
					if (!response){
						return "Possibly GENESIS"
					}
					else {
						return "Not genesis but got text: "+response.text()
					}
				}
//				throw new TypeError("Oops, we haven't got JSON!");
			}
//			console.log("L:70")
			return response.json();
			})
		.then(v=>(v.block?doThis(v.block):console.log("A point in the algorithm: ",v)))
	//		else{
	//			console.log("not that cool")
	//		}
		//	res.json().then(v=>getPreviousBlock(v.block,v.block_signature))
		
	}
	catch (error) {
		console.log(error)
	}
}
//async function getPreviousBlock(a,b){
//	try{
//		let res = await fetch(gurl(a))
//		if(res.json().then(v=>(v.previous?doThis(v.previous):console.log("Error with PREVIOUS_GET: ",v)))
//			console.log("??????")
//	}
//	catch (error) {
//		console.log(error)
//	}
//}
//async function fromLatestPreviousGetAllPrevious(zc){
//	console.log("ZC: ", zc)
//	try{
//		let res = await fetch(gurl(zc))
//		res.json().then(v=>console.log("getPreviousBlock(",gurl(v.block),v))
//	}
//	catch (error) {
//		console.log(error)
//	}
//}
function zblockGrab(url){
	fetch(url, {
		method:'GET',
		headers:{
			Accept: 'application/json'
		}
	}).then(response=>{
		if(response.ok){
			response.json().then(json=>{
				return json.block
			})
		}
	})
}
async function getzblock(u,r,iv){
	//console.log("Getting ZBLOCK: ",r)
	try{
		let res = await fetch(u);
		res.json().then(v=>getblock(gurl(v.block),v,r,iv))
	}
	catch (error) {
		console.log(error)
	}
}
async function getblock(u,zblock,zblockCID,iv){
	//console.log("Getting BLOCK: ",zblock.block,", from ZBLOCK: ",zblockCID)
	try{
		let res = await fetch(u);
		res.json().then(v=>getaction(v,zblock,zblockCID,iv))
	}
	catch (error) {
		console.log(error)
	}
}
async function getaction(block, zblock, zblockCID,iv){
	//console.log("Getting action on: ",block,zblock.block,zblockCID)
	try{
	//	if(block.action === 'mixtape/add'){
	//		let res = await fetch(gurl(block.data));
	//		res.json().then(v=>indexMixtape(v,block,zblock,zblockCID,iv))
	//	}
	//	else if(block.action === 'news/add'){
	//		let res = await fetch(gurl(block.data));
	//		res.json().then(v=>indexNews(v,block,zblock,zblockCID,iv))
	//	}
	//	else{
			let res = await fetch(gurl(block.data));
			res.json().then(v=>indexDataBlocks(v,block,zblock,zblockCID,iv))
	//	}
	}
	catch (error) {
		console.log(error)
	}
}
async function getSignaturesAndKey(s)
{
	console.log("TODO: About to get signature: ", s)
}
async function indexDataBlocks(data,block,zblock,zblockCID,iv){
	content = JSON.stringify(data,null,'\t')
	//content = await fetch(gurl(data.ipfs)).then(x=>x.text())
	tx = txs[findLatestTransactionFromZblockCID(zblockCID, iv)]
	atx = findTransactionsFromZBLOCKCID(zblockCID,iv)
	ab = txs[atx[4]]
	ac = txs[atx[3]]
	ad = txs[atx[2]]
	bc = txs[atx[1]]
	bd = txs[atx[0]]
	data_thing = {
		"zblock":zblockCID,
		"block":zblock.block,
		"blocksignature":zblock.block_signature,
		"ltx": tx.tx,
		"from": tx.from,
		"to": tx.to,
		"memo": tx.memo,
		"ab": ab,
		"ac": ac,
		"ad": ad,
		"bc": bc,
		"bd": bd,
		"action": block.action,
		"data":block.data,
		"content": content,
		"file": data.ipfs,
		"filesig":data.detach,
		"datasig":block.detach,
		"gpg":block.gpg,
		"previous":block.previous
	}
	//console.log(indexZBLOCK(data_thing))
	await getNickname(tx.from)
	datas.push(data_thing)
	showDataThing(data_thing)
	doThis(data_thing.previous)
	renderDataToPage=true
	if(renderDataToPage){
		if(block.action === 'mixtape/add'){
			let res = await fetch(gurl(block.data));
			res.json().then(v=>indexMixtape(v,block,zblock,zblockCID,iv))
		}
		else if(block.action === 'news/add'){
			let res = await fetch(gurl(block.data));
			res.json().then(v=>indexNews(v,block,zblock,zblockCID,iv))
		}
		else{
			console.log("Genesis?????")
		}
	}


}
async function indexNews(dataIndexed,data,block,zblock,zblockCID,iv){
	//console.log(data)
	content = await fetch(gurl(data.ipfs)).then(x=>x.text())
	tx = txs[findLatestTransactionFromZblockCID(zblockCID, iv)]
	atx = findTransactionsFromZBLOCKCID(zblockCID,iv)
	news_thing = {
		"data":block.data,
		"featureImage":data.image,
		"content": content,
		"date": data.date,
	}
//	console.log(indexZBLOCK(news_thing))
	news.push(news_thing)
	showNewThing(news_thing)
}
async function indexMixtape(data,block,zblock,zblockCID,iv){
	tx = txs[findLatestTransactionFromZblockCID(zblockCID, iv)]
	atx = findTransactionsFromZBLOCKCID(zblockCID,iv)
	ab = txs[atx[4]]
	ac = txs[atx[3]]
	ad = txs[atx[2]]
	bc = txs[atx[1]]
	bd = txs[atx[0]]
	mixtape = {
		"zblock":zblockCID,
		"block":zblock.block,
		"blocksignature":zblock.block_signature,
		"ltx": tx.tx,
		"from": tx.from,
		"to": tx.to,
		"memo": tx.memo,
		"ab": ab,
		"ac": ac,
		"ad": ad,
		"bc": bc,
		"bd": bd,
		"action": block.action,
		"data":block.data,
		"artist":data.artist,
		"title":data.title,
		"file":data.ipfs,
		"filesig":data.detach,
		"datasig":block.detach,
		"gpg":block.gpg,
		"previous":block.previous
	}
	//console.log(indexZBLOCK(mixtape))
	mixtapes.push(mixtape)
	showMixtape(mixtape)
}
function indexZBLOCK(z){
	x = [
		z.ltx,
		z.memo,
		[
			z.ab,
			z.ac,
			z.ad,
			z.bc,
			z.bd
		],
		z.zblock,
		z.block,
		[
			z.action,
			z.data,
			[
				z.artist,
				z.title,
				z.file,
				z.filesig
			],
			z.datasig,
			z.gpg,
			z.previous
		]
	]
	return x
}
function utilities(mx){
	return `<div class="utilities">
				<a href="${gurl(mx.file)}">Permalink</a> ${getDetails(mx)}
				<p id="gotop-link"><a href="#top"><span class="mdi mdi-arrow-up"></span> Top</a></p>
			</div>
			<hr>`
}
/*
 * Gets a mixtape type data and shows it to the .container div element.
 * @param mx
 */
function showMixtape(mx){
	//console.log("Working on: ",mx)
	template = `
		<div class="mixtape" id="${mx.zblock}">
			<h3>${mx.artist} - ${mx.title}</h3>
			<audio controls="">
				<source src="${gurl(mx.file)}">
			</audio>
			${utilities(mx)}
		</div>`
	let base = document.querySelector(".mixtapes-container")
	base.innerHTML+=template
}
function showDataThing(mx){
	//console.log("Working on: ",mx)
	template = `
		<div class="data-thing" id="${mx.zblock}">
			<h3>Found on ${mx.zblock}</h3>
			<h4>Action</h4>
			<p><pre>${mx.action}</pre></p>
			<h4>Data found on ${mx.data}</h4>
			<p><pre>${mx.content}</pre></p>
			${utilities(mx)}
		</div>`
	let base = document.querySelector(".datas-container")
	base.innerHTML+=template
}
function showNewThing(mx){
	//console.log("Working on: ",mx)
	template = `
		<div class="news-thing" id="${mx.zblock}">
			<h3>${(mx.title ? mx.title : "No title")}</h3>
			<div class="article-details">
				<em>${(mx.date ? mx.date : "No date" )}</em>
				${(mx.featureImage ? "<img src="+gurl(mx.featureImage)+">" : "No image")}
				</div>
			<div class="content">${mx.content}</div>
			${utilities(mx)}
		</div>`
	let base = document.querySelector(".news-container")
	base.innerHTML+=template
}
function getDetails(mx){
	return `
		<div class="details-container" onclick="toggleDetails(this)">
		<h4>Details</h4><p><em>(click to expand/hide)</em></p>
		<div class="details" hidden="">
			<h5>Infochain</h5>
			<p>ZBLOCK: <a onclick="returnIFrame(this)" target="_blank" href="#" link="${gurl(mx.zblock)}">${mx.zblock}</a></p>
			<p>BLOCK: <a target="_blank" href="${gurl(mx.block)}">${mx.block}</a></p>
			<p>BLOCK signature: <a target="_blank" href="${gurl(mx.blocksignature)}">${mx.blocksignature}</a></p>
			<p>Key is <a target="_blank" href="${gurl(mx.gpg)}">${mx.gpg}</a></p>
			<p>Data signature: <a target="_blank" href="${gurl(mx.datasig)}">${mx.datasig}</a></p>
			<p>File signature: <a target="_blank" href="${gurl(mx.filesig)}">${mx.filesig}</a></p>
			<p>Previous: <a target="_blank" href="${gurl(mx.previous)}">${mx.previous}</a></p>
			<h5>Transaction details</h5>
			<p>BD transaction <a target="_blank" href="${sttx(bd.tx)}">${bd.tx}</a> with memo:"${bd.memo}" on ${bd.ts}</p>
			<p>Contributor <a target="_blank" href="${staccurl(bd.from)}">${bd.from}</a> to <a target="blank" ="${staccurl(bd.to)}">${bd.to}</a></p>
			<p>BC transaction <a target="_blank" href="${sttx(bc.tx)}">${bc.tx}</a> with memo:"${bc.memo}" on ${bc.ts}</p>
			<p>Contributor <a target="_blank" href="${staccurl(bc.from)}">${bc.from}</a> to <a target="blank" ="${staccurl(bc.to)}">${bc.to}</a></p>
			<p>AD transaction <a target="_blank" href="${sttx(ad.tx)}">${ad.tx}</a> with memo:"${ad.memo}" on ${ad.ts}</p>
			<p>Contributor <a target="_blank" href="${staccurl(ad.from)}">${ad.from}</a> to <a target="blank" ="${staccurl(ad.to)}">${ad.to}</a></p>
			<p>AC transaction <a target="_blank" href="${sttx(ac.tx)}">${ac.tx}</a> with memo:"${ac.memo}" on ${ac.ts}</p>
			<p>Contributor <a target="_blank" href="${staccurl(ac.from)}">${ac.from}</a> to <a target="blank" ="${staccurl(ac.to)}">${ac.to}</a></p>
			<p>AB transaction <a target="_blank" href="${sttx(ab.tx)}">${ab.tx}</a> with memo:"${ab.memo}"on ${ab.ts}</p>
			<p>Contributor <a target="_blank" href="${staccurl(ab.from)}">${ab.from}</a> to <a target="blank" ="${staccurl(ab.to)}">${ab.to}</a></p>
		</div>`
	//ohjeeh(mx)
}
function findLatestTransactionFromZblockCID(zblockCID,iv){
	for (i in iv){
		if (iv[i][0] === zblockCID){
			return iv[i][2]
		}
	}
}
function findTransactionsFromZBLOCKCID(z,iv){
	for (i in iv){
		if (iv[i][0] === z){
			return [iv[i][2],iv[i][4],iv[i][6],iv[i][8],iv[i][10]]
		}
	}
}
function findTransaction(bd,txs){
	for (tx in txs){
		if (txs[tx].memo === bd){
			return tx
		}
	}
}
function gatherMixtapes(res,iv){
	for (r in res){
		getzblock(gurl(res[r]),res[r],iv)
	}
//	fromLatestPreviousGetAllPrevious(res[res.length-1])
}
let txs = []
fetch('//api.stellar.expert/explorer/public/payments?asset=ARCHINGKAOS-GB4QVKD6NW3CSNO5TNPARAWNPPXOPSSTKB35XCWB7PUNBIQTK3DVELB2&order=des&limit=2000')
.then(respone=>respone.json())
.then(data=>{
	txs=data._embedded.records
	ones = []
	twos = []
	tres = []
	fors = []
	fivs = []
	vals = []
	resu = []
	iv = []
	for (y in txs){
		if (typeof txs[y].memo !== 'undefined'){
			x=txs[y].memo
			if (x.startsWith("...")){
				if (x.endsWith("..")){
					if (x.endsWith("...")){
						tres.push(x)
					} else {
						twos.push(x)
					}
				} else {
					ones.push(x)
				}
			} else {
				if (x.endsWith("...")){
					fivs.push(x)
				} else {
					fors.push(x)
				}
			}
		} else {
			console.log("Transaction ", txs[y].id, " was skipped: No MEMO")
		}
	}
	for (n in ones){
		for (tw in twos){
			for (tr in tres){
				if (ones[n].substr(0,14) == twos[tw].substr(0,14) && ones[n].substr(0,14) == tres[tr].substr(0,14)){
					console.log("Found possible ZBLOCK! indexes:", n, tw, tr)
					for (fo in fors){
						for (fi in fivs){
							if (ones[n].substr(14) == fors[fo].substr(0,14) && ones[n].substr(14) == fivs[fi].substr(0,14)){
								val=ones[n].concat(twos[tw].substr(14),tres[tr].substr(14))
								vals.push(val)
								resu.push(val.replace(/\./g,""))
								//console.log(val.replace(/\./g,""))
								iv.push([val.replace(/\./g,""), fivs[fi], findTransaction(fivs[fi],txs), fors[fo],findTransaction(fors[fo],txs), tres[tr],findTransaction(tres[tr],txs), twos[tw],findTransaction(twos[tw],txs), ones[n],findTransaction(ones[n],txs)])
								console.log("Validated: "+val.replace(/\./g,""))
							}
						}
					}
				}
			}
		}
	}
	gatherMixtapes(resu,iv)
})
/*		async function getSignaturesAndKeyAndVerifyTheSignatures(mx){
	const publicKeyArmored = await gurl
	const detachedSignature = mx.//const privateKeyArmored = `-----BEGIN PGP PRIVATE KEY BLOCK-----`
	//const passphrase = `yourPassphrase`; // what the private key is encrypted with
	const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
	const privateKey = await openpgp.decryptKey({
		privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
		passphrase
	});

	const message = await openpgp.createMessage({ text: 'Hello, World!' });
	//const detachedSignature = await openpgp.sign({
	//	message, // Message object
	//	signingKeys: privateKey,
	//	detached: true
	//});
	//console.log(detachedSignature);

	const signature = await openpgp.readSignature({
		armoredSignature: detachedSignature // parse detached signature
	});
	const verificationResult = await openpgp.verify({
		message, // Message object
		signature,
		verificationKeys: publicKey
	});
	const { verified, keyID } = verificationResult.signatures[0];
	try {
		await verified; // throws on invalid signature
		console.log('Signed by key id ' + keyID.toHex());
	} catch (e) {
		throw new Error('Signature could not be verified: ' + e.message);
	}
}
*/
