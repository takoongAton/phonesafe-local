'use strict';


/*
phonesafe
이하 전체 테스트 스크립트입니다.
개발에 맞게 새로 작성해서 적용 부탁드립니다.
*/


window.addEventListener("load", function(){
	let width = window.innerWidth;
	resize(width);
	let scrollY = window.scrollY;
	fn_scrollY(scrollY);
})

window.addEventListener("resize", function(){
	let width = window.innerWidth;
	resize(width);
})

window.addEventListener("scroll", function(){
	let scrollY = window.scrollY;
	fn_scrollY(scrollY);
})

function resize(resizeWidth){
	if(resizeWidth >= 786) {
		document.querySelector("header").classList.remove("mobile");
	} else {
		document.querySelector("header").classList.add("mobile");
	}
}


function fn_scrollY(ddd){
	if(ddd > 0) {
		document.querySelector("header").classList.add("active");
	} else {
		document.querySelector("header").classList.remove("active");
	}

	let header = document.querySelector("header.home");
	if(header) {
		let sections = document.querySelectorAll(".section");

		gnbAs.forEach(function(item){
			item.classList.remove("active")
		})
		if(ddd <= sections[2].offsetTop - header.offsetHeight) {
			gnbAs[0].classList.add("active");
			console.log("000");
		} else if(ddd <= sections[3].offsetTop - header.offsetHeight) {
			gnbAs[1].classList.add("active");
			console.log("111");
		} 
	}
}





/* 토글 메뉴 */
let toggleBtn = document.querySelector(".btn_menu_toggle button");
toggleBtn.addEventListener("click", function(){
	if(document.querySelector("#aside-nav").classList.contains("active")){
		document.querySelector("#aside-nav").classList.remove("active");
		// document.querySelector("#aside-nav").style.display = "none";
	} else {
		document.querySelector("#aside-nav").classList.add("active");
		// document.querySelector("#aside-nav").style.display = "block";
	}
})
/* // 토글 메뉴 */




/* aside */
let btn_close_aside = document.querySelector(".aside div.btn-close");
btn_close_aside.addEventListener("click", function(){
	document.querySelector("#aside-nav").classList.remove("active");
	// document.querySelector("#aside-nav").style.display = "none";
})
/* // aside */




/* 레이어팝업 닫기 */
let layers = document.querySelectorAll(".layer");
if(layers.length > 0) {
	layers.forEach(function(item){
		let btn_close = item.querySelector(".btn_close");
		btn_close.addEventListener("click", function(e){
			e.target.closest(".layer").style.display = "none";
			scrollUnFixed();
		})
	})
}




/* 해지하기 입력창 */
let cancelInputs = document.querySelectorAll(".phonenumber_wrap input, .identify_wrap input")
cancelInputs.forEach(function(item, index){
	item.addEventListener("focusin", function(e){
		e.target.closest(".item").classList.add("focus");
	})
	item.addEventListener("blur", function(e){
		e.target.closest(".item").classList.remove("focus");
	})
})
/* // 해지하기 입력창 */




let gnbAs = document.querySelectorAll(".gnb li a");

window.addEventListener("load", function(){
	// 현재 페이지의 URL 가져오기
	const url = window.location.href;

	// "section" 단어의 위치 찾기
	const sectionIndex = url.indexOf("section");
	if (sectionIndex !== -1) {
		// "section" 다음에 오는 문자열 추출
		const sectionNumber = url.slice(sectionIndex + 7);
		// 숫자만 추출
		const number = parseInt(sectionNumber);
		if (!isNaN(number)) {
			console.log("찾은 숫자:", number);
			for(let i = 0; i < gnbAs.length; i++){
				gnbAs[i].classList.remove("active");
				if(number==0) {
					gnbAs[number].classList.add("active");	
				} else {
					gnbAs[number-1].classList.add("active");
				}
			}
		} else {
			console.log("숫자를 찾지 못했습니다.");
		}
	} else {
		console.log("'section'을 찾지 못했습니다.");
	}
})

gnbAs.forEach(function(item,index){
	item.addEventListener("click", function(e){
		console.log(index)
		for(let i = 0; i < gnbAs.length; i++){
			gnbAs[i].classList.remove("active");
			gnbAs[index].classList.add("active");
		}
	})
})





/* 언어 선택 시 각 언어의 메인 페이지로 이동 */
// 언어 전환 함수
function switchLanguage(lang) {
    const currentUrl = new URL(window.location.href);
    let path = currentUrl.pathname;

    // 1. 기준점이 되는 '/html/'의 위치를 찾습니다.
    // 영문일 때는 '/en/html/', 국문일 때는 '/html/'이 기준입니다.
    let baseIndex = path.indexOf('/en/html/');
    if (baseIndex === -1) {
        baseIndex = path.indexOf('/html/');
    }

    if (baseIndex !== -1) {
        // 2. 기준점 앞의 경로(prefix)를 추출합니다. (예: /myproject)
        const prefix = path.substring(0, baseIndex);

        if (lang === 'ko') {
            // 앞부분은 유지 + 국문 메인 경로 결합
            currentUrl.pathname = prefix + '/html/index.html';
        } else if (lang === 'en') {
            // 앞부분은 유지 + 영문 메인 경로 결합
            currentUrl.pathname = prefix + '/en/html/index.html';
        }
        
        window.location.href = currentUrl.toString();
    } else {
        // 만약 경로에 /html/이 아예 없다면 최상위 루트에서 이동
        currentUrl.pathname = lang === 'ko' ? '/html/index.html' : '/en/html/index.html';
        window.location.href = currentUrl.toString();
    }
}