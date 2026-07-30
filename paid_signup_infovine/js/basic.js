//layer-popup
function pop_open(termsTp){
	$(".dim" + termsTp).fadeIn(200);
	$(".layer-pop" + termsTp).fadeIn(200);
}
function pop_close(termsTp){
	$(".dim" + termsTp).fadeOut(200);
	$(".layer-pop" + termsTp).fadeOut(200);
}
function renameJoinBtn(formTp) {
	if (formTp != "F1") {
		document.getElementById("joinbutton").innerHTML="<span>인증번호 확인</span>";
	}
}

/**
* 해당 가입창에 쿠키를 세팅한다.
* 
* @param psName
* @param pbValue
* @param pnExpiredays
* @returns
*/
function setCookie(psName, pbValue, pnExpiredays) {
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + pnExpiredays);
	document.cookie = psName + "=" + escape(pbValue) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

/**
* 해당 쿠키를 가져온다.
* 
* @param psName
* @returns
*/
function getCookie(psName) {
	var nameOfCookie = psName + "=";
	var x = 0;
	
	while( x <= document.cookie.length ) { 
		var y = (x + nameOfCookie.length);
		
		if( document.cookie.substring( x, y ) == nameOfCookie ) { 
			if( (endOfCookie = document.cookie.indexOf( ";", y )) == -1 ) {
				endOfCookie = document.cookie.length;
			}
			
			return unescape( document.cookie.substring( y, endOfCookie ) ); 
		}
		
		x = document.cookie.indexOf( " ", x ) + 1;
		
		if( x == 0 ) {
			break;
		}
	}
	
	return "";
}

/**
* 해당 쿠키를 삭제한다.
* 
* @param psName
* @returns
*/
function eraseCookie(psName) {
	setCookie(psName, "", -1);
}

/**
 * 7일간 보이지 않기, 기가입자, 가입불가자 제이스퓨처 페이지로 리다이렉션 처리
 * 
 * @param psUrlCd
 * @param psJoinPath
 * @returns
 */
function jsRedirect(psUrlCd, psJoinPath) {
	
	try {
		var protocol = window.location.protocol;
		var url = "www.inappdb.com/tad/js_redirect.php";
		window.location.href = protocol + "//" + url + "?blind=at_stock&url_code=" + psUrlCd + "&sitecode=" + psJoinPath;
	} catch (err) {
		console.log("jsRedirect...");
	}
	
}

/**
 * 제이스퓨처 가입완료시 iframe으로 제이스퓨처 페이지 호출
 * 
 * @param psUrlCd
 * @param psJoinPath
 * @returns
 */
function jsComplete(psUrlCd, psJoinPath) {
	
	try {
		var protocol = window.location.protocol;
		var url = "www.inappdb.com/tad/js_end.php";
		setCookie("compAddsvcJoin", true, 365);
		$('#jsCompUrl').attr('src', protocol + "//" + url + "?blind=at_stock&url_code=" + psUrlCd + "&sitecode=" + psJoinPath);
	} catch (err) {
		console.log("jsComplete...");
	}
	
}

/**
 * 7일간 보이지 않기, 기가입자, 가입불가자 쿠키 생성 후 창 닫음
 * 
 * @param psName
 * @param pbValue
 * @param pnExpiredays
 * @returns
 */
function setCookAndClose(psName, pbValue, pnExpiredays) {
	setCookie(psName, pbValue, pnExpiredays);
	window.open("about:blank","_self").close();
}

/**
 * 완료창 이벤트 배너 클릭 시 화면 redirect
 * */
function moveToLink(linkUrl){
	window.location.replace(linkUrl);
}