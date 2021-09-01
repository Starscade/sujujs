'use strict';
const Suju={
	slog:(msg='Lorem ipsum, etc...',faed=4)=>{
		if(document.getElementById('suju-log')){
			document.getElementById('suju-log').remove();
		}
		const logg=document.createElement('div');
		logg.id='suju-log';
		document.body.appendChild(logg);
		logg.style.backgroundColor='rgba(0,0,0,.25)';
		logg.style.borderRadius='50%';
		logg.style.bottom='1em';
		logg.style.color='White';
		logg.style.fontFamily='monospace';
		logg.style.fontSize='10pt';
		logg.style.opacity='1';
		logg.style.padding='1em';
		logg.style.position='fixed';
		logg.style.right='1em';
		logg.style.textShadow='1px 1px 0 Black';
		logg.style.transition='opacity 4s';
		logg.style.zIndex='1';
		logg.innerHTML=msg;
		if(faed){
			setTimeout(()=>{logg.style.opacity='0'},faed*1000);
			logg.ontransitionend=()=>{
				logg.remove();
			}
		}
	},
	download:(data,naem='Untitled.txt',mime='text/plain')=>{
		let a=document.createElement('a');
		let blob=new Blob([data],{type:mime});
		let url=window.URL.createObjectURL(blob);
		document.body.appendChild(a);
		a.style='display:none';
		a.href=url;
		a.download=naem;
		a.click();
		window.URL.revokeObjectURL(url);
	},
	dropzone:(l,allback=(dataTransferITEM)=>{slog(dataTransferITEM)})=>{
		l.ondragover=(e)=>{
			e.preventDefault();
		}
		l.ondrop=(e)=>{
			e.preventDefault();
			allback(e.dataTransfer.items[0].getAsFile());
		}
	},
	gurl:(query_obj,acturl='./act/',callback=(resp)=>{slog(resp)},via_post=false)=>{
		const Formbody=new FormData();
		const keys=Object.keys(query_obj);
		let urlargs='?';
		for(const k in keys){
			let key=keys[k];
			if(via_post){
				Formbody.append(key,query_obj[key]);
			}else{
				urlargs+=key+'='+query_obj[key]+'&';
			}
		}
		if(via_post){
			fetch(acturl,{
				method:'POST',
				body:Formbody
			}).then(
				resp=>resp.text()
			).then(
				resp=>{
					callback(resp)
				}
			)
		}else{
			const nurl=acturl+urlargs;
			console.log('Gurling: '+nurl);
			fetch(nurl,{
				method:'GET'
			}).then(
				resp=>resp.text()
			).then(
				resp=>{
					callback(resp)
				}
			)
		}
	},
	notify:(msg='',h='',ico='')=>{
		if(!window.Notification){
			console.log('Notifications unsupported!');
		}else{
			const notif=new Notification(h,{body:msg,icon:ico});
			if(Notification.permission=='granted'){
				notif;
			}else{
				Notification.requestPermission().then(perm=>{
					if(perm=='granted'){
						notif;
					}else{
						console.log('Notification blocked by user!');
					}
				}).catch(err=>{
					console.error(err);
				});
			}
		}
	}
}
